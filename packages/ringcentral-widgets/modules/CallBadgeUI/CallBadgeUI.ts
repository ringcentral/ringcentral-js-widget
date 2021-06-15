import { Module } from 'ringcentral-integration/lib/di';
import {
  RcUIModuleV2,
  UIFunctions,
  UIProps,
} from '@ringcentral-integration/core';
import {
  CallBadgeContainerProps,
  CallBadgePanelProps,
  Deps,
} from './CallBadgeUI.interface';

@Module({
  name: 'CallBadgeUI',
  deps: ['Locale', 'Webphone', { dep: 'CallBadgeUIOptions', optional: true }],
})
class CallBadgeUI extends RcUIModuleV2<Deps> {
  constructor(deps: Deps) {
    super({ deps });
  }

  getUIProps({
    hidden,
    defaultOffsetX = 0,
    defaultOffsetY = 0,
  }: CallBadgeContainerProps): UIProps<CallBadgePanelProps> {
    const currentSession =
      this._deps.webphone.activeSession ||
      this._deps.webphone.ringSession ||
      {};

    return {
      hidden,
      defaultOffsetX,
      defaultOffsetY,
      session: currentSession,
      currentLocale: this._deps.locale.currentLocale,
    };
  }

  getUIFunctions({
    goToCallCtrl,
  }: CallBadgeContainerProps): UIFunctions<CallBadgePanelProps> {
    return {
      goToCallCtrl,
      toggleMinimized: (id) => this._deps.webphone.toggleMinimized(id),
    };
  }
}

export { CallBadgeUI };
