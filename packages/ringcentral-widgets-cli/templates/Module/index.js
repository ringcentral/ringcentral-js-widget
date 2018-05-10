import RcModule from 'ringcentral-integration/lib/RcModule';
import { Module } from 'ringcentral-integration/lib/di';

<% if (dependences.length > 0) { %>
import getReducer from './getReducer';
import actionTypes from './actionTypes';
<% } %>

@Module({
  deps: [
    <%_ dependences.forEach(function(dependence) { -%>
    <%- `{ dep: '${dependence}' },` %>
    <%_ }) -%>
    { dep: '<%- name %>Options', optional: true, spread: true },
  ],
})
export default class <%- name %> extends RcModule {
  constructor({
    <%_ dependences.forEach(function(dependence) { -%>
    <%- `${dependence.charAt(0).toLowerCase()}${dependence.slice(1)},` %>
    <%_ }) -%>
    ...options,
  }) {
    super({
      actionTypes,
      ...options,
    });

    <%_ dependences.forEach(function(dependence) { -%>
    <%- `this._${dependence.charAt(0).toLowerCase()}${dependence.slice(1)} = ${dependence.charAt(0).toLowerCase()}${dependence.slice(1)};` %>
    <%_ }) -%>
    <% if (dependences.length > 0) { %>
    this._reducer = getReducer(this.actionTypes);
    <% } %>
    // your codes here
  }
  // your codes here
  <% if (dependences.length > 0) { %>
  // Codes on state change
  async _onStateChange() {
    if (this._shouldInit()) {
      this.store.dispatch({
        type: this.actionTypes.initSuccess
      });
    } else if (this._shouldReset()) {
      this.store.dispatch({
        type: this.actionTypes.resetSuccess,
      });
    }
  }

  _shouldInit() {
    return (
      <%_ dependences.forEach(function(dependence) { -%>
      <%- `this._${dependence.charAt(0).toLowerCase()}${dependence.slice(1)}.ready &&` %>
      <%_ }) -%>
      this.pending
    );
  }

  _shouldReset() {
    return (
      (
        <%_ dependences.forEach(function(dependence, index) { -%>
        <%- `!this._${dependence.charAt(0).toLowerCase()}${dependence.slice(1)}.ready${index === (dependences.length - 1) ? '' : ' ||'}` %>
        <%_ }) -%>
      ) &&
      this.ready
    );
  }

  get status() {
    return this.state.status;
  }
  <% } %>
  <% if (dependences.length === 0) { %>
  get ready() {
    return true;
  }
  <% } %>
}
