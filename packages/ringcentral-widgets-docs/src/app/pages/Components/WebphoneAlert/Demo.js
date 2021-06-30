import React from 'react';
// eslint-disable-next-line
import WebphoneAlert from '@ringcentral-integration/widgets/components/AlertRenderer/WebphoneAlert';

const props = {};
props.currentLocale = 'en-US';
props.message = {
  message: 'webphone-browserNotSupported',
};
props.brand = {
  name: 'RingCentral',
};

/**
 * A example of `WebphoneAlert`
 */
const WebphoneAlertDemo = () => <WebphoneAlert {...props} />;
export default WebphoneAlertDemo;
