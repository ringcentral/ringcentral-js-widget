import { createSelector } from 'reselect';
import getter from '../../lib/getter';

import { Module } from '../../lib/di';
import Pollable from '../../lib/Pollable';
import moduleStatuses from '../../enums/moduleStatuses';

import ensureExist from '../../lib/ensureExist';
import actionTypes from './actionTypes';
import getActiveCallControlReducer from './getActiveCallControlReducer';
import getDataReducer from './getDataReducer';
import { normalizeSession, requestURI, confictError } from './helpers';
import callControlError from './callControlError';

const DEFAULT_TTL = 30 * 60 * 1000;
const DEFAULT_TIME_TO_RETRY = 62 * 1000;
const telephonySessionsEndPoint = /\/telephony\/sessions$/;
const storageKey = 'activeCallControl';
const subscribeEvent = '/account/~/extension/~/telephony/sessions';

@Module({
  deps: [
    'Client',
    'Auth',
    'Subscription',
    'ConnectivityMonitor',
    'RolesAndPermissions',
    'CallMonitor',
    'Alert',
    { dep: 'TabManager', optional: true },
    { dep: 'Storage', optional: true },
    { dep: 'ActiveCallControlOptions', optional: true }
  ]
})
export default class ActiveCallControl extends Pollable {
  constructor({
    client,
    auth,
    ttl = DEFAULT_TTL,
    timeToRetry = DEFAULT_TIME_TO_RETRY,
    storage,
    subscription,
    connectivityMonitor,
    rolesAndPermissions,
    tabManager,
    callMonitor,
    polling = false,
    disableCache = false,
    alert,
    ...options
  }) {
    super({
      ...options,
      actionTypes,
    });
    this._client = client;
    if (!disableCache) {
      this._storage = storage;
    }
    this._subscription = this::ensureExist(subscription, 'subscription');
    this._connectivityMonitor = this::ensureExist(connectivityMonitor, 'connectivityMonitor');
    this._rolesAndPermissions = this::ensureExist(rolesAndPermissions, 'rolesAndPermissions');
    this._callMonitor = this::ensureExist(callMonitor, 'callMonitor');
    this._tabManager = tabManager;
    this._ttl = ttl;
    this._timeToRetry = timeToRetry;
    this._auth = this::ensureExist(auth, 'auth');
    this._promise = null;
    this._lastSubscriptionMessage = null;
    this._storageKey = storageKey;
    this._polling = polling;
    this._alert = alert;


    if (this._storage) {
      this._reducer = getActiveCallControlReducer(this.actionTypes);
      this._storage.registerReducer({
        key: this._storageKey,
        reducer: getDataReducer(this.actionTypes),
      });
    } else {
      this._reducer = getActiveCallControlReducer(this.actionTypes, {
        data: getDataReducer(this.actionTypes),
      });
    }
  }

  initialize() {
    this.store.subscribe(() => this._onStateChange());
  }

  async _onStateChange() {
    if (this._shouldInit()) {
      this.store.dispatch({
        type: this.actionTypes.init,
      });
      this._connectivity = this._connectivityMonitor.connectivity;
      await this._init();
      this.store.dispatch({
        type: this.actionTypes.initSuccess,
      });
    } else if (this._shouldReset()) {
      this._resetModuleStatus();
    } else if (
      this.ready
    ) {
      this._subscriptionHandler();
      this._checkConnectivity();
    }
  }

  _shouldInit() {
    return (
      this._auth.loggedIn &&
      (!this._storage || this._storage.ready) &&
      this._subscription.ready &&
      this._connectivityMonitor.ready &&
      this._callMonitor.ready &&
      (!this._tabManager || this._tabManager.ready) &&
      this._rolesAndPermissions.ready &&
      this.pending
    );
  }

  _shouldReset() {
    return (
      (
        !this._auth.loggedIn ||
        (!!this._storage && !this._storage.ready) ||
        !this._subscription.ready ||
        (!!this._tabManager && !this._tabManager.ready) ||
        !this._connectivityMonitor.ready ||
        !this._callMonitor.ready ||
        !this._rolesAndPermissions.ready
      ) &&
      this.ready
    );
  }


  _resetModuleStatus() {
    this.store.dispatch({
      type: this.actionTypes.resetSuccess,
    });
  }


  get _hasPermission() {
    return this._rolesAndPermissions.ringoutEnabled;
  }
  _shouldFetch() {
    return (
      !this._tabManager || this._tabManager.active
    );
  }
  async fetchData() {
    if (!this._promise) {
      this._promise = this._fetchData();
    }
    await this._promise;
  }
  async _fetchData() {
    try {
      await this._syncData();
      if (this._polling) {
        this._startPolling();
      }
      this._promise = null;
    } catch (error) {
      this._promise = null;
      if (this._polling) {
        this._startPolling(this.timeToRetry);
      } else {
        this._retry();
      }
      throw error;
    }
  }
  _startPolling(t = (this.timestamp + this.ttl + 10) - Date.now()) {
    this._clearTimeout();
    this._timeoutId = setTimeout(() => {
      this._timeoutId = null;
      if (!this._tabManager || this._tabManager.active) {
        if (!this.timestamp || Date.now() - this.timestamp > this.ttl) {
          this.fetchData();
        } else {
          this._startPolling();
        }
      } else if (this.timestamp && Date.now() - this.timestamp < this.ttl) {
        this._startPolling();
      } else {
        this._startPolling(this.timeToRetry);
      }
    }, t);
  }
  async _syncData() {
    try {
      const activeSessionsMap = {};
      for (const sessionId in this.activeSessions) {
        if (sessionId) {
          const result = await this.getPartyData(this.activeSessions[sessionId], sessionId);
          activeSessionsMap[sessionId] = result;
        }
      }
      this.store.dispatch({
        type: this.actionTypes.updateActiveSessions,
        activeSessionsMap,
        timestamp: Date.now(),
      });
    } catch (error) {
      throw error;
    }
  }
  async _init() {
    if (!this._hasPermission) return;
    if (this._shouldFetch()) {
      try {
        await this.fetchData();
      } catch (e) {
        this._retry();
      }
    } else if (this._polling) {
      this._startPolling();
    } else {
      this._retry();
    }
    this._subscription.subscribe(subscribeEvent);
  }

  _subscriptionHandler() {
    if (this._storage && this._tabManager && !this._tabManager.active) {
      return;
    }
    const { message } = this._subscription;
    if (
      message &&
      message !== this._lastSubscriptionMessage &&
      telephonySessionsEndPoint.test(message.event) &&
      message.body
    ) {
      this._lastSubscriptionMessage = message;
      const {
        sessionId,
        parties
      } = message.body;
      this.store.dispatch({
        type: this.actionTypes.updateActiveSessionStatus,
        sessionId,
        party: parties[0]
      });
    }
  }
  removeActiveSession(sessionId) {
    this.store.dispatch({
      type: this.actionTypes.removeActiveSession,
      sessionId
    });
  }
  setActiveSessionId(sessionId) {
    this.store.dispatch({
      type: this.actionTypes.setActiveSessionId,
      sessionId,
    });
  }

  _checkConnectivity() {
    if (
      this._connectivityMonitor &&
      this._connectivityMonitor.ready &&
      this._connectivity !== this._connectivityMonitor.connectivity
    ) {
      this._connectivity = this._connectivityMonitor.connectivity;
      if (this._connectivity) {
        this.fetchData();
      }
    }
  }
  async patch({ url = null, query = null, body = null }) {
    try {
      this._client.service._platform.send({
        method: 'PATCH', url, query, body
      });
    } catch (error) {
      throw error;
    }
  }
  async mute(sessionId) {
    try {
      const activeSession = this.activeSessions[sessionId];
      const url = requestURI(activeSession).mute;
      this.patch({
        url,
        body: {
          muted: true
        }
      });
    } catch (error) {
      if (confictError(error)) {
        this._alert.warning({
          message: callControlError.muteConflictError
        });
      } else {
        this._alert.warning({
          message: callControlError.generalError
        });
      }
    }
  }
  async unmute(sessionId) {
    try {
      const activeSession = this.activeSessions[sessionId];
      const url = requestURI(activeSession).mute;
      await this.patch({
        url,
        body: {
          muted: false
        }
      });
    } catch (error) {
      if (confictError(error)) {
        this._alert.warning({
          message: callControlError.unMuteConflictError
        });
      } else {
        this._alert.warning({
          message: callControlError.generalError
        });
      }
    }
  }
  async startRecord(sessionId) {
    try {
      const activeSession = this.activeSessions[sessionId];
      const url = requestURI(activeSession).record;
      const _response = await this._client.service._platform.post(url);
      const response = JSON.parse(_response._text);
      this.store.dispatch({
        type: this.actionTypes.startRecord,
        sessionId,
        response
      });
    } catch (error) {
      this.store.dispatch({
        type: this.actionTypes.recordFail,
        sessionId,
      });
    }
  }
  async stopRecord(sessionId) {
    try {
      const activeSession = this.activeSessions[sessionId];
      const recordingId = this.recordingIds[sessionId].id;
      activeSession.recordingId = recordingId;
      const url = requestURI(activeSession).stopRecord;
      this.patch({
        url,
        body: {
          active: false
        }
      });
      this.store.dispatch({
        type: this.actionTypes.stopRecord,
        sessionId,
      });
    } catch (error) {
      throw error;
    }
  }
  async hangUp(sessionId) {
    try {
      const activeSession = this.activeSessions[sessionId];
      const url = requestURI(activeSession).hangUp;
      await this._client.service._platform.delete(url);
    } catch (error) {
      this._alert.warning({
        message: callControlError.generalError
      });
    }
  }
  async reject(sessionId) {
    try {
      const activeSession = this.activeSessions[sessionId];
      const url = requestURI(activeSession).reject;
      await this._client.service._platform.post(url);
    } catch (error) {
      this._alert.warning({
        message: callControlError.generalError
      });
    }
  }
  async hold(sessionId) {
    try {
      const activeSession = this.activeSessions[sessionId];
      const url = requestURI(activeSession).hold;
      await this._client.service._platform.post(url);
    } catch (error) {
      if (confictError(error)) {
        this._alert.warning({
          message: callControlError.holdConflictError
        });
      } else {
        this._alert.warning({
          message: callControlError.generalError
        });
      }
    }
  }
  async unHold(sessionId) {
    try {
      const activeSession = this.activeSessions[sessionId];
      const url = requestURI(activeSession).unHold;
      await this._client.service._platform.post(url);
    } catch (error) {
      if (confictError(error)) {
        this._alert.warning({
          message: callControlError.unHoldConflictError
        });
      } else {
        this._alert.warning({
          message: callControlError.generalError
        });
      }
    }
  }
  async transfer(transferNumber, sessionId) {
    try {
      const activeSession = this.activeSessions[sessionId];
      const url = requestURI(activeSession).transfer;
      await this._client.service._platform.post(url, {
        phoneNumber: transferNumber
      });
      if (typeof this._onCallEndFunc === 'function') {
        this._onCallEndFunc();
      }
    } catch (error) {
      this._alert.warning({
        message: callControlError.generalError
      });
    }
  }

  async flip(flipValue, sessionId) {
    try {
      const activeSession = this.activeSessions[sessionId];
      const url = requestURI(activeSession).flip;
      await this._client.service._platform.post(url, {
        callFlipId: flipValue
      });
    } catch (error) {
      throw error;
    }
  }
  async forward() {
    // No implement at the moment
    // Need to check the API document
  }
  async getCallSessionStatus() {
    // No implement at the moment
    // Need to check the API document
  }
  async getPartyData(item, sessionId) {
    const url = requestURI(item).getPartyData;
    try {
      const _response = await this._client.service._platform.get(url);
      const response = JSON.parse(_response._text);
      return response;
    } catch (error) {
      const errRgx = /4[0-9][0-9]/g;
      if (errRgx.test(error.message)) {
        this.removeActiveSession(sessionId);
      }
      throw error;
    }
  }
  get data() {
    return (this._storage && this._storage.ready && this._storage.getItem(this._storageKey)) ||
     this.state;
  }
  get activeSessionId() {
    return this.data.activeSessionId || null;
  }
  get recordingIds() {
    return this.data.recordingIds || null;
  }
  get activeSessionsStatus() {
    return this.data.activeSessionsStatus || {};
  }
  get timestamp() {
    return this.data.timestamp;
  }
  get timeToRetry() {
    return this._timeToRetry;
  }
  get ttl() {
    return this._ttl;
  }
  get status() {
    return this.state.status;
  }

  get ready() {
    return this.status === moduleStatuses.ready;
  }
  @getter
  recordingId = createSelector(
    () => this.activeSessionId,
    () => this.recordingIds,
    (activeSessionId, recordingIds) => recordingIds[activeSessionId]
  );
  @getter
  activeSession = createSelector(
    () => this.activeSessionId,
    () => this.activeSessions,
    (activeSessionId, activeSessions) => activeSessions[activeSessionId]
  );

  @getter
  activeSessions = createSelector(
    () => this._callMonitor.calls,
    () => this.activeSessionsStatus,
    (calls, activeSessionsStatus) => {
      const reducer = (accumulator, call) => {
        const {
          sessionId
        } = call;
        const activeSessionStatus = activeSessionsStatus[sessionId];
        accumulator[sessionId] = normalizeSession({
          call,
          activeSessionStatus
        });
        return accumulator;
      };
      return calls.reduce(reducer, {});
    }
  );
}
