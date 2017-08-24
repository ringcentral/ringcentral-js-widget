import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import loginStatus from 'ringcentral-integration/modules/Auth/loginStatus';
import formatNumber from 'ringcentral-integration/lib/formatNumber';
import AccountInfo from 'ringcentral-integration/modules/AccountInfo';
import Auth from 'ringcentral-integration/modules/Auth';
import Brand from 'ringcentral-integration/modules/Brand';
import ExtensionInfo from 'ringcentral-integration/modules/ExtensionInfo';
import Locale from 'ringcentral-integration/modules/Locale';
import RegionSettings from 'ringcentral-integration/modules/RegionSettings';
import RolesAndPermissions from 'ringcentral-integration/modules/RolesAndPermissions';
import Presence from 'ringcentral-integration/modules/Presence';
import Router from '../../modules/RouterInteraction';

import SettingsPanel from '../../components/SettingsPanel';

function mapToProps(_, {
  accountInfo,
  auth,
  brand,
  extensionInfo,
  locale,
  regionSettings,
  callingSettings,
  version,
  rolesAndPermissions,
  presence,
  params,
}) {
  let loginNumber = '';
  const loggedIn = auth.loginStatus === loginStatus.loggedIn;
  if (
    loggedIn &&
    accountInfo.ready &&
    extensionInfo.ready
  ) {
    // If no extensionNumber, extensionNumber field needs to be omitted
    const extensionNumber = extensionInfo.extensionNumber &&
      extensionInfo.extensionNumber !== '0' ? extensionInfo.extensionNumber : null;
    const phoneNumber = [accountInfo.mainCompanyNumber, extensionNumber].join('*');
    loginNumber = formatNumber({
      phoneNumber,
      countryCode: regionSettings.countryCode,
      areaCode: regionSettings.areaCode,
    });
  }
  return {
    showSpinner: !(
      accountInfo.ready &&
      auth.ready &&
      loggedIn &&
      extensionInfo.ready &&
      locale.ready &&
      regionSettings.ready &&
      callingSettings.ready &&
      rolesAndPermissions.ready &&
      (!presence || presence.ready)
    ),
    showRegion: loggedIn && brand.id === '1210' && (
      regionSettings.availableCountries.length > 1 ||
      !!regionSettings.availableCountries.find(c => c.isoCode === 'US') ||
      !!regionSettings.availableCountries.find(c => c.isoCode === 'CA')
    ),
    loginNumber,
    version,
    currentLocale: locale.currentLocale,
    brandId: brand.id,
    ringoutEnabled: rolesAndPermissions.ringoutEnabled,
    outboundSMS: !!rolesAndPermissions.permissions.OutboundSMS ||
    !!rolesAndPermissions.permissions.InternalSMS,
    isCallQueueMember: extensionInfo.isCallQueueMember,
    dndStatus: presence && presence.dndStatus,
    userStatus: presence && presence.userStatus,
    showPresenceSettings: !!(presence && params && params.showPresenceSettings),
  };
}

function mapToFunctions(_, {
  auth,
  presence,
  router,
  regionSettingsUrl,
  callingSettingsUrl,
}) {
  return {
    onLogoutButtonClick: async () => {
      await auth.logout();
    },
    onRegionSettingsLinkClick: () => {
      router.push(regionSettingsUrl);
    },
    onCallingSettingsLinkClick: () => {
      router.push(callingSettingsUrl);
    },
    setAvailable: (...args) => (presence && presence.setAvailable(...args)),
    setBusy: (...args) => (presence && presence.setBusy(...args)),
    setDoNotDisturb: (...args) => (presence && presence.setDoNotDisturb(...args)),
    setInvisible: (...args) => (presence && presence.setInvisible(...args)),
    toggleAcceptCallQueueCalls: (...args) => (
      presence && presence.toggleAcceptCallQueueCalls(...args)
    ),
  };
}
const SettingsPage = connect(
  mapToProps,
  mapToFunctions,
)(SettingsPanel);

const propTypes = {
  accountInfo: PropTypes.instanceOf(AccountInfo).isRequired,
  auth: PropTypes.instanceOf(Auth).isRequired,
  brand: PropTypes.instanceOf(Brand).isRequired,
  extensionInfo: PropTypes.instanceOf(ExtensionInfo).isRequired,
  locale: PropTypes.instanceOf(Locale).isRequired,
  regionSettings: PropTypes.instanceOf(RegionSettings).isRequired,
  callingSettingsUrl: PropTypes.string.isRequired,
  regionSettingsUrl: PropTypes.string.isRequired,
  version: PropTypes.string.isRequired,
  rolesAndPermissions: PropTypes.instanceOf(RolesAndPermissions).isRequired,
  presence: PropTypes.instanceOf(Presence),
  router: PropTypes.instanceOf(Router),
  callingSettings: PropTypes.object.isRequired,
};

SettingsPage.propTypes = propTypes;

export {
  mapToFunctions,
  mapToProps,
  propTypes,
  SettingsPage as default,
};
