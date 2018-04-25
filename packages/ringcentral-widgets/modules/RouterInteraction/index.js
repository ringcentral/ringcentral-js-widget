import RcModule from 'ringcentral-integration/lib/RcModule';
import { Module } from 'ringcentral-integration/lib/di';
import { useRouterHistory, createMemoryHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer, LOCATION_CHANGE } from 'react-router-redux';
import proxify from 'ringcentral-integration/lib/proxy/proxify';
import moduleStatuses from 'ringcentral-integration/enums/moduleStatuses';

function getDefaultHistory() {
  return useRouterHistory(createMemoryHistory)();
}


@Module({
  deps: [
    { dep: 'RouterInteractionOptions', optional: true, spread: true },
  ],
})
export default class RouterInteraction extends RcModule {
  constructor({
    history = getDefaultHistory(),
    ...options
  }) {
    super({ ...options });
    this._reducer = routerReducer;
    this._history = history;
  }
  initialize() {
    this._history = syncHistoryWithStore(this._history, this.store, {
      selectLocationState: () => this.state,
    });
  }
  initializeProxy() {
    this._history = syncHistoryWithStore(this._history, this.store, {
      selectLocationState: () => this.state,
    });
  }

  get _actionTypes() {
    /* no action types */
    return null;
  }

  _onStateChange() {
    /* do nothing */
  }

  get history() {
    return this._history;
  }

  get currentPath() {
    return this.state.locationBeforeTransitions.pathname;
  }

  get status() {
    return moduleStatuses.ready;
  }

  @proxify
  async push(...args) {
    this._history.push(...args);
  }
  @proxify
  async replace(...args) {
    this._history.replace(...args);
  }
  @proxify
  async goBack(...args) {
    this._history.goBack(...args);
  }

  get actionTypes() {
    return {
      locationChange: LOCATION_CHANGE
    };
  }
}
