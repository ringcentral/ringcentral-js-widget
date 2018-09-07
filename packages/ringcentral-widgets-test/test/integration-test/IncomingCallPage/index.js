import CircleButton from 'ringcentral-widgets/components/CircleButton';
import ActiveCallPad from 'ringcentral-widgets/components/ActiveCallPad';
import IncomingCallPad from 'ringcentral-widgets/components/IncomingCallPad';
import ActiveCallButton from 'ringcentral-widgets/components/ActiveCallButton';
import { initPhoneWrapper } from '../shared';
import { getInboundCall } from '../../support/callHelper';

beforeEach(async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 64000;
});

async function makeInbountCall(phone, wrapper) {
  await getInboundCall(phone, {
    id: '111',
    direction: 'Inbound',
    callId: 'call-111'
  });
  wrapper.update();
}

describe('Incoming Call Interaction', () => {
  test('When user has an incoming call, page should display Incoming Call Page', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    await makeInbountCall(phone, wrapper);
    expect(wrapper.find(IncomingCallPad)).toHaveLength(1);
  });
});

describe('Inbound Call in Call Control Page', () => {
  test('RCI-1038#2 - User anwser the incoming call, Add button is disabled in Call Control Page', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    await makeInbountCall(phone, wrapper);
    const buttonAnswer = wrapper.find(IncomingCallPad).find(ActiveCallButton).at(4);
    buttonAnswer.find(CircleButton).simulate('click');
    wrapper.update();
    expect(phone.routerInteraction.currentPath).toEqual('/calls/active');
    const buttonAdd = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(3);
    expect(buttonAdd.find('.buttonTitle').text()).toEqual('Add');
    expect(buttonAdd.props().disabled).toBeTruthy();
  });
});

