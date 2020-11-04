"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trackEvents = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var trackEvents = _ObjectMap.ObjectMap.fromObject({
  outbound: 'Outbound Call',
  mute: 'Call Control: Mute/Call log page',
  unmute: 'Call Control: Unmute/Call log page',
  hold: 'Call Control: Hold/Call log page',
  unhold: 'Call Control: Unhold/Call log page',
  hangup: 'Call Control: Hang up/Call log page',
  transfer: 'Call Control: Cold transfer/Transfer page',
  authentication: 'Authentication',
  logout: 'Logout',
  callAttemptWebRTC: 'Call Attempt WebRTC',
  callAttempt: 'Call Attempt',
  outboundWebRTCCallConnected: 'Outbound WebRTC Call Connected',
  outboundCallConnected: 'Outbound Call Connected',
  webRTCRegistration: 'WebRTC registration',
  smsAttempt: 'SMS Attempt',
  smsSentSuccessfully: 'SMS: SMS sent successfully',
  smsSentFailed: 'SMS: SMS sent failed',
  logCall: 'Log Call',
  logSMS: 'Log SMS',
  clickToDial: 'Click To Dial',
  callPlaceRingOutCallClickToDial: 'Call: Place RingOut call/Click to Dial ',
  clickToSMS: 'Click To SMS',
  viewEntityDetails: 'View Entity Details',
  addEntity: 'Add Entity',
  editCallLog: 'Edit Call Log',
  editSMSLog: 'Edit SMS Log',
  inboundWebRTCCallConnected: 'Inbound WebRTC Call Connected',
  coldTransferCall: 'Cold Transfer Call',
  clickToDialTextList: 'Click To Dial (Text List)',
  clickToDialVoicemailList: 'Click To Dial (Voicemail List)',
  clickToSMSVoicemailList: 'Click to SMS (Voicemail List)',
  deleteVoicemail: 'Delete Voicemail',
  flagVoicemail: 'Flag Voicemail',
  clickToDialContactDetails: 'Click To Dial (Contact Details)',
  clickToSMSContactDetails: 'Click To SMS (Contact Details)',
  clickToDialCallHistory: 'Click To dial (Call History)',
  clickToSMSCallHistory: 'Click To SMS (Call History)',
  inviteWithTextConference: 'Invite With Text (Conference)',
  selectAdditionalDialInNumber: 'Select Additional Dial-in Number (Conference)',
  joinAsHostConference: 'Join As Host (Conference)',
  whatsNew: "What's New",
  clickHoldAllCalls: 'Click Hold (All Calls)',
  clickHangupAllCalls: 'Click Hangup (All Calls)',
  clickCallItem: 'Click Call Item (All Calls)',
  clickAddCallControl: 'Click Add (Call Control)',
  clickMergeCallControl: 'Click Merge (Call Control)',
  clickMergeMergeCallControl: 'Click Merge (Merge Call Control)',
  clickHangupMergeCallControl: 'Click Hangup (Merge Call Control)',
  callInboundCallConnected: 'Call: Inbound call connected',
  callOutboundRingOutCallConnected: 'Call: Outbound RingOut Call connected',
  clickAddCallsOnHold: 'Click Add (Calls OnHold)',
  clickMergeCallsOnHold: 'Click Merge (Calls OnHold)',
  clickCloseConfirmMergeModal: 'Click Close (ConfirmMerge Modal)',
  clickMergeConfirmMergeModal: 'Click Merge (ConfirmMerge Modal)',
  clickRemoveRemoveParticipantsModal: 'Click Remove (RemoveParticipants Modal)',
  cancelRemoveRemoveParticipantsModal: 'Cancel Remove (RemoveParticipants Modal)',
  clickHangupParticipantList: 'Click Hangup (Participant List)',
  clickParticipantAreaCallControl: 'Click Participant Area (Call Control)',
  clickHangupCallsOnHold: 'Click Hangup (Calls OnHold)'
});

exports.trackEvents = trackEvents;
//# sourceMappingURL=trackEvents.js.map
