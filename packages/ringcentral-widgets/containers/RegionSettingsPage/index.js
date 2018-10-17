import { connect } from 'react-redux';
import RegionSettingsPanel from '../../components/RegionSettingsPanel';
import { withPhone } from '../../lib/phoneContext';

function mapToProps(_, {
  phone: {
    locale,
    regionSettings,
  },
}) {
  return {
    availableCountries: regionSettings.availableCountries,
    countryCode: regionSettings.countryCode,
    areaCode: regionSettings.areaCode,
    currentLocale: locale.currentLocale,
  };
}

function mapToFunctions(_, {
  phone: {
    auth,
    regionSettings,
    routerInteraction,
  },
}) {
  return {
    onLogoutButtonClick: async () => {
      await auth.logout();
    },
    onBackButtonClick: () => {
      routerInteraction.goBack();
    },
    onSave: ({ areaCode, countryCode }) => {
      regionSettings.setData({
        areaCode,
        countryCode,
      });
    },
  };
}

const RegionSettingsPage = withPhone(connect(
  mapToProps,
  mapToFunctions,
)(RegionSettingsPanel));

export {
  mapToFunctions,
  mapToProps,
  RegionSettingsPage as default,
};
