"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _HashMap = _interopRequireDefault(require("../lib/HashMap"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = new _HashMap["default"]({
  IPPhoneOffline: 'IP Phone offline',
  abandoned: 'Abandoned',
  account: 'Account',
  blocked: 'Blocked',
  busy: 'Busy',
  callAccepted: 'Call accepted',
  accepted: 'Accepted',
  callConnected: 'Call connected',
  callFailed: 'Call Failed',
  callFailure: 'Call Failure',
  declined: 'Declined',
  faxOnDemand: 'Fax on Demand',
  faxReceiptError: 'Fax Receipt Error',
  faxSendError: 'Fax Send Error',
  hangUp: 'Hang up',
  HangUp: 'Hang Up',
  // The Platform not only returns 'Hang up' but alse 'Hang Up', So we add two Key
  internalError: 'Internal Error',
  internationalDisabled: 'International Disabled',
  internationalRestriction: 'International Restriction',
  missed: 'Missed',
  noAnswer: 'No Answer',
  noFaxMachine: 'No fax machine',
  partialReceive: 'Partial Receive',
  partiallySent: 'Partially Sent',
  poorLineQuality: 'Poor Line Quality',
  receiveError: 'Receive Error',
  received: 'Received',
  rejected: 'Rejected',
  reply: 'Reply',
  restrictedNumber: 'Restricted Number',
  resultEmpty: 'ResultEmpty',
  resultInProgress: 'ResultInProgress',
  sendError: 'Send Error',
  sent: 'Sent',
  stopped: 'Stopped',
  suspended: 'Suspended',
  unknown: 'Unknown',
  voicemail: 'Voicemail',
  wrongNumber: 'Wrong Number',
  faxReceipt: 'Fax Receipt',
  suspendedAccount: 'Suspended Account',
  disconnected: 'Disconnected'
});

exports["default"] = _default;
//# sourceMappingURL=callResults.js.map
