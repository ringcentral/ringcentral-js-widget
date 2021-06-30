import React from 'react';
import { mount } from 'enzyme';
import { createStore } from 'redux';
import * as mock from '@ringcentral-integration/commons/integration-test/mock';
import { ensureLogin } from '@ringcentral-integration/commons/integration-test/utils/HelpUtil';
import SimulateWindowObject from '@ringcentral-integration/commons/integration-test/utils/SimulateWindowObject';
import ClientHistoryRequest from '@ringcentral-integration/commons/integration-test/utils/ClientHistoryRequest';
import { waitUntilEqual } from '@ringcentral-integration/commons/integration-test/utils/WaitUtil';

import { createPhone } from '@ringcentral-integration/widgets-demo/dev-server/Phone';
import brandConfig from '@ringcentral-integration/widgets-demo/dev-server/brandConfig';
import version from '@ringcentral-integration/widgets-demo/dev-server/version';
import prefix from '@ringcentral-integration/widgets-demo/dev-server/prefix';

jest.setTimeout(30 * 1000);

const apiConfig = {
  appKey: 'testKey',
  appSecret: 'testSecret',
  server: 'testServer',
};

SimulateWindowObject();

export const getInstance = async ({
  shouldMockForLogin = true,
  shouldMockWebphone = true,
  ...options
} = {}) => {
  jest.mock('pubnub');
  jest.mock('ringcentral-web-phone');
  jest.mock('ringcentral-call');

  // Mock phone
  const clientService = mock.createSDK({
    cachePrefix: `sdkPrefix-${Date.now()}`, // storage with different prefix in different case
  });
  const phone = createPhone({
    apiConfig,
    brandConfig,
    prefix: `${prefix}-${Date.now()}`, // storage with different prefix in different case
    version,
    clientService,
  });

  const store = createStore(phone.reducer);
  phone.setStore(store);
  // mock.mockClient(phone.client);
  const clientHistoryRequest = new ClientHistoryRequest(
    new Map(),
    phone.client,
  );
  clientHistoryRequest.debugHistoryRequest();
  global.clientHistoryRequest = clientHistoryRequest;

  if (shouldMockForLogin) {
    mock.restore();
    mock.mockForLogin(options);
    phone.connectivityMonitor._checkConnectionFunc = () => true;

    // await ensureLogin(phone.auth, {
    //   username: 'test',
    //   password: 'test',
    // });
    if (shouldMockWebphone) {
      await waitUntilEqual(
        () => !!phone.webphone._webphone,
        '_webphone',
        true,
        5,
        10,
      );
      if (phone.webphone.connecting && phone.webphone._webphone) {
        phone.webphone._webphone.userAgent.trigger?.('registered');
      }
    }
  }
  return {
    phone
  };
};
