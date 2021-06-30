import React from 'react';
// eslint-disable-next-line
import ConnectivityAlert from '@ringcentral-integration/widgets/components/AlertRenderer/ConnectivityAlert';

const props = {};
props.message = {
  message: 'test string',
};
props.currentLocale = 'en-US';

/**
 * A example of `ConnectivityAlert`
 */
const ConnectivityAlertDemo = () => <ConnectivityAlert {...props} />;
export default ConnectivityAlertDemo;
