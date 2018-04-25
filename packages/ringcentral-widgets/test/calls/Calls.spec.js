import { getWrapper } from '../shared';
import NavigationBar from '../../src/components/NavigationBar';
import ActiveCallsPanel from '../../src/components/ActiveCallsPanel';

let wrapper = null;
let panel = null;
beforeEach(async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 64000;
  wrapper = await getWrapper();
  const navigationBar = wrapper.find(NavigationBar).first();
  await navigationBar.props().goTo('/calls');
  wrapper.update();
  panel = wrapper.find(ActiveCallsPanel).first();
});

describe('history', () => {
  test('initial state', () => {
    expect(panel).toBeDefined();
    expect(panel.props()).toBeDefined();
    expect(panel.find('p.noCalls').first().text()).toEqual('No active calls');
  });
});
