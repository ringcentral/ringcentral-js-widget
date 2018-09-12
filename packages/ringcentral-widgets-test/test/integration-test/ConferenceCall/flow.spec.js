import ConferenceInfo from 'ringcentral-widgets/components/ActiveCallPanel/ConferenceInfo';
import MergeInfo from 'ringcentral-widgets/components/ActiveCallPanel/MergeInfo';
import ConfirmMergeModal from 'ringcentral-widgets/components/ConfirmMergeModal';
import CallsOnholdPanel from 'ringcentral-widgets/components/CallsOnholdPanel';
import ActiveCallItem from 'ringcentral-widgets/components/ActiveCallItemV2';
import * as mock from 'ringcentral-integration/integration-test/mock';
import updateConferenceCallBody from 'ringcentral-integration/integration-test/mock/data/updateConference';
import DialerPanel from 'ringcentral-widgets/components/DialerPanel';
import ActiveCallPad from 'ringcentral-widgets/components/ActiveCallPad';
import ActiveCallButton from 'ringcentral-widgets/components/ActiveCallButton';
import CircleButton from 'ringcentral-widgets/components/CircleButton';
import RecipientsInput from 'ringcentral-widgets/components/RecipientsInput';
import { mockConferenceCallEnv } from '../CallCtrlPage/helper.js';
import { makeCall, mockActiveCalls, mockDetailedPresencePubnub, CONFERENCE_SESSION_ID } from '../../support/callHelper';
import { initPhoneWrapper, timeout } from '../shared';
import deviceBody from './data/device';

const wrapper = null;
const phone = null;

beforeEach(async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 64000;
});

async function enterToNumber(domInput, number) {
  domInput.instance().value = number;
  await domInput.simulate('change');
}

async function updateCallMonitorCalls(phone) {
  const activeCallsBody = mockActiveCalls(phone.webphone.sessions, []);
  mock.activeCalls(activeCallsBody);
  await phone.subscription.subscribe(['/account/~/extension/~/presence'], 10);
  await timeout(100);
  await mockDetailedPresencePubnub(activeCallsBody);
}

async function dialAnotherOutboundCall(phone, wrapper) {
  /* mock data */
  mock.numberParser();
  mock.device(deviceBody);
  phone.webphone.sessions.forEach(x => phone.webphone.hold(x.id));
  /* click action */
  const domInput = wrapper.find(DialerPanel).find(RecipientsInput).find('input');
  enterToNumber(domInput, '987654321');
  const callButton = wrapper.find(DialerPanel).find('.callBtn').first();
  callButton.find(CircleButton).simulate('click');
  await timeout(10);
  /* pubnub push message */
  await updateCallMonitorCalls(phone);
  wrapper.update();
}

async function clickMergeButtonIn(wrapper, phone, pageName) {
  /* mock data */
  mock.conferenceCallBringIn(CONFERENCE_SESSION_ID);
  mock.device(deviceBody, false);
  mock.conferenceCall();
  let mergeButton = null;
  /* click action */
  switch (pageName) {
    case 'OnholdPage':
      expect(wrapper.find(CallsOnholdPanel).find(ActiveCallItem)).toHaveLength(1);
      const callItem = wrapper.find(CallsOnholdPanel).find(ActiveCallItem).first();
      mergeButton = callItem.find('.webphoneButton').first();
      mergeButton.find(CircleButton).simulate('click');
      break;
    case 'SimplifiedCallCtrlPage':
      mergeButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(3);
      mergeButton.find(CircleButton).simulate('click');
      break;
    case 'NormalCallCtrlPage':
      mergeButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(3);
      mergeButton.find(CircleButton).simulate('click');
      await timeout(10);
      wrapper.update();
      const confirmMergeButton = wrapper.find(ConfirmMergeModal).find(CircleButton);
      confirmMergeButton.simulate('click');
      break;
    default:
      console.error('pageName might be error');
      return;
  }
  /* manual terminate normal session, accept conference session */
  phone.webphone.sessions.forEach((x) => {
    const session = phone.webphone._sessions.get(x.id);
    if (!session.isConferenceSession()) {
      session.terminate();
      session.reject();
    }
  });
  await timeout(1000);
  const conferenceSessionId = Object.values(phone.conferenceCall.conferences)[0].sessionId;
  const conferenceSession = phone.webphone._sessions.get(conferenceSessionId);
  conferenceSession.accept(phone.webphone.acceptOptions);
  await timeout(1000);
  wrapper.update();
}

describe('Merge Call Flow: Conference Call Ctrl -> click Merge -> on hold list', () => {
  test('RCINT-8377 Active Conference Call when merged(onheld outbound + active conference):', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    await makeCall(phone);
    await mockConferenceCallEnv(phone);
    wrapper.update();
    // Click Add
    const addButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(3);
    addButton.find(CircleButton).simulate('click');
    await timeout(10);
    expect(phone.routerInteraction.currentPath.indexOf('/conferenceCall/callsOnhold')).toBe(0);
    // Click Merge
    await clickMergeButtonIn(wrapper, phone, 'OnholdPage');
    // Confernce Call Ctrl Page
    const holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    expect(holdButton.find('.buttonTitle').text()).toEqual('Hold');
    expect(wrapper.find(ConferenceInfo)).toHaveLength(1);
  });
  test('RCINT-8377 Active Conference Call when merged(onheld outbound + onheld conference):', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    let holdButton = null;
    await makeCall(phone);
    await mockConferenceCallEnv(phone);
    wrapper.update();
    // Click Hold
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    holdButton.find(CircleButton).simulate('click');
    await timeout(10);
    wrapper.update();
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    expect(holdButton.find('.buttonTitle').text()).toEqual('On Hold');
    // Click Add
    const addButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(3);
    addButton.find(CircleButton).simulate('click');
    await timeout(10);
    expect(phone.routerInteraction.currentPath.indexOf('/conferenceCall/callsOnhold')).toBe(0);
    // Click Merge
    await clickMergeButtonIn(wrapper, phone, 'OnholdPage');
    // Confernce Call Ctrl Page
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    expect(holdButton.find('.buttonTitle').text()).toEqual('Hold');
    expect(wrapper.find(ConferenceInfo)).toHaveLength(1);
  });
});

describe('Merge Call Flow: Conference Call Ctrl -> click Merge -> dialer', () => {
  test('RCINT-8377 Active Conference Call when merged(onheld outbound + onheld conference):', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    let holdButton = null;
    await mockConferenceCallEnv(phone);
    wrapper.update();
    // Click Add
    const addButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(3);
    addButton.find(CircleButton).simulate('click');
    await timeout(10);
    expect(phone.routerInteraction.currentPath.indexOf('/conferenceCall/dialer')).toBe(0);
    // make another call
    await dialAnotherOutboundCall(phone, wrapper);
    expect(phone.webphone.sessions).toHaveLength(2);
    expect(phone.routerInteraction.currentPath).toBe('/calls/active');
    expect(wrapper.find(MergeInfo)).toHaveLength(1);
    // Click Hold
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    holdButton.find(CircleButton).simulate('click');
    await timeout(10);
    wrapper.update();
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    expect(holdButton.find('.buttonTitle').text()).toEqual('On Hold');
    // Click Merge
    await clickMergeButtonIn(wrapper, phone, 'SimplifiedCallCtrlPage');
    // Confernce Call Ctrl Page
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    expect(holdButton.find('.buttonTitle').text()).toEqual('Hold');
    expect(wrapper.find(ConferenceInfo)).toHaveLength(1);
  });
  test('RCINT-8377 Active Conference Call when merged(active outbound + onheld conference):', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    let holdButton = null;
    await mockConferenceCallEnv(phone);
    wrapper.update();
    // Click Add
    const addButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(3);
    addButton.find(CircleButton).simulate('click');
    await timeout(10);
    expect(phone.routerInteraction.currentPath.indexOf('/conferenceCall/dialer')).toBe(0);
    // make another call
    await dialAnotherOutboundCall(phone, wrapper);
    expect(phone.webphone.sessions).toHaveLength(2);
    expect(phone.routerInteraction.currentPath).toBe('/calls/active');
    expect(wrapper.find(MergeInfo)).toHaveLength(1);
    // Click Merge
    await clickMergeButtonIn(wrapper, phone, 'SimplifiedCallCtrlPage');
    // Confernce Call Ctrl Page
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    expect(holdButton.find('.buttonTitle').text()).toEqual('Hold');
    expect(wrapper.find(ConferenceInfo)).toHaveLength(1);
  });
});

describe('Merge Call Flow: Normal Call Ctrl -> click Merge -> popup', () => {
  test('RCINT-8377 Active Conference Call when merged(onheld outbound + onheld conference):', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    let holdButton = null;
    await mockConferenceCallEnv(phone);
    await makeCall(phone);
    await updateCallMonitorCalls(phone);
    wrapper.update();
    // Click Hold
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    holdButton.find(CircleButton).simulate('click');
    await timeout(10);
    wrapper.update();
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    expect(holdButton.find('.buttonTitle').text()).toEqual('On Hold');
    // Click Merge
    await clickMergeButtonIn(wrapper, phone, 'NormalCallCtrlPage');
    // Confernce Call Ctrl Page
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    expect(holdButton.find('.buttonTitle').text()).toEqual('Hold');
    expect(wrapper.find(ConferenceInfo)).toHaveLength(1);
  });
  test('RCINT-8377 Active Conference Call when merged(active outbound + onheld conference):', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    let holdButton = null;
    await mockConferenceCallEnv(phone);
    await makeCall(phone);
    await updateCallMonitorCalls(phone);
    wrapper.update();
    // Click Merge
    await clickMergeButtonIn(wrapper, phone, 'NormalCallCtrlPage');
    // Confernce Call Ctrl Page
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    expect(holdButton.find('.buttonTitle').text()).toEqual('Hold');
    expect(wrapper.find(ConferenceInfo)).toHaveLength(1);
  });
});

describe('Add Call Flow: Normal Call Ctrl -> click Add -> dialer', () => {
  test('RCINT-8377 Active Conference Call when merged(onheld outbound + active outbound):', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    await makeCall(phone);
    wrapper.update();
    // Click Add
    const addButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(3);
    addButton.find(CircleButton).simulate('click');
    await timeout(10);
    expect(phone.routerInteraction.currentPath.indexOf('/conferenceCall/dialer')).toBe(0);
    // make another call
    await dialAnotherOutboundCall(phone, wrapper);
    expect(phone.webphone.sessions).toHaveLength(2);
    expect(phone.routerInteraction.currentPath).toBe('/calls/active');
    expect(wrapper.find(MergeInfo)).toHaveLength(1);
    // Click Merge
    await clickMergeButtonIn(wrapper, phone, 'SimplifiedCallCtrlPage');
    // Confernce Call Ctrl Page
    const holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    expect(holdButton.find('.buttonTitle').text()).toEqual('Hold');
    expect(wrapper.find(ConferenceInfo)).toHaveLength(1);
  });
  test('RCINT-8377 Active Conference Call when merged(onheld outbound + onheld outbound):', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    let holdButton = null;
    const sessionA = await makeCall(phone);
    wrapper.update();
    // Click Add
    const addButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(3);
    addButton.find(CircleButton).simulate('click');
    await timeout(10);
    expect(phone.routerInteraction.currentPath.indexOf('/conferenceCall/dialer')).toBe(0);
    // make another call
    await dialAnotherOutboundCall(phone, wrapper);
    expect(phone.webphone.sessions).toHaveLength(2);
    expect(phone.routerInteraction.currentPath).toBe('/calls/active');
    expect(wrapper.find(MergeInfo)).toHaveLength(1);
    // Click Hold
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    holdButton.find(CircleButton).simulate('click');
    await timeout(10);
    wrapper.update();
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    expect(holdButton.find('.buttonTitle').text()).toEqual('On Hold');
    // Click Merge
    await clickMergeButtonIn(wrapper, phone, 'SimplifiedCallCtrlPage');
    // Confernce Call Ctrl Page
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    expect(holdButton.find('.buttonTitle').text()).toEqual('Hold');
    expect(wrapper.find(ConferenceInfo)).toHaveLength(1);
  });
});

describe('Add Call Flow: Normal Call Ctrl -> click Add -> on hold list', () => {
  test('RCINT-8377 Active Conference Call when merged(onheld outbound + active outbound):', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    const sessionA = await makeCall(phone);
    const sessionB = await makeCall(phone);
    await updateCallMonitorCalls(phone);
    wrapper.update();
    // Click Add
    const addButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(3);
    addButton.find(CircleButton).simulate('click');
    await timeout(10);
    expect(phone.routerInteraction.currentPath.indexOf('/conferenceCall/callsOnhold')).toBe(0);
    // Click Merge
    await clickMergeButtonIn(wrapper, phone, 'OnholdPage');
    // Confernce Call Ctrl Page
    const holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    expect(holdButton.find('.buttonTitle').text()).toEqual('Hold');
    expect(wrapper.find(ConferenceInfo)).toHaveLength(1);
  });
  test('RCINT-8377 Active Conference Call when merged(onheld outbound + onheld outbound):', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    let holdButton = null;
    const sessionA = await makeCall(phone);
    const sessionB = await makeCall(phone);
    await updateCallMonitorCalls(phone);
    wrapper.update();
    // Click Hold
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    holdButton.find(CircleButton).simulate('click');
    await timeout(10);
    wrapper.update();
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    expect(holdButton.find('.buttonTitle').text()).toEqual('On Hold');
    // Click Add
    const addButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(3);
    addButton.find(CircleButton).simulate('click');
    await timeout(10);
    expect(phone.routerInteraction.currentPath.indexOf('/conferenceCall/callsOnhold')).toBe(0);
    // Click Merge
    mock.updateConferenceCall(updateConferenceCallBody.id, updateConferenceCallBody);
    await clickMergeButtonIn(wrapper, phone, 'OnholdPage');
    // Confernce Call Ctrl Page
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    expect(holdButton.find('.buttonTitle').text()).toEqual('Hold');
    expect(wrapper.find(ConferenceInfo)).toHaveLength(1);
  });
});
