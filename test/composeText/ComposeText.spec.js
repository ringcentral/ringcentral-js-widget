import { getWrapper, timeout } from '../shared';
import NavigationBar from '../../src/components/NavigationBar';
import ComposeTextPanel from '../../src/components/ComposeTextPanel';
import DropdownSelect from '../../src/components/DropdownSelect';
import ConversationPanel from '../../src/components/ConversationPanel';
import { Message } from '../../src/components/ConversationMessageList';

let wrapper = null;
let panel = null;
let submitButton = null;
let textArea = null;
let toNumber = null;
beforeEach(async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 64000;
  wrapper = await getWrapper();
  const navigationBar = wrapper.find(NavigationBar).first();
  await navigationBar.props().goTo('/composeText');
  panel = wrapper.find(ComposeTextPanel).first();
  submitButton = panel.find('.submitButton').first();
  textArea = panel.find('.textField').first().find('textarea').first();
  toNumber = panel.find('.numberInput').first();
});

describe('compose text panel', () => {
  test('initial state', () => {
    expect(panel).toBeDefined();
    expect(panel.props()).toBeDefined();
    expect(submitButton.props()).toBeDefined();
    expect(textArea.props()).toBeDefined();
    expect(toNumber.props()).toBeDefined();
  });

  test('send button status', async () => {
    expect(submitButton.props().disabled).toBe(true);

    textArea.get(0).value = 'Hello world';
    await textArea.simulate('change');
    expect(textArea.props().value).toEqual('Hello world');

    toNumber.get(0).value = 'Hello world';
    await toNumber.simulate('change');
    expect(toNumber.props().value).toEqual('Hello world');

    expect(submitButton.props().disabled).toBe(false);
  });

  test('from dropdown', async () => {
    const dropdownSelect = panel.find(DropdownSelect).first();
    const dropdown = dropdownSelect.find('.dropdown').first();
    const dropdownItems = dropdown.find('.dropdownItem');
    expect(dropdownItems.length > 1).toEqual(true);

    const firstNumber = dropdownItems.at(0).text();
    const secondNumber = dropdownItems.at(1).text();
    expect(firstNumber).not.toEqual(secondNumber);

    const selected = dropdownSelect.find('button.button').first().find('span.selectedValue').first();
    await dropdownItems.at(1).simulate('click');
    expect(selected.text()).toEqual(secondNumber);
    await dropdownItems.at(0).simulate('click');
    expect(selected.text()).toEqual(firstNumber);
  });

  test('send an SMS', async () => {
    const messageContent = `Hello world ${Date.now()}`;
    toNumber.get(0).value = process.env.receiver;
    await toNumber.simulate('change');
    textArea.get(0).value = messageContent;
    await textArea.simulate('change');
    expect(submitButton.props().disabled).toBe(false);
    await submitButton.closest('form').simulate('submit');

    await timeout(16000);

    const conversationPanel = wrapper.find(ConversationPanel);
    expect(conversationPanel.length > 0).toBe(true);
    const messages = conversationPanel.first().find(Message);
    const lastMessage = messages.at(messages.length - 1);
    expect(lastMessage.props()).toBeDefined();
    expect(lastMessage.props().subject).toMatch(new RegExp(messageContent));
  });
});
