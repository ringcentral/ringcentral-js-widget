import React from 'react';
import { shallow, mount } from 'enzyme';
import { wrap } from 'module';
import { getWrapper, timeout } from '../shared';
import FeedbackPanel from '../../src/components/FeedbackPanel';
import SettingsPanel from '../../src/components/SettingsPanel';
import NavigationBar from '../../src/components/NavigationBar';
import BackHeader from '../../src/components/BackHeader';
import TextInput from '../../src/components/TextInput';
import Select from '../../src/components/DropdownSelect';
import { HeaderButton } from '../../src/components/Header';

describe('<FeedbackPanel />', () => {
  let wrapper = null;
  let panel = null;
  beforeEach(async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 64000;
    wrapper = await getWrapper();
    const navigationBar = wrapper.find(NavigationBar).first();
    await navigationBar.props().goTo('/settings/feedback');
    wrapper.update();
    panel = wrapper.find(FeedbackPanel).first();
    expect(panel).toBeDefined();
  });
  it('Navigate back to setting page', async () => {
    const backBtn = wrapper.find(BackHeader).find('i').first();
    backBtn.simulate('click');
    panel = wrapper.find(SettingsPanel).first();
    wrapper.update();
    expect(panel).toBeDefined();
  });
  it('should store data', async () => {
    const navigationBar = wrapper.find(NavigationBar).first();
    wrapper.find('input').at(0).instance().value = 'Test0';
    wrapper.find('input').at(0).simulate('change');
    wrapper.find('input').at(1).instance().value = 'Test1';
    wrapper.find('input').at(1).simulate('change');
    wrapper.find('ul').at(0).simulate('click');
    wrapper.find('li').at(2).simulate('click');
    wrapper.find('textarea').at(0).instance().value = 'Test textarea';
    wrapper.find('textarea').at(0).simulate('change');
    await navigationBar.props().goTo('/composeText');
    wrapper.update();
    await navigationBar.props().goTo('/settings/feedback');
    wrapper.update();
    expect(wrapper.find(TextInput).at(0).props().value).toEqual('Test0');
    expect(wrapper.find(Select).at(0).props().value).toEqual('2');
    expect(wrapper.find(TextInput).at(1).props().value).toEqual('Test1');
    expect(wrapper.find('textarea').at(0).instance().value).toEqual('Test textarea');
  });
  it('revert all changes', async () => {
    wrapper.find('input').at(0).instance().value = 'Test0';
    wrapper.find('input').at(0).simulate('change');
    wrapper.find('input').at(1).instance().value = 'Test1';
    wrapper.find('input').at(1).simulate('change');
    wrapper.find('ul').at(0).simulate('click');
    wrapper.find('li').at(2).simulate('click');
    wrapper.find('textarea').at(0).instance().value = 'Test textarea';
    wrapper.find('textarea').at(0).simulate('change');
    const revertBtn = wrapper.find(BackHeader).at(0).find(HeaderButton).at(1);
    revertBtn.simulate('click');
    expect(wrapper.find(TextInput).at(0).props().value).toEqual('');
    expect(wrapper.find(Select).at(0).props().value).toEqual('-1');
    expect(wrapper.find(TextInput).at(1).props().value).toEqual('');
    expect(wrapper.find('textarea').at(0).instance().value).toEqual('');
  });
});
