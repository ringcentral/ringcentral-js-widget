import React from 'react';
import { Route } from 'react-router-dom';

import ActionMenuPage from './Components/ActionMenu';
import ActiveCallBadgePage from './Components/ActiveCallBadge';
import ActiveCallButtonPage from './Components/ActiveCallButton';
import ActiveCallDialPadPage from './Components/ActiveCallDialPad';
import ActiveCallPadPage from './Components/ActiveCallPad';
import ActiveCallPanelPage from './Components/ActiveCallPanel';
import AlertDisplayPage from './Components/AlertDisplay';
import AuthAlertPage from './Components/AuthAlert';
import BackHeaderPage from './Components/BackHeader';
import BadgePage from './Components/Badge';
import ButtonPage from './Components/Button';
import CallAlertPage from './Components/CallAlert';
import CallCtrlPanelPage from './Components/CallCtrlPanel';
import CallIdSelectPage from './Components/CallIdSelect';
import CallListPage from './Components/CallList';
import CallingSettingsAlertPage from './Components/CallingSettingsAlert';
import CallingSettingsPanelPage from './Components/CallingSettingsPanel';
import CallsPanelPage from './Components/CallsPanel';
import CircleButtonPage from './Components/CircleButton';
import ComposeTextPanelPage from './Components/ComposeTextPanel';
import ConferencePanelPage from './Components/ConferencePanel';
import ConnectivityAlertPage from './Components/ConnectivityAlert';
import ContactDisplayPage from './Components/ContactDisplay';
import ContactDropdownListPage from './Components/ContactDropdownList';
import ConversationMessageListPage from './Components/ConversationMessageList';
import DialPadPage from './Components/DialPad';
import DialTextInputPage from './Components/DialTextInput';
import DialerPanelPage from './Components/DialerPanel';
import DraggablePage from './Components/Draggable';
import DropdownSelectPage from './Components/DropdownSelect';
import DurationCounterPage from './Components/DurationCounter';
import EntityModalPage from './Components/EntityModal';
import EnvironmentPage from './Components/Environment';
import EulaPage from './Components/Eula';
import FlipPanelPage from './Components/FlipPanel';
import FooterPage from './Components/Footer';
import ForwardFormPage from './Components/ForwardForm';
import HeaderPage from './Components/Header';
import IconFieldPage from './Components/IconField';
import IconLinePage from './Components/IconLine';
import IncomingCallPadPage from './Components/IncomingCallPad';
import IncomingCallPanelPage from './Components/IncomingCallPanel';
import InputFieldPage from './Components/InputField';
import InputLinePage from './Components/InputLine';
import LinePage from './Components/Line';
import LinkLinePage from './Components/LinkLine';
import LogButtonPage from './Components/LogButton';
import LoginPanelPage from './Components/LoginPanel';
import MessageListPage from './Components/MessageList';
import MessageSenderAlertPage from './Components/MessageSenderAlert';
import ModalPage from './Components/Modal';
import NavigationBarPage from './Components/NavigationBar';
import OfflineModeBadgePage from './Components/OfflineModeBadge';
import PanelPage from './Components/Panel';
import PresenceSettingSectionPage from './Components/PresenceSettingSection';
import PresenceStatusIconPage from './Components/PresenceStatusIcon';
import RadioBtnGroupPage from './Components/RadioBtnGroup';
import RateExceededAlertPage from './Components/RateExceededAlert';
import RecentActivityCallsPage from './Components/RecentActivityCalls';
import RecentActivityMessagesPage from './Components/RecentActivityMessages';
import RecentActivityNavigationButtonPage from './Components/RecentActivityNavigationButton';
import RecentActivityPanelPage from './Components/RecentActivityPanel';
import RecentActivityViewPage from './Components/RecentActivityView';
import RecipientsInputPage from './Components/RecipientsInput';
import RegionSettingsAlertPage from './Components/RegionSettingsAlert';
import RegionSettingsPanelPage from './Components/RegionSettingsPanel';
import RemoveButtonPage from './Components/RemoveButton';
import ReplyWithMessagePage from './Components/ReplyWithMessage';
import RolesAndPermissionsAlertPage from './Components/RolesAndPermissionsAlert';
import SearchInputPage from './Components/SearchInput';
import SelectPage from './Components/Select';
import SettingsPanelPage from './Components/SettingsPanel';
import SlideMenuPage from './Components/SlideMenu';
import SpinnerPage from './Components/Spinner';
import SpinnerOverlayPage from './Components/SpinnerOverlay';
import SwitchPage from './Components/Switch';
import TabNavigationButtonPage from './Components/TabNavigationButton';
import TabNavigationViewPage from './Components/TabNavigationView';
import TextInputPage from './Components/TextInput';
import TransferPanelPage from './Components/TransferPanel';
import WebphoneAlertPage from './Components/WebphoneAlert';

const Routes = () => (
  <div>
    <Route path="/components/ActionMenu" component={ActionMenuPage} />
    <Route path="/components/ActiveCallBadge" component={ActiveCallBadgePage} />
    <Route path="/components/ActiveCallButton" component={ActiveCallButtonPage} />
    <Route path="/components/ActiveCallDialPad" component={ActiveCallDialPadPage} />
    <Route path="/components/ActiveCallPad" component={ActiveCallPadPage} />
    <Route path="/components/ActiveCallPanel" component={ActiveCallPanelPage} />
    <Route path="/components/AlertDisplay" component={AlertDisplayPage} />
    <Route path="/components/AuthAlert" component={AuthAlertPage} />
    <Route path="/components/BackHeader" component={BackHeaderPage} />
    <Route path="/components/Badge" component={BadgePage} />
    <Route path="/components/Button" component={ButtonPage} />
    <Route path="/components/CallAlert" component={CallAlertPage} />
    <Route path="/components/CallCtrlPanel" component={CallCtrlPanelPage} />
    <Route path="/components/CallIdSelect" component={CallIdSelectPage} />
    <Route path="/components/CallList" component={CallListPage} />
    <Route path="/components/CallingSettingsAlert" component={CallingSettingsAlertPage} />
    <Route path="/components/CallingSettingsPanel" component={CallingSettingsPanelPage} />
    <Route path="/components/CallsPanel" component={CallsPanelPage} />
    <Route path="/components/CircleButton" component={CircleButtonPage} />
    <Route path="/components/ComposeTextPanel" component={ComposeTextPanelPage} />
    <Route path="/components/ConferencePanel" component={ConferencePanelPage} />
    <Route path="/components/ConnectivityAlert" component={ConnectivityAlertPage} />
    <Route path="/components/ContactDisplay" component={ContactDisplayPage} />
    <Route path="/components/ContactDropdownList" component={ContactDropdownListPage} />
    <Route path="/components/ConversationMessageList" component={ConversationMessageListPage} />
    <Route path="/components/DialPad" component={DialPadPage} />
    <Route path="/components/DialTextInput" component={DialTextInputPage} />
    <Route path="/components/DialerPanel" component={DialerPanelPage} />
    <Route path="/components/Draggable" component={DraggablePage} />
    <Route path="/components/DropdownSelect" component={DropdownSelectPage} />
    <Route path="/components/DurationCounter" component={DurationCounterPage} />
    <Route path="/components/EntityModal" component={EntityModalPage} />
    <Route path="/components/Environment" component={EnvironmentPage} />
    <Route path="/components/Eula" component={EulaPage} />
    <Route path="/components/FlipPanel" component={FlipPanelPage} />
    <Route path="/components/Footer" component={FooterPage} />
    <Route path="/components/ForwardForm" component={ForwardFormPage} />
    <Route path="/components/Header" component={HeaderPage} />
    <Route path="/components/IconField" component={IconFieldPage} />
    <Route path="/components/IconLine" component={IconLinePage} />
    <Route path="/components/IncomingCallPad" component={IncomingCallPadPage} />
    <Route path="/components/IncomingCallPanel" component={IncomingCallPanelPage} />
    <Route path="/components/InputField" component={InputFieldPage} />
    <Route path="/components/InputLine" component={InputLinePage} />
    <Route path="/components/Line" component={LinePage} />
    <Route path="/components/LinkLine" component={LinkLinePage} />
    <Route path="/components/LogButton" component={LogButtonPage} />
    <Route path="/components/LoginPanel" component={LoginPanelPage} />
    <Route path="/components/MessageList" component={MessageListPage} />
    <Route path="/components/MessageSenderAlert" component={MessageSenderAlertPage} />
    <Route path="/components/Modal" component={ModalPage} />
    <Route path="/components/NavigationBar" component={NavigationBarPage} />
    <Route path="/components/OfflineModeBadge" component={OfflineModeBadgePage} />
    <Route path="/components/Panel" component={PanelPage} />
    <Route path="/components/PresenceSettingSection" component={PresenceSettingSectionPage} />
    <Route path="/components/PresenceStatusIcon" component={PresenceStatusIconPage} />
    <Route path="/components/RadioBtnGroup" component={RadioBtnGroupPage} />
    <Route path="/components/RateExceededAlert" component={RateExceededAlertPage} />
    <Route path="/components/RecentActivityCalls" component={RecentActivityCallsPage} />
    <Route path="/components/RecentActivityMessages" component={RecentActivityMessagesPage} />
    <Route path="/components/RecentActivityNavigationButton" component={RecentActivityNavigationButtonPage} />
    <Route path="/components/RecentActivityPanel" component={RecentActivityPanelPage} />
    <Route path="/components/RecentActivityView" component={RecentActivityViewPage} />
    <Route path="/components/RecipientsInput" component={RecipientsInputPage} />
    <Route path="/components/RegionSettingsAlert" component={RegionSettingsAlertPage} />
    <Route path="/components/RegionSettingsPanel" component={RegionSettingsPanelPage} />
    <Route path="/components/RemoveButton" component={RemoveButtonPage} />
    <Route path="/components/ReplyWithMessage" component={ReplyWithMessagePage} />
    <Route path="/components/RolesAndPermissionsAlert" component={RolesAndPermissionsAlertPage} />
    <Route path="/components/SearchInput" component={SearchInputPage} />
    <Route path="/components/Select" component={SelectPage} />
    <Route path="/components/SettingsPanel" component={SettingsPanelPage} />
    <Route path="/components/SlideMenu" component={SlideMenuPage} />
    <Route path="/components/Spinner" component={SpinnerPage} />
    <Route path="/components/SpinnerOverlay" component={SpinnerOverlayPage} />
    <Route path="/components/Switch" component={SwitchPage} />
    <Route path="/components/TabNavigationButton" component={TabNavigationButtonPage} />
    <Route path="/components/TabNavigationView" component={TabNavigationViewPage} />
    <Route path="/components/TextInput" component={TextInputPage} />
    <Route path="/components/TransferPanel" component={TransferPanelPage} />
    <Route path="/components/WebphoneAlert" component={WebphoneAlertPage} />
  </div>
);

export default Routes;
