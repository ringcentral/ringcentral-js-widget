"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isChrome = isChrome;
exports.isFirefox = isFirefox;
exports.isEnableMidLinesInSDP = isEnableMidLinesInSDP;
exports.isWebSocketSupport = isWebSocketSupport;
exports.isWebRTCSupport = isWebRTCSupport;
exports.isBrowserSupport = isBrowserSupport;
exports.extractHeadersData = extractHeadersData;
exports.normalizeSession = normalizeSession;
exports.isRing = isRing;
exports.isOnHold = isOnHold;
exports.sortByCreationTimeDesc = sortByCreationTimeDesc;
exports.sortByLastActiveTimeDesc = sortByLastActiveTimeDesc;
exports.isConferenceSession = isConferenceSession;
exports.isRecording = isRecording;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.regexp.match");

var _recordStatus = _interopRequireDefault(require("./recordStatus"));

var _sessionStatus = _interopRequireDefault(require("./sessionStatus"));

var _utils = require("../../lib/di/utils/utils");

var _callDirections = _interopRequireDefault(require("../../enums/callDirections"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var environment;

if (typeof window !== 'undefined') {
  environment = window;
}

if (typeof global !== 'undefined') {
  environment = global.window || global;
}

function isChrome() {
  if (!environment.navigator) {
    return false;
  }

  var browserUa = environment.navigator.userAgent.toLowerCase();
  return !!browserUa.match(/chrom(e|ium)/);
}

function isFirefox() {
  if (!environment.navigator) {
    return false;
  }

  var browserUa = environment.navigator.userAgent.toLowerCase();
  return browserUa.indexOf('firefox') > -1 && !isChrome();
}

function isEnableMidLinesInSDP() {
  if (!isFirefox()) {
    return false;
  }

  var version = parseInt(navigator.userAgent.toLowerCase().match(/firefox\/([0-9]+)/)[1], 10);
  return version >= 63;
}

function isWebSocketSupport() {
  return !!(environment && environment.WebSocket);
}

function isWebRTCSupport() {
  if (!environment.navigator) {
    return false;
  }

  return !!(environment.MediaStream && environment.RTCPeerConnection && environment.navigator.mediaDevices.getUserMedia);
}

function isBrowserSupport() {
  return isWebSocketSupport() && isWebRTCSupport();
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
      var _ref2 = _slicedToArray(_ref, 2),
          key = _ref2[0],
          value = _ref2[1];

      accum[(0, _utils.camelize)(key)] = value;
      return accum;
    }, {});

    if (Object.keys(data).length) {
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
    isOnHold: !!session.localHold,
    isOnMute: !!session.__rc_isOnMute,
    isOnFlip: !!session.__rc_isOnFlip,
    isOnTransfer: !!session.__rc_isOnTransfer,
    isToVoicemail: !!session.__rc_isToVoicemail,
    isForwarded: !!session.__rc_isForwarded,
    isReplied: !!session.__rc_isReplied,
    recordStatus: session.__rc_recordStatus || _recordStatus["default"].idle,
    contactMatch: session.__rc_contactMatch,
    minimized: !!session.__rc_minimized,
    partyData: session.__rc_partyData || null,
    lastActiveTime: session.__rc_lastActiveTime,
    cached: false,
    removed: false
  };
}

function isRing(session) {
  return !!(session && session.direction === _callDirections["default"].inbound && session.callStatus === _sessionStatus["default"].connecting);
}

function isOnHold(session) {
  return !!(session && session.isOnHold);
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
  return !!(session && (session.recordStatus === _recordStatus["default"].pending || session.recordStatus === _recordStatus["default"].recording));
}
//# sourceMappingURL=webphoneHelper.js.map
