import { connect } from '../../../utils/integration/';

import WebPhone from './presentation/WebPhone.react';
import { getString } from '../../../utils/locale/';
import LPN from 'google-libphonenumber';

import countryData from 'country-data';

const phoneUtil = LPN.PhoneNumberUtil.getInstance();

function clean(str) {
  return str.slice(0, str.indexOf('@'));
}

const statusMapping = {
  REGISTER_SUCCESSED: 'IDLE',
  PRE_REGISTER: 'IDLE',
  CALL_INCOMING: 'ON_INCOMING_CALL',
  CALL_CONNECTING: 'ON_CALL',
  CALL_CONNECTED: 'ON_CALL',
};

const numberTypeMapping = {
  CompanyFaxNumber: {
    priority: 0,
    abbr: 'Company',
  },
  CompanyNumber: {
    priority: 1,
    abbr: 'Company',
  },
  MainCompanyNumber: {
    priority: 2,
    abbr: 'Main',
  },
  DirectNumber: {
    priority: 3,
    abbr: 'Direct',
  },
};

function countryMapping(name) {
  return countryData.lookup.countries({ name })[0].alpha2;
}

function getInternationalPhone(raw, country = 'US') {
  if (!raw) return '';
  return phoneUtil.format(
    phoneUtil.parse(
      raw,
      country
    ),
    LPN.PhoneNumberFormat.INTERNATIONAL
  );
}

const withRedux = connect((state, props, phone) => {
  return {
    accept: () => phone.webphone.accept(),
    call: (...args) => phone.webphone.call(...args),
    bye: () => phone.webphone.bye(),
    flip: (...args) => phone.webphone.flip(...args),
    transfer: (...args) => phone.webphone.transfer(...args),
    park: (...args) => phone.webphone.park(...args),
    record: (...args) => phone.webphone.record(...args),
    hold: (...args) => phone.webphone.hold(...args),
    mute: (...args) => phone.webphone.mute(...args),
    dtmf: (...args) => phone.webphone.dtmf(...args),

    // enums
    enums: phone.webphone.enums,

    // <WebPhone />
    status: statusMapping[state.common.webphone.status],

    // <ActiveCall />
    operationStatus: state.common.webphone.operation.status,
    disabledOperation: state.common.webphone.operation.disabled,
    webphoneStatus: state.common.webphone.status,
    // phoneNumber could be (temp) toNumber from dial pad or
    // actuall info from sip
    callingNumber: getInternationalPhone(
                    state.common.webphone.remoteIdentity ?
                    clean(state.common.webphone.remoteIdentity.friendlyName) :
                    state.common.webphone.toNumber
                  ),

    // <Flip />
    flipNumbers: state.common.user.forwardingNumbers
                  .filter(number => number.features.indexOf('CallFlip') > -1),

    // <DialPad />

    // <Transfer />

    // <CallerBar />
    userNumbers: state.common.user.phoneNumbers
      .sort((a, b) =>
        numberTypeMapping[b.usageType].priority - numberTypeMapping[a.usageType].priority)
      .map(number => Object.assign({}, number, {
        left: countryMapping(number.country.name),
        mid: getInternationalPhone(number.phoneNumber, countryMapping(number.country.name)),
        right: numberTypeMapping[number.usageType].abbr,
      })),

    // locale
    getString: getString.bind(null, state.locale.lang),
  };
})(WebPhone);

export default withRedux;
