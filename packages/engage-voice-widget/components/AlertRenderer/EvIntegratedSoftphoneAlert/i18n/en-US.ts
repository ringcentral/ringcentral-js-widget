import { EvSoftphoneEvents } from '../../../../enums';
import { EvCallbackTypes } from '../../../../lib/EvClient/enums';

export default {
  [EvSoftphoneEvents.AUDIO_STREAM_REJECTED]:
    'We need your audio permission for browser using your device, please allow permission in browser setting',
  [EvCallbackTypes.SIP_REGISTRATION_FAILED]:
    'Integrated softphone registration failed.',
  [EvSoftphoneEvents.CALL_REJECTED]:
    'The inbound call ended during routing. Please prepare for subsequent calls.',

  // Attempt to dequeue call to agent failed! Outdial to destination [16503990023*106] failed after [2] seconds with disposition [INTERCEPT]
};
