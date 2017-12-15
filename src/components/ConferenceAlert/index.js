import React from 'react';
import PropTypes from 'prop-types';
import messages from 'ringcentral-integration/modules/Conference/messages';
import i18n from './i18n';

export default function ConferenceAlert(props) {
  const msg = i18n.getString(props.message.message, props.currentLocale);
  return (
    <span>{msg}</span>
  );
}

ConferenceAlert.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  message: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }).isRequired,
};

ConferenceAlert.handleMessage = ({ message }) => (
  message === messages.requireAditionalNumbers
);
