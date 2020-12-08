import {
  action,
  computed,
  RcModuleV2,
  state,
  storage,
  track,
} from '@ringcentral-integration/core';
import { format, parse } from '@ringcentral-integration/phone-number';
import { EventEmitter } from 'events';
import { equals } from 'ramda';
import { Module } from 'ringcentral-integration/lib/di';
import sleep from 'ringcentral-integration/lib/sleep';

import {
  agentSessionEvents,
  dialoutStatuses,
  dropDownOptions,
  LoginTypes,
  loginTypes,
  messageTypes,
  tabManagerEvents,
} from '../../enums';
import { LoginType } from '../../interfaces/EvAgentSessionUI.interface';
import {
  EvAgentConfig,
  EvAvailableSkillProfile,
  EvConfigureAgentOptions,
} from '../../lib/EvClient';
import { TabLife } from '../../lib/tabLife';
import { trackEvents } from '../../lib/trackEvents';
import { AgentSession, Deps, FormGroup } from './EvAgentSession.interface';
import { tabManagerEnabled } from './tabManagerEnabled.decorator';
import i18n from './i18n';

const ACCEPTABLE_LOGIN_TYPES = [
  loginTypes.integratedSoftphone,
  loginTypes.RC_PHONE,
  loginTypes.externalPhone,
];
const DEFAULT_LOGIN_TYPE = loginTypes.integratedSoftphone;

const NONE = dropDownOptions.None;

// ! wait all tab is logout complete, server has some delay after logout
const WAIT_EV_SERVER_ROLLBACK_DELAY = 2000;

const DEFAULT_FORM_GROUP = {
  selectedInboundQueueIds: [] as any,
  loginType: DEFAULT_LOGIN_TYPE,
  selectedSkillProfileId: NONE,
  extensionNumber: '',
  autoAnswer: false,
};

type AutoConfigType = 'already success' | 'other tab config' | 'config';

type ConfigureAgentParams = {
  config?: EvConfigureAgentOptions;
  triggerEvent?: boolean;
  needAssignFormGroupValue?: boolean;
};

@Module({
  name: 'EvAgentSession',
  deps: [
    'EvClient',
    'Auth',
    'EvAuth',
    'Storage',
    'Alert',
    'Auth',
    'Locale',
    'Presence',
    'RouterInteraction',
    'Modal',
    'Block',
    'Beforeunload',
    { dep: 'TabManager', optional: true },
    { dep: 'EvAgentSessionOptions', optional: true },
  ],
})
class EvAgentSession extends RcModuleV2<Deps> implements AgentSession {
  isForceLogin = false;

  _isReConfiguring = false;

  isReconnected = false;

  private _eventEmitter = new EventEmitter();
  private _loginPromise: Promise<void>;

  private _isAgentUpdating = false;
  private _updateSessionBlockId: string;
  private _isLogin = false;

  private _tabConfigWorking = new TabLife(
    `${this._deps.tabManager.prefix}sessionConfig_working`,
  );

  private _tabConfigSuccess = new TabLife(
    `${this._deps.tabManager.prefix}sessionConfig_success`,
  );

  @tabManagerEnabled()
  private _configSuccessAlive() {
    this._tabConfigSuccess.alive();
  }

  @tabManagerEnabled()
  private _configWorkingAlive() {
    this._tabConfigWorking.alive();
  }

  async isConfigTabAlive() {
    return !this.tabManagerEnabled || this._tabConfigSuccess?.isAlive();
  }

  get shouldBlockBrowser() {
    // when there is not integrated softphone and not has multiple tabs
    return !this.isIntegratedSoftphone && !this.hasMultipleTabs;
  }

  constructor(deps: Deps) {
    super({
      deps,
      enableCache: true,
      storageKey: 'EvAgentSession',
    });
    // ! that onceLoginSuccess for get event before onInitOnce.
    this._deps.evAuth.onceLoginSuccess(() => {
      // when that is seconds time get onLoginSuccess
      console.log('----------onLoginSuccess1');
      this._isLogin = true;
    });
    // ! logout event should in constructor, when logout that will not call init.
    this._deps.evAuth.beforeAgentLogout(() => {
      this._resetAllState();
    });

    this._deps.presence.beforeunloadHandler = () => this.shouldBlockBrowser;
  }

  @storage
  @state
  selectedSkillProfileId: string = NONE;

  @storage
  @state
  selectedInboundQueueIds: string[] = [];

  @storage
  @state
  loginType: LoginTypes = DEFAULT_LOGIN_TYPE;

  @storage
  @state
  extensionNumber = '';

  @storage
  @state
  takingCall = true;

  @storage
  @state
  autoAnswer = false;

  @storage
  @state
  configured = false;

  @state
  configSuccess = false;

  @storage
  @state
  formGroup: FormGroup = DEFAULT_FORM_GROUP;

  @storage
  @state
  accessToken = '';

  get isExternalPhone() {
    return this.formGroup.loginType === loginTypes.externalPhone;
  }

  get isIntegratedSoftphone() {
    return this.loginType === loginTypes.integratedSoftphone;
  }

  get localStorage() {
    return window?.localStorage;
  }

  get tabManagerEnabled() {
    return this._deps.tabManager?.enable;
  }

  get hasMultipleTabs() {
    return this._deps.tabManager?.hasMultipleTabs;
  }

  @computed((that: EvAgentSession) => [that._deps.locale.currentLocale])
  get loginTypeList() {
    const { currentLocale } = this._deps.locale;

    return ACCEPTABLE_LOGIN_TYPES.map(
      (type) =>
        ({
          id: type,
          label: i18n.getString(type, currentLocale),
        } as LoginType),
    );
  }

  @computed((that: EvAgentSession) => [
    that._deps.evAuth.agent,
    that._deps.auth.isFreshLogin,
  ])
  get inboundQueues() {
    const { agentConfig, agentPermissions } = this._deps.evAuth;
    if (
      !agentConfig ||
      !agentConfig?.inboundSettings ||
      !agentPermissions?.allowInbound
    ) {
      return [];
    }
    const {
      inboundSettings: { availableQueues = [] },
    } = agentConfig;

    const { isFreshLogin } = this._deps.auth;

    return availableQueues.map((queue) => ({
      gateId: queue.gateId,
      gateName: queue.gateName,
      checked: isFreshLogin,
    }));
  }

  @computed((that: EvAgentSession) => [that.skillProfileList])
  get defaultSkillProfileId() {
    const defaultSkill = this._pickSkillProfile(this.skillProfileList);
    return defaultSkill ? defaultSkill.profileId : NONE;
  }

  @computed((that: EvAgentSession) => [
    that._deps.evAuth.agent,
    that._deps.locale.currentLocale,
  ])
  get skillProfileList() {
    const { agentConfig } = this._deps.evAuth.agent || {};

    if (!agentConfig || !agentConfig.inboundSettings) {
      return [];
    }
    const {
      inboundSettings: { availableSkillProfiles = [] },
    } = agentConfig;

    const defaultSkill = this._pickSkillProfile(availableSkillProfiles);

    if (!defaultSkill && availableSkillProfiles.length > 0) {
      return [
        {
          profileId: NONE,
          profileName: i18n.getString(NONE, this._deps.locale.currentLocale),
        },
        ...availableSkillProfiles,
      ];
    }

    return availableSkillProfiles;
  }

  @computed((that: EvAgentSession) => [
    that.skillProfileList,
    that.selectedSkillProfileId,
  ])
  get selectedSkillProfile() {
    const selectedSkillProfile = this.skillProfileList.find(
      (profile) => profile.profileId === this.formGroup.selectedSkillProfileId,
    );
    return selectedSkillProfile?.profileName;
  }

  @computed((that: EvAgentSession) => [
    that.inboundQueues,
    that.selectedInboundQueueIds,
  ])
  get selectedInboundQueues() {
    const results = this.formGroup.selectedInboundQueueIds.map((id) => {
      return this.inboundQueues.find((queue) => queue.gateId === id);
    });
    return results.filter((result) => result).map((result) => result.gateName);
  }

  @action
  resetAllConfig() {
    this.selectedInboundQueueIds = [];
    this.selectedSkillProfileId = NONE;
    this.loginType = DEFAULT_LOGIN_TYPE;
    this.extensionNumber = '';
    this.takingCall = true;
    this.autoAnswer = false;
    this.configSuccess = false;
    this.configured = false;
  }

  @action
  setAccessToken(token: string) {
    this.accessToken = token;
  }

  @action
  setConfigSuccess(status: boolean) {
    console.log('setConfigSuccess~', status);
    if (status) {
      this._emitConfigSuccess();
    }

    this.configSuccess = status;
    this.configured = status;
  }

  @track((_: EvAgentSession, type: LoginTypes) => [
    trackEvents.agentSessionSetLoginType,
    { value: type },
  ])
  @action
  setLoginType(type: LoginTypes) {
    this.loginType = type;
  }

  @track((_: EvAgentSession, skillProfileId: string) => [
    trackEvents.agentSessionSetSkillProfileId,
    { value: skillProfileId },
  ])
  @action
  setSkillProfileId(skillProfileId: string) {
    this.selectedSkillProfileId = skillProfileId;
  }

  @track((_: EvAgentSession, ids: string[]) => [
    trackEvents.agentSessionSetInboundQueueIds,
    { value: ids },
  ])
  @action
  setInboundQueueIds(ids: string[]) {
    this.selectedInboundQueueIds = ids;
  }

  @action
  setExtensionNumber(extensionNumber: string) {
    this.extensionNumber = extensionNumber;
  }

  @track((_: EvAgentSession, takingCall: boolean) => [
    trackEvents.agentSessionSetTakingCall,
    { value: takingCall },
  ])
  @action
  setTakingCall(takingCall: boolean) {
    this.takingCall = takingCall;
  }

  @track((_: EvAgentSession, autoAnswer: boolean) => [
    trackEvents.agentSessionSetAutoAnswer,
    { value: autoAnswer },
  ])
  @action
  setAutoAnswer(autoAnswer: boolean) {
    this.autoAnswer = autoAnswer;
  }

  @action
  setFreshConfig() {
    this._clearCalls();

    this.loginType = DEFAULT_LOGIN_TYPE;
    this.extensionNumber = '';
    this.takingCall = true;
    this.autoAnswer = this.defaultAutoAnswerOn;
    this.configSuccess = false;
    this.configured = false;

    this.selectedSkillProfileId = this.defaultSkillProfileId;
    if (this._modules.evAuth.agentPermissions.allowInbound) {
      this.selectedInboundQueueIds = this.inboundQueues.map(
        (inboundQueue) => inboundQueue.gateId,
      );
    }
  }

  get defaultAutoAnswerOn() {
    return this._deps.evAuth.agentPermissions.defaultAutoAnswerOn;
  }

  @action
  assignFormGroupValue() {
    const {
      selectedInboundQueueIds,
      extensionNumber,
      loginType,
      selectedSkillProfileId,
      autoAnswer,
    } = this.formGroup;
    this.selectedInboundQueueIds = selectedInboundQueueIds;
    this.extensionNumber = extensionNumber;
    this.loginType = loginType;
    this.selectedSkillProfileId = selectedSkillProfileId;
    this.autoAnswer = autoAnswer;
  }

  @action
  setFormGroup(data: FormGroup) {
    this.formGroup = { ...this.formGroup, ...data };
  }

  resetFormGroup() {
    this.setFormGroup({
      selectedInboundQueueIds: this.selectedInboundQueueIds,
      selectedSkillProfileId: this.selectedSkillProfileId,
      loginType: this.loginType,
      extensionNumber: this.extensionNumber,
      autoAnswer: this.autoAnswer,
    });
  }

  @computed((that: EvAgentSession) => [
    that.selectedInboundQueueIds,
    that.selectedSkillProfileId,
    that.loginType,
    that.extensionNumber,
    that.formGroup,
  ])
  get isSessionChanged() {
    const sessionConfigs = {
      selectedInboundQueueIds: this.selectedInboundQueueIds,
      selectedSkillProfileId: this.selectedSkillProfileId,
      loginType: this.loginType,
      extensionNumber: this.extensionNumber,
      autoAnswer: this.autoAnswer,
    };
    return !equals(sessionConfigs, this.formGroup);
  }

  _shouldReset() {
    return super._shouldReset() && !this._deps.auth.loggedIn;
  }

  async checkIsMainTabAlive() {
    return this._deps.tabManager.checkIsMainTabAlive();
  }

  private _mainTabBeforeunloadHandler = () => {
    console.log(
      '_mainTabBeforeunloadHandler~~',
      this._deps.tabManager.hasMultipleTabs,
      this.isMainTab,
      this._deps.tabManager.firstTabIdExcludeMainTab,
    );

    if (
      this._deps.tabManager.hasMultipleTabs &&
      this.isMainTab &&
      this._deps.tabManager.firstTabIdExcludeMainTab
    ) {
      return true;
    }
    return false;
  };

  private _mainTabAfterUnloadHandler = () => {
    console.log(
      '_mainTabAfterUnloadHandler~~',
      this._deps.tabManager.firstTabIdExcludeMainTab,
    );
    if (!this.isMainTab) return;
    const firstTabIdExcludeMainTab = this._deps.tabManager
      .firstTabIdExcludeMainTab;

    this._deps.tabManager.setMainTabId(firstTabIdExcludeMainTab);

    this._sendTabManager(
      tabManagerEvents.MAIN_TAB_WILL_UNLOAD,
      firstTabIdExcludeMainTab,
    );
  };

  @tabManagerEnabled()
  private _setMainTabId() {
    console.log('_setMainTabId~~~');
    const { id } = this._deps.tabManager;
    this._deps.tabManager.setMainTabId(id);
    this._deps.beforeunload.add(this._mainTabBeforeunloadHandler);
    this._deps.beforeunload.onAfterUnload(
      this._mainTabAfterUnloadHandler,
      true,
    );
  }

  onInitOnce() {
    this._init();

    this.onConfigSuccess(() => {
      if (this._deps.presence.calls.length === 0) {
        this._deps.presence.setDialoutStatus(dialoutStatuses.idle);
      }

      if (this._isAgentUpdating) {
        this._isAgentUpdating = false;
      } else {
        console.log('!!!!to Dialer');
        this._deps.routerInteraction.push('/dialer');
      }
    });
  }

  private async _tabReConfig() {
    console.log('_tabReConfig~~~', this._isReConfiguring);
    if (this._isReConfiguring) return;

    this._isReConfiguring = true;

    if (this.isIntegratedSoftphone) {
      try {
        await this._deps.block.next(async () => {
          // !! sip resiter need to configure agent at fisrt
          await this.configureAgent({
            triggerEvent: false,
          });
        });
      } catch (error) {
        console.error('re config fail', error);
        this._emitReConfigFail();
        return;
      }
    } else {
      this._configWorkingAlive();
    }

    this.isReconnected = true;

    this._mainTabHandle();
    this._configSuccessAlive();

    this._isReConfiguring = false;
  }

  // _newMainTabReConfig and _pollAskIfCanBeNewMainTab are all for handle new main tab
  private async _newMainTabReConfig() {
    console.log(
      '_newMainTabReConfig~',
      !this.isReconnected,
      this._deps.evAuth.connected,
      this.configSuccess,
      this.isMainTab,
    );

    if (
      !this.isReconnected &&
      this._deps.evAuth.connected &&
      this.configSuccess &&
      this.isMainTab
    ) {
      console.log('_newMainTabReConfig success~');
      await this._tabReConfig();
    }
  }

  @tabManagerEnabled()
  private _pollAskIfCanBeNewMainTab() {
    console.log('_pollAskIfCanBeNewMainTab~~');
    this._tabConfigSuccess.onLeave(async () => {
      console.log(
        '_tabReConfig in _pollAskIfCanBeNewMainTab~',
        this._deps.tabManager.isFirstTab,
        this._deps.evAuth.connected,
        this.configSuccess,
        !this._isReConfiguring,
      );
      if (
        this._deps.tabManager.isFirstTab &&
        this._deps.evAuth.connected &&
        this.configSuccess &&
        !this._isReConfiguring &&
        (await this._tabConfigWorking.isLeave())
      ) {
        await this._tabReConfig();
      } else if (!this.isMainTab) {
        this._pollAskIfCanBeNewMainTab();
      }
    }, 3000);
  }

  private async _init() {
    if (this._isLogin) {
      this._initTabLife();
      await this._initAgentSession();
    }
    // ! that must call after onInitOnce, because when that is not in init once,
    // ! that configured will some times to be false because storage block
    this._deps.evAuth.onLoginSuccess(() => {
      // when that is seconds time get onLoginSuccess
      console.log('----------onLoginSuccess2');
      this._initTabLife();
      this._initAgentSession();
    });
  }

  private _initAgentSession() {
    console.log('_initAgentSession~', this._isAgentUpdating);
    if (this._isAgentUpdating) {
      return;
    }
    this._afterLogin();

    console.log('autoconfig~', !this._deps.auth.isFreshLogin, this.configured);

    if (this._deps.auth.isFreshLogin === false && this.configured) {
      try {
        return this._autoConfigureAgent();
      } catch (e) {
        console.error(e);
      }
    }

    this.setFreshConfig();

    this.resetFormGroup();

    this._navigateToSessionConfigPage();
  }

  private _navigateToSessionConfigPage() {
    this._deps.routerInteraction.push('/sessionConfig');
    console.log('to sessionConfig~~');
  }

  // ! also reset in onReset for auth logout by rc
  onReset() {
    console.log('onReset in EvAgentSession~~');
    try {
      this._resetAllState();
      this._isAgentUpdating = false;
    } catch (error) {
      // ignore error
    }
  }

  private _resetAllState() {
    console.log('_resetAllState~~', this.isMainTab);
    if (!this._isAgentUpdating) {
      this.resetAllConfig();
    }
    if (this.isMainTab) {
      this._deps.tabManager.setMainTabId(null);
    }
    this.setConfigSuccess(false);
    this.isReconnected = false;
    this._destroyTabLife();
    this._deps.beforeunload.clear();
    this._deps.beforeunload.removeAfterUnloadListener(
      this._mainTabAfterUnloadHandler,
    );
  }

  async onStateChange() {
    if (this.ready && this.tabManagerEnabled && this._deps.tabManager.ready) {
      await this._checkTabManagerEvent();
    }
  }

  private async _checkTabManagerEvent() {
    const { event } = this._deps.tabManager;
    const data = event?.args[0];
    if (event) {
      switch (event.name) {
        case tabManagerEvents.AGENT_CONFIG_SUCCESS:
          console.log('!!!from other');
          await this._othersTabConfigureAgent();
          break;
        case tabManagerEvents.UPDATE_SESSION:
          this._updateSessionBlockId = this._deps.block.block();
          this._isAgentUpdating = true;

          // if voiceConnectionChanged
          if (data) {
            this.onceLogoutThenLogin().then((loginPromise) => {
              this._loginPromise = loginPromise;
            });
          }
          break;
        case tabManagerEvents.MAIN_TAB_WILL_UNLOAD:
          console.log(
            'MAIN_TAB_WILL_UNLOAD~~',
            data === this._deps.tabManager.tabbie.id,
            this.isMainTab,
          );
          if (data === this._deps.tabManager.tabbie.id || this.isMainTab) {
            // now this tab is the new main tab
            await this._newMainTabReConfig();
          }
          break;
        case tabManagerEvents.SET_MIAN_TAB_ID:
          if (this._deps.tabManager.mainTabId !== data) {
            console.log('SET_MIAN_TAB_ID in this tab~');
            this._deps.tabManager.setMainTabIdInThisTab(data);
          }
          break;
        case tabManagerEvents.UPDATE_SESSION_SUCCESS:
          try {
            console.log('UPDATE_SESSION_SUCCESS~~', data);
            // if voiceConnectionChanged
            if (data) {
              this._destroyTabLife();
              this._initTabLife();
              await this._loginPromise;
              await this._othersTabConfigureAgent();
            } else {
              this.setConfigSuccess(true);
            }

            this._unblockUpdateSession();

            this._isAgentUpdating = false;
          } catch (error) {
            // when that auto config fail, just reload that tab
            console.log(error);
            window.location.reload();
          }
          break;
        case tabManagerEvents.UPDATE_SESSION_SUCCESS_ALERT:
          this._showUpdateSuccessAlert();
          break;
        case tabManagerEvents.UPDATE_SESSION_FAIL:
          this._unblockUpdateSession();
          break;
        default:
          break;
      }
    }
  }

  private _unblockUpdateSession() {
    this._deps.block.unblock(this._updateSessionBlockId);
  }

  @tabManagerEnabled()
  private _initTabLife() {
    console.log('initTabLife~');
    this._tabConfigWorking.init();
    this._tabConfigSuccess.init();
  }

  @tabManagerEnabled()
  private _destroyTabLife() {
    this._tabConfigWorking?.destroy();
    this._tabConfigSuccess?.destroy();
  }

  private _afterLogin() {
    // if that is not first login set SessionConfig data again
    if (!this._deps.auth.isFreshLogin) {
      const checkSelectIsInList = this.skillProfileList.some(
        (profile) => profile.profileId === this.selectedSkillProfileId,
      );
      if (!checkSelectIsInList) {
        this.setSkillProfileId(this.defaultSkillProfileId);
      }

      // check all selected queue is in inboundQueue list
      const checkedInboundQueues = this.selectedInboundQueueIds.reduce(
        (result, inboundQueueId) => {
          if (
            this.inboundQueues.some(
              (inboundQueue) => inboundQueue.gateId === inboundQueueId,
            )
          ) {
            result.push(inboundQueueId);
          }
          return result;
        },
        [],
      );
      this.setInboundQueueIds(checkedInboundQueues);
    }
  }

  private _emitTriggerConfig() {
    this._eventEmitter.emit(agentSessionEvents.TRIGGER_CONFIG);
  }

  onTriggerConfig(callback: () => void) {
    this._eventEmitter.on(agentSessionEvents.TRIGGER_CONFIG, callback);
    return this;
  }

  private _emitConfigSuccess() {
    this._eventEmitter.emit(agentSessionEvents.CONFIG_SUCCESS);
  }

  onConfigSuccess(callback: () => void) {
    this._eventEmitter.on(agentSessionEvents.CONFIG_SUCCESS, callback);
    return this;
  }

  private _emitReConfigFail() {
    this._eventEmitter.emit(agentSessionEvents.RECONFIG_FAIL);
  }

  onReConfigFail(callback: () => void) {
    this._eventEmitter.on(agentSessionEvents.RECONFIG_FAIL, callback);
    return this;
  }

  private _mainTabHandle() {
    console.log('_mainTabHandle~~');
    this._setMainTabId();
    // refresh token prevent get token fail to get sip_info
    this._deps.evClient.getRefreshedToken();
    this._deps.tabManager.emitSetMainTabComplete();
  }

  async updateAgentConfigs() {
    const agentConfig = await this._deps.evClient.getAgentConfig();
    const agent = {
      ...this._deps.evAuth.agent,
      agentConfig,
    };
    this._deps.evAuth.setAgent(agent);
    // !! update agentConfig need before set config success.
    this.setConfigSuccess(true);
  }

  /**
   * config agent in session config page
   * @param triggerEvent is that should trigger event, default is true
   */
  @track((that: EvAgentSession) => [
    trackEvents.agentSessionConfigureAgent,
    {
      'Voice Connection': that.loginType,
      'Persistent Voice Connection': that.takingCall,
      'Skill Profile': that.selectedSkillProfile,
      'Inbound Queues': that.selectedInboundQueues,
      'Auto Answer': that.autoAnswer,
    },
  ])
  async configureAgent({
    config = this._checkFieldsResult(this.formGroup),
    triggerEvent = true,
    needAssignFormGroupValue = false,
  }: ConfigureAgentParams = {}) {
    this._configWorkingAlive();
    console.log('configureAgent~~', triggerEvent);
    this._clearCalls();
    let result = await this._connectEvServer(config);

    // Session timeout
    // this will occur when stay in session config page for long time
    if (result.data.status !== 'SUCCESS') {
      this._navigateToSessionConfigPage();
      await this._deps.evAuth.newReconnect(false);

      result = await this._connectEvServer(config);
    }

    this._handleAgentResult({ config: result.data, needAssignFormGroupValue });

    if (triggerEvent) {
      this._mainTabHandle();
      this._emitTriggerConfig();
      this._configSuccessAlive();
      this._sendTabManager(tabManagerEvents.AGENT_CONFIG_SUCCESS);
      this.setConfigSuccess(true);
    }
  }

  async updateAgent(voiceConnectionChanged: boolean) {
    try {
      await this._deps.block.next(async () => {
        if (voiceConnectionChanged) this._configWorkingAlive();
        const config = this._checkFieldsResult(this.formGroup);

        this._clearCalls();

        this._isAgentUpdating = true;

        this._sendTabManager(
          tabManagerEvents.UPDATE_SESSION,
          voiceConnectionChanged,
        );

        if (voiceConnectionChanged) await this.reLoginAgent();

        config.isForce = true;
        const result = await this._connectEvServer(config);
        this._handleAgentResult({
          config: result.data,
          isAgentUpdating: true,
          needAssignFormGroupValue: true,
        });

        if (voiceConnectionChanged) {
          this._mainTabHandle();
          this._emitTriggerConfig();
        }

        await this.updateAgentConfigs();

        if (voiceConnectionChanged) this._configSuccessAlive();

        // * update session complete, and config ready
        this._sendTabManager(
          tabManagerEvents.UPDATE_SESSION_SUCCESS,
          voiceConnectionChanged,
        );

        this.goToSettingsPage();

        this._sendTabManager(tabManagerEvents.UPDATE_SESSION_SUCCESS_ALERT);
        this._showUpdateSuccessAlert();
      });
    } catch (error) {
      this._sendTabManager(tabManagerEvents.UPDATE_SESSION_FAIL);
      this._unblockUpdateSession();

      console.error('error', error);
    }
  }

  async reLoginAgent() {
    this._deps.evAuth.sendLogoutTabEvent();

    const { access_token } = await this._deps.auth.refreshToken();
    this.setAccessToken(access_token);

    // * then do logout send to every tab
    await this._deps.evAuth.logoutAgent();

    // ! wait all tab is logout complete, server has some delay after logout
    await sleep(WAIT_EV_SERVER_ROLLBACK_DELAY);

    await this._deps.evAuth.loginAgent(this.accessToken);
  }

  onceLogoutThenLogin() {
    return new Promise<Promise<void>>((resolve) => {
      this._deps.evAuth.onceLogout(async () => {
        // ! wait all tab is logout complete, server has some delay after logout
        await sleep(WAIT_EV_SERVER_ROLLBACK_DELAY);
        resolve(this._deps.evAuth.loginAgent(this.accessToken));
      });
    });
  }

  goToSettingsPage() {
    this._deps.routerInteraction.push('/settings');
  }

  private _showUpdateSuccessAlert() {
    this._deps.alert.success({
      message: messageTypes.UPDATE_AGENT_SUCCESS,
    });
  }

  private _handleAgentResult({
    config: { message, status },
    isAgentUpdating,
    needAssignFormGroupValue,
  }: {
    config: EvAgentConfig;
    isAgentUpdating?: boolean;
    needAssignFormGroupValue?: boolean;
  }) {
    if (status !== 'SUCCESS') {
      if (typeof message === 'string') {
        this._deps.alert.danger({
          message: messageTypes.AGENT_CONFIG_DETAIL_ERROR,
          ttl: 0,
          payload: message,
        });
      } else {
        this._deps.alert.danger({
          message: isAgentUpdating
            ? messageTypes.UPDATE_AGENT_ERROR
            : messageTypes.AGENT_CONFIG_ERROR,
          ttl: 0,
        });
      }
      throw new Error(message);
    }
    if (needAssignFormGroupValue) {
      this.assignFormGroupValue();
    }
  }

  private async _autoConfigureAgent() {
    console.log('_autoConfigureAgent~', this.tabManagerEnabled);
    if (this.tabManagerEnabled) {
      const resolves: ((
        value?: AutoConfigType | PromiseLike<AutoConfigType>,
      ) => void)[] = [null, null, null];
      return Promise.race<AutoConfigType>([
        new Promise<AutoConfigType>((res) => {
          resolves[0] = () => res('already success');

          this._eventEmitter.once(
            agentSessionEvents.CONFIG_SUCCESS,
            resolves[0],
          );
        }),
        new Promise<AutoConfigType>((res) => {
          resolves[1] = res;
          // check isSuccess first
          if (
            this._isAgentUpdating ||
            this._deps.tabManager.tabs.length !== 1
          ) {
            const checkIsAlive = () => {
              this._tabConfigSuccess.isAlive().then(async (result) => {
                if (result) {
                  res('other tab config');
                } else {
                  checkIsAlive();
                }
              });
            };

            checkIsAlive();
          }
        }),
        new Promise<AutoConfigType>((res) => {
          resolves[2] = res;
          // when there is too many tab, that event will block
          // then check local
          if (this._deps.tabManager.isFirstTab) {
            this._tabConfigWorking.isLeave().then(async (result) => {
              if (result) {
                this._configWorkingAlive();
                res('config');
              }
            });
          }
        }),
      ])
        .then((result) => {
          this._eventEmitter.off(
            agentSessionEvents.CONFIG_SUCCESS,
            resolves[0],
          );
          // clear all memory with promise
          resolves.forEach((r) => r());
          resolves.length = 0;

          console.log('!!!!!', result);

          switch (result) {
            case 'other tab config':
              console.log('_othersTabConfigureAgent in auto config~~');
              return this._othersTabConfigureAgent();
            case 'config': {
              console.log('configureAgent in auto config~~');
              //! when reConfig, if that change queue or others field in ev admin, that will get error, should redirect to sessionPage
              const config = this._checkFieldsResult({
                selectedInboundQueueIds: this.selectedInboundQueueIds,
                selectedSkillProfileId: this.selectedSkillProfileId,
                loginType: this.loginType,
                extensionNumber: this.extensionNumber,
              });
              return this.configureAgent({ config });
            }
            case 'already success':
            default:
              return Promise.resolve();
          }
        })
        .catch((e) => {
          this.setConfigSuccess(false);
          this._navigateToSessionConfigPage();
          return e;
        });
    }

    return this.configureAgent();
  }

  async _othersTabConfigureAgent() {
    console.log('_othersTabConfigureAgent~~', this.configSuccess);
    if (this.configSuccess) {
      return;
    }

    try {
      await this._deps.evClient.multiLoginRequest();

      await this.updateAgentConfigs();

      this._pollAskIfCanBeNewMainTab();

      return;
    } catch (e) {
      console.log(e);
    }
  }

  private _pickSkillProfile(skillProfileList: EvAvailableSkillProfile[]) {
    return skillProfileList.find((item) => item.isDefault === '1');
  }

  private async _connectEvServer(config: EvConfigureAgentOptions) {
    console.log('configure ev agent in _connectEvServer~~');
    let result = await this._deps.evClient.configureAgent(config);
    const { status } = result.data;

    if (status === messageTypes.EXISTING_LOGIN_FOUND) {
      const { currentLocale } = this._deps.locale;

      // TODO: think about sync up in all tabs?
      const modalId = await this._deps.modal.confirmSync({
        title: i18n.getString('multipleLoginsTitle', currentLocale),
        content: i18n.getString('multipleLoginsContent', currentLocale),
        okText: i18n.getString('multipleLoginsConfirm', currentLocale),
        cancelText: i18n.getString('multipleLoginsCancel', currentLocale),
        onOK: async () => {
          result = await this._deps.evClient.configureAgent({
            ...config,
            isForce: true,
          });
          this.isForceLogin = true;
        },
      });

      if (!modalId) {
        this.isForceLogin = false;
        throw new Error(status);
      }
    } else if (status === messageTypes.EXISTING_LOGIN_ENGAGED) {
      this._deps.alert.danger({
        message: messageTypes.EXISTING_LOGIN_ENGAGED,
        ttl: 0,
      });

      throw new Error(messageTypes.EXISTING_LOGIN_ENGAGED);
    }

    return result;
  }

  private _checkFieldsResult(formGroup: FormGroup): EvConfigureAgentOptions {
    const { selectedInboundQueueIds, selectedSkillProfileId } = formGroup;

    if (selectedInboundQueueIds.length === 0) {
      this._deps.alert.danger({
        message: messageTypes.NO_AGENT_SELECTED,
        ttl: 0,
      });
      throw new Error(`'queueIds' is an empty array.`);
    }

    return {
      dialDest: this._getDialDest(formGroup),
      queueIds: selectedInboundQueueIds,
      skillProfileId:
        selectedSkillProfileId === NONE ? '' : selectedSkillProfileId,
    };
  }

  private _getDialDest({ loginType, extensionNumber }: FormGroup) {
    // Only external phone has number input
    switch (loginType) {
      case loginTypes.externalPhone: {
        if (!extensionNumber) {
          this._deps.alert.danger({
            message: messageTypes.EMPTY_PHONE_NUMBER,
            ttl: 0,
          });
          throw new Error(`'extensionNumber' is an empty number.`);
        }
        const formatPhoneNumber = format({
          phoneNumber: extensionNumber,
        });
        const { parsedNumber, isValid } = parse({
          input: formatPhoneNumber,
        });
        if (!isValid || !parsedNumber || parsedNumber === '') {
          this._deps.alert.danger({
            message: messageTypes.INVALID_PHONE_NUMBER,
            ttl: 0,
          });
          throw new Error(`'extensionNumber' is not a valid number.`);
        }
        this.setFormGroup({ extensionNumber: parsedNumber });
        return extensionNumber;
      }
      case loginTypes.integratedSoftphone:
        return 'integrated';
      case loginTypes.RC_PHONE:
      default:
        return 'RC_PHONE';
    }
  }

  private _sendTabManager(event: string, value?: any) {
    this._deps.tabManager?.send(event, value);
  }

  private _clearCalls() {
    this._deps.presence.clearCalls();
  }

  get isMainTab() {
    return this._deps.tabManager.isMainTab;
  }
}

export { EvAgentSession };
