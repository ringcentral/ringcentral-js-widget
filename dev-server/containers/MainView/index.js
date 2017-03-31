import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import dynamicsFont from '../../../src/assets/DynamicsFont/DynamicsFont.scss';
import TabNavigationView from '../../../src/components/TabNavigationView';
import RouterInteraction from '../../../src/modules/RouterInteraction';

const tabs = [
  {
    icon: <span className={dynamicsFont.setting} />,
    activityIcon: <span className={dynamicsFont.settingHover} />,
    label: 'Settings',
    path: '/settings',
    isActive: currentPath => (
      currentPath.substr(0, 9) === '/settings'
    ),
  },
  {
    icon: <span className={dynamicsFont.iconCall} />,
    activityIcon: <span className={dynamicsFont.callHover} />,
    label: 'Calls',
    path: '/calls',
  },
  {
    icon: <span className={dynamicsFont.history} />,
    activityIcon: <span className={dynamicsFont.historyHover} />,
    label: 'History',
    path: '/history',
  },
  {
    icon: <span className={dynamicsFont.iconConference} />,
    activityIcon: <span className={dynamicsFont.iconConference} />,
    label: 'Conference',
    path: '/conference',
  },
  {
    icon: <span className={dynamicsFont.iconCallDial} />,
    activityIcon: <span className={dynamicsFont.dialHover} />,
    label: 'Dial Pad',
    path: '/',
  },
  {
    icon: <span className={dynamicsFont.iconMessageAll} />,
    activityIcon: <span className={dynamicsFont.iconMessageAllHover} />,
    label: 'Messages',
    path: '/messages',
    noticeCounts: 0,
  },
  {
    icon: <span className={dynamicsFont.iconComposeText} />,
    activityIcon: <span className={dynamicsFont.iconComposeText} />,
    label: 'Compose Text',
    path: '/composeText',
    // noticeCounts: 2,
  },
];

const MainView = connect((state, props) => {
  const messageTab = tabs.find(tab =>
    tab.label === 'Messages'
  );
  if (messageTab) {
    messageTab.noticeCounts = props.messageStore.unreadCounts;
  }
  let filterTabs = tabs;
  if (props.rolesAndPermissions.permissions &&
      props.rolesAndPermissions.permissions.OutboundSMS !== true &&
      props.rolesAndPermissions.permissions.InternalSMS !== true
      ) {
    filterTabs = tabs.filter(tab =>
                tab.label !== 'SMS' && tab.label !== 'Messages');
    if (props.rolesAndPermissions.permissions.ReadMessages === true) {
      filterTabs = tabs.filter(tab => tab.label !== 'SMS');
    }
  }
  return {
    tabs: filterTabs,
    unreadCounts: props.messageStore.unreadCounts,
    currentPath: props.router.currentPath,
  };
})(TabNavigationView);

MainView.propTypes = {
  router: PropTypes.instanceOf(RouterInteraction).isRequired,
  tabs: TabNavigationView.propTypes.tabs,
};

export default MainView;
