'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.isBrowserSupport = isBrowserSupport;
exports.extractHeadersData = extractHeadersData;
exports.normalizeSession = normalizeSession;
exports.isRing = isRing;
exports.isOnHold = isOnHold;
exports.sortByCreationTimeDesc = sortByCreationTimeDesc;
exports.sortByLastActiveTimeDesc = sortByLastActiveTimeDesc;
exports.isConferenceSession = isConferenceSession;
exports.isRecording = isRecording;

var _recordStatus = require('./recordStatus');

var _recordStatus2 = _interopRequireDefault(_recordStatus);

var _sessionStatus = require('./sessionStatus');

var _sessionStatus2 = _interopRequireDefault(_sessionStatus);

var _utils = require('../../lib/di/utils/utils');

var _callDirections = require('../../enums/callDirections');

var _callDirections2 = _interopRequireDefault(_callDirections);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isBrowserSupport() {
  var isChrome = !!navigator.userAgent.match(/Chrom(e|ium)/);
  if (!isChrome) {
    return false;
  }
  var chromeVersion = parseInt(navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)[2], 10);
  if (chromeVersion >= 51) {
    return true;
  }
  return false;
}

function extractHeadersData(session, headers) {
  if (headers && headers['P-Rc-Api-Ids'] && headers['P-Rc-Api-Ids'][0] && headers['P-Rc-Api-Ids'][0].raw) {
    /**
     * interface PartyData {
     *  "partyId": String,
     *  "sessionId": String
     * }
     *
     * INFO: partyId is ID of the participant in current Session. Mostly it represents User on the call,
     * it could be active participant (talking right now) or already disconnected User,
     * e.g. who made a transfer to another person.
     * To identify the User who owns the party you need to find owner.extensionId within party.
     */
    var data = headers['P-Rc-Api-Ids'][0].raw.split(';').map(function (sub) {
      return sub.split('=');
    }).reduce(function (accum, _ref) {
      var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
          key = _ref2[0],
          value = _ref2[1];

      accum[(0, _utils.camelize)(key)] = value;
      return accum;
    }, {});

    if ((0, _keys2.default)(data).length) {
      session.__rc_partyData = data;
    }
  }

  if (headers && headers['Call-ID'] && headers['Call-ID'][0] && headers['Call-ID'][0].raw) {
    session.__rc_callId = headers['Call-ID'][0].raw;
  }
}

function normalizeSession(session) {
  return {
    id: session.id,
    callId: session.__rc_callId,
    direction: session.__rc_direction,
    callStatus: session.__rc_callStatus,
    to: session.request.to.uri.user,
    toUserName: session.request.to.displayName,
    from: session.request.from.uri.user,
    fromNumber: session.__rc_fromNumber,
    fromUserName: session.request.from.displayName,
    startTime: session.startTime && new Date(session.startTime).getTime(),
    creationTime: session.__rc_creationTime,
    isOnHold: !!session.isOnHold().local,
    isOnMute: !!session.__rc_isOnMute,
    isOnFlip: !!session.__rc_isOnFlip,
    isOnTransfer: !!session.__rc_isOnTransfer,
    isToVoicemail: !!session.__rc_isToVoicemail,
    isForwarded: !!session.__rc_isForwarded,
    isReplied: !!session.__rc_isReplied,
    recordStatus: session.__rc_recordStatus || _recordStatus2.default.idle,
    contactMatch: session.__rc_contactMatch,
    minimized: !!session.__rc_minimized,
    partyData: session.__rc_partyData || null,
    lastActiveTime: session.__rc_lastActiveTime,
    cached: false,
    removed: false
  };
}

function isRing(session) {
  return !!(session && session.direction === _callDirections2.default.inbound && session.callStatus === _sessionStatus2.default.connecting);
}

function isOnHold(session) {
  return !!(session && session.callStatus === _sessionStatus2.default.onHold);
}

function sortByCreationTimeDesc(l, r) {
  return r.startTime - l.startTime;
}

function sortByLastActiveTimeDesc(l, r) {
  if (!l || !r) {
    return 0;
  }
  if (r.lastActiveTime !== l.lastActiveTime) {
    return r.lastActiveTime - l.lastActiveTime;
  }
  return sortByCreationTimeDesc(l, r);
}

/**
 * HACK: this function is not very reliable, only use it before the merging complete.
 */
function isConferenceSession(session) {
  return session && session.to && session.to.indexOf('conf_') === 0;
}

function isRecording(session) {
  return !!(session && (session.recordStatus === _recordStatus2.default.pending || session.recordStatus === _recordStatus2.default.recording));
}
//# sourceMappingURL=webphoneHelper.js.map