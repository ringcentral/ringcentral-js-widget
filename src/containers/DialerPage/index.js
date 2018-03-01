import { connect } from 'react-redux';
import formatNumber from 'ringcentral-integration/lib/formatNumber';
import callingModes from 'ringcentral-integration/modules/CallingSettings/callingModes';

import DialerPanel from '../../components/DialerPanel';
import withPhone from '../../lib/withPhone';

function mapToProps(_, {
  phone: {
    call,
    dialerUI,
    callingSettings,
    contactSearch,
    connectivityMonitor,
    locale,
    rateLimiter,
    webphone,
    audioSettings,
  }
}) {
  const isWebphoneMode = (callingSettings.callingMode === callingModes.webphone);
  const waitingWebphoneConnected = (isWebphoneMode && webphone && webphone.connecting);
  const webphoneDisconnected = (isWebphoneMode && webphone && !webphone.connected);
  return {
    currentLocale: locale.currentLocale,
    callingMode: callingSettings.callingMode,
    isWebphoneMode,
    callButtonDisabled: (
      !call.isIdle
      || !connectivityMonitor.connectivity
      || rateLimiter.throttling
      || webphoneDisconnected
    ),
    toNumber: dialerUI.toNumberField,
    recipient: dialerUI.recipient,
    searchContactList: contactSearch ? contactSearch.sortedResult : [],
    fromNumbers: callingSettings.fromNumbers,
    fromNumber: callingSettings.fromNumber,
    showSpinner: !(
      call.ready &&
      callingSettings.ready &&
      locale.ready &&
      connectivityMonitor.ready &&
      (!isWebphoneMode || !webphone || !waitingWebphoneConnected)
    ),
    dialButtonVolume: audioSettings ? audioSettings.dialButtonVolume : 1,
    dialButtonMuted: audioSettings ? audioSettings.dialButtonMuted : 1,
  };
}

function mapToFunctions(_, {
  phone: {
    callingSettings,
    regionSettings,
    contactSearch,
    dialerUI,
  },
  phoneTypeRenderer,
  recipientsContactInfoRenderer,
  recipientsContactPhoneRenderer,
}) {
  return {
    onToNumberChange: value => (
      dialerUI.setToNumberField(value)
    ),
    clearToNumber: () => dialerUI.clearToNumberField(),
    onCallButtonClick: () => {
      dialerUI.onCallButtonClick();
    },
    changeFromNumber: (...args) => callingSettings.updateFromNumber(...args),
    formatPhone: phoneNumber => formatNumber({
      phoneNumber,
      areaCode: regionSettings && regionSettings.areaCode,
      countryCode: regionSettings && regionSettings.countryCode,
    }),
    setRecipient: recipient => dialerUI.setRecipient(recipient),
    clearRecipient: () => dialerUI.clearRecipient(),
    searchContact: (searchString) => {
      if (!contactSearch) {
        return;
      }
      contactSearch.debouncedSearch({ searchString });
    },
    phoneTypeRenderer,
    recipientsContactInfoRenderer,
    recipientsContactPhoneRenderer,
  };
}

const DialerPage = withPhone(connect(
  mapToProps,
  mapToFunctions,
)(DialerPanel));

export {
  mapToFunctions,
  mapToProps,
  DialerPage as default,
};
