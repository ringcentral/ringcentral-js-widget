import messageTypes from 'ringcentral-integration/enums/messageTypes';
import * as mock from 'ringcentral-integration/integration-test/mock';
import ClientHistoryRequest from 'ringcentral-integration/integration-test/utils/ClientHistoryRequest';
import messageSyncBody from 'ringcentral-integration/integration-test/mock/data/messageSync.json';

import { getWrapper, timeout } from '../shared';
import NavigationBar from '../../src/components/NavigationBar';
import MessagesPanel from '../../src/components/MessagesPanel';
import SearchInput from '../../src/components/SearchInput';
import MessageItem from '../../src/components/MessageItem';
import { mockPubnub } from './helper.js';


let wrapper = null;
let panel = null;
let navigationBar = null;
beforeEach(async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 64000;
  wrapper = await getWrapper();
  navigationBar = wrapper.find(NavigationBar).first();
  await navigationBar.props().goTo('/messages');
  wrapper.update();
  panel = wrapper.find(MessagesPanel).first();
  const phone = wrapper.props().phone;
  Object.defineProperty(phone.rolesAndPermissions, 'readFaxPermissions', {
    value: true
  });
  Object.defineProperty(phone.tabManager, 'active', {
    value: true
  });

  mock.restore();
  mock.subscription();
  mock.messageSync({
    records: [{
      ...messageSyncBody.records[0],
      type: 'Fax',
      direction: 'Outbound',
      messageStatus: 'Delivered',
      to: {
        phoneNumber: '987654321',
        name: 'Colin Liu'
      },
      creationTime: (new Date()).toISOString(),
      lastModifiedTime: (new Date()).toISOString(),
    }, {
      ...messageSyncBody.records[1],
      type: 'Fax',
      direction: 'Outbound',
      messageStatus: 'Delivered',
      to: {
        phoneNumber: '123456789',
        name: 'Samuel Huang'
      },
      creationTime: (new Date()).toISOString(),
      lastModifiedTime: (new Date()).toISOString(),
    }],
  });
  await phone.subscription.subscribe(['/account/~/extension/~/message-sync']);
  await timeout(2500);

  await mockPubnub();
  navigationBar = wrapper.find(NavigationBar).first();
  await navigationBar.props().goTo('/messages');
  await panel.find(NavigationBar).props().goTo('Fax');
  wrapper.update();
  panel = wrapper.find(MessagesPanel).at(0);
});
describe('messages', () => {
  test('search will not start when input less than two letters or two numbers', async () => {
    expect(panel.find(MessageItem).length).toEqual(2);
    let searchInput = panel.find(SearchInput).first();
    const domInput = searchInput.find('input').first();
    domInput.instance().value = 'o';
    domInput.simulate('change');
    panel = wrapper.find(MessagesPanel).first();
    searchInput = panel.find(SearchInput).first();
    expect(searchInput.props().value).toEqual('o');
    expect(panel.find(MessageItem).length).toEqual(2);

    domInput.instance().value = '34';
    domInput.simulate('change');
    panel = wrapper.find(MessagesPanel).first();
    searchInput = panel.find(SearchInput).first();
    expect(searchInput.props().value).toEqual('34');
    expect(panel.find(MessageItem).length).toEqual(2);
  });
  test('search but no match', () => {
    let searchInput = panel.find(SearchInput).first();
    const domInput = searchInput.find('input').first();
    domInput.instance().value = 'olia';
    domInput.simulate('change');
    panel = wrapper.find(MessagesPanel).first();
    searchInput = panel.find(SearchInput).first();
    expect(searchInput.props().value).toEqual('olia');
    expect(panel.find('.noMessages').text().trim()).toEqual('No matching records found');

    domInput.instance().value = '12344444';
    domInput.simulate('change');
    panel = wrapper.find(MessagesPanel).first();
    searchInput = panel.find(SearchInput).first();
    expect(searchInput.props().value).toEqual('12344444');
    expect(panel.find('.noMessages').text().trim()).toEqual('No matching records found');
  });
  test('could search by phone number', () => {
    expect(panel.find(MessageItem).length).toEqual(2);
    let searchInput = panel.find(SearchInput).first();
    const domInput = searchInput.find('input').first();
    domInput.instance().value = '23456';
    domInput.simulate('change');
    panel = wrapper.find(MessagesPanel).first();
    searchInput = panel.find(SearchInput).first();
    expect(searchInput.props().value).toEqual('23456');
    expect(panel.find(MessageItem).length).toEqual(1);
  });
  test('could search by contact name', () => {
    expect(panel.find(MessageItem).length).toEqual(2);
    let searchInput = panel.find(SearchInput).first();
    const domInput = searchInput.find('input').first();
    domInput.instance().value = 'oli';
    domInput.simulate('change');
    panel = wrapper.find(MessagesPanel).first();
    searchInput = panel.find(SearchInput).first();
    expect(searchInput.props().value).toEqual('oli');
    expect(panel.find(MessageItem).length).toEqual(1);
  });
});
