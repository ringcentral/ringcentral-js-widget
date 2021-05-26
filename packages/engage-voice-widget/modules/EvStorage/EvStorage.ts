import { Module } from 'ringcentral-integration/lib/di';
import { Storage } from 'ringcentral-integration/modules/StorageV2';
import loginStatus from 'ringcentral-integration/modules/Auth/loginStatus';
import { ModuleStatus } from '@ringcentral-integration/core';
import { Deps } from './EvStorage.interface';
import { loginStatus as evLoginStatus } from '../../enums/loginStatus';

@Module({
  name: 'Storage',
  deps: [
    'Auth',
    'EvAuth',
    { dep: 'TabManager', optional: true },
    { dep: 'StorageOptions', optional: true },
  ],
})
export class EvStorage extends Storage<Deps> {
  constructor(deps: Deps) {
    super(deps);
    this._disableInactiveTabsWrite =
      this._deps.storageOptions?.disableInactiveTabsWrite ?? true;
  }

  _shouldInit() {
    return (
      this._deps.auth.loginStatus === loginStatus.loggedIn &&
      (!this._deps.tabManager || this._deps.tabManager.ready) &&
      this._deps.evAuth.loginStatus === evLoginStatus.LOGIN_SUCCESS &&
      this.pending
    );
  }

  _shouldReset() {
    return (
      super._shouldReset() ||
      (this.ready && this._deps.evAuth.loginStatus === evLoginStatus.NOT_AUTH)
    );
  }

  get storageKey() {
    const { agentId } = this._deps.evAuth;
    return `${this.prefix ? `${this.prefix}-` : ''}storage-${
      this._deps.auth.ownerId
    }${agentId ? `-${agentId}` : ''}`;
  }
}
