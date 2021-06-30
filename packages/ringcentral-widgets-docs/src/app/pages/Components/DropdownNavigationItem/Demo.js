import React from 'react';
// eslint-disable-next-line
import DropdownNavigationItem from '@ringcentral-integration/widgets/components/DropdownNavigationItem';
// eslint-disable-next-line
import dynamicsFont from '@ringcentral-integration/widgets/assets/DynamicsFont/DynamicsFont.scss';

const props = {};
props.icon = <span className={dynamicsFont.setting} />;
props.activeIcon = <span className={dynamicsFont.settingHover} />;
props.label = 'Settings';
props.path = '/settings';

/**
 * A example of `DropdownNavigationItem`
 */
const DropdownNavigationItemDemo = () => <DropdownNavigationItem {...props} />;
export default DropdownNavigationItemDemo;
