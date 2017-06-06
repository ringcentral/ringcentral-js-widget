import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { ClientTransport } from 'ringcentral-integration/lib/ChromeTransport';
import getProxyClient from 'ringcentral-integration/lib/proxy/getProxyClient';
import Phone from '../dev-server/Phone';
import App from '../dev-server/containers/App';
import apiConfig from '../dev-server/api-config';
import brandConfig from '../dev-server/brandConfig';
import version from '../dev-server/version';
import prefix from '../dev-server/prefix';

const transport = new ClientTransport();
const ProxyServer = getProxyClient(Phone);

const client = new ProxyServer({
  transport,
  useTabManager: false,
  extensionMode: true,
  apiConfig,
  brandConfig,
  prefix,
  appVersion: version,
});
global.client = client;

const store = createStore(client.reducer);
client.setStore(store);

window.addEventListener('load', () => {
  ReactDOM.render(
    <App
      phone={client}
    />,
    document.querySelector('div#viewport'),
  );
  client.sync(); // Rendering App with Routes would force the history object to default path
});
