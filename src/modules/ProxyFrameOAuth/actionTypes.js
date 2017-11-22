import baseActionTypes from 'ringcentral-widgets/lib/OAuthBase/baseActionTypes';
import Enum from 'ringcentral-integration/lib/Enum';

export default new Enum([
  ...Object.keys(baseActionTypes),
  'setupProxy',
  'proxyRetry',
], 'proxyFrameOAuth');
