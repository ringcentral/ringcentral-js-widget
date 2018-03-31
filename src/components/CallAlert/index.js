import React from 'react';
import PropTypes from 'prop-types';
import callErrors from 'ringcentral-integration/modules/Call/callErrors';
import FormattedMessage from '../FormattedMessage';
import styles from './styles.scss';
import i18n from './i18n';

const TELUS_ID = '7310';
export default function CallAlert({
  message: {
    id,
    message,
    payload,
  },
  brand,
  onAreaCodeLinkClick,
  currentLocale,
}) {
  // If brand is Telus and special number is 911,
  // show messages of its own version.
  if (
    brand && brand.id === TELUS_ID &&
    message === callErrors.specialNumber &&
    payload && payload.phoneNumber === '911'
  ) {
    return (<span>{i18n.getString('telus911', currentLocale)}</span>);
  }
  if (message === callErrors.noAreaCode) {
    const areaCode = i18n.getString('areaCode', currentLocale);
    const areaCodeLink = onAreaCodeLinkClick ?
      (
        <a
          className={styles.link}
          onClick={(e) => {
            e.preventDefault();
            onAreaCodeLinkClick({ alertId: id });
          }} >
          {areaCode}
        </a>
      ) :
      areaCode;
    return (
      <FormattedMessage
        message={i18n.getString(message, currentLocale)}
        values={{ areaCodeLink }} />
    );
  }
  if (message === callErrors.noInternational) {
    return (
      <FormattedMessage
        message={i18n.getString(message, currentLocale)}
        values={{ brand: brand.fullName }} />
    );
  }
  return (
    <span>{i18n.getString(message, currentLocale)}</span>
  );
}

CallAlert.propTypes = {
  onAreaCodeLinkClick: PropTypes.func,
  message: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }).isRequired,
  brand: PropTypes.object.isRequired,
  currentLocale: PropTypes.string.isRequired,
};
CallAlert.defaultProps = {
  onAreaCodeLinkClick: undefined
};

CallAlert.handleMessage = ({ message }) => (
  message === callErrors.noToNumber ||
  message === callErrors.noAreaCode ||
  message === callErrors.specialNumber ||
  message === callErrors.connectFailed ||
  message === callErrors.internalError ||
  message === callErrors.notAnExtension ||
  message === callErrors.networkError ||
  message === callErrors.noInternational ||
  message === callErrors.noRingoutEnable
);
