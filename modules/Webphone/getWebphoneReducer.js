"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getVideoElementPreparedReducer = getVideoElementPreparedReducer;
exports.getConnectionStatusReducer = getConnectionStatusReducer;
exports.getWebphoneDeviceReducer = getWebphoneDeviceReducer;
exports.getErrorCodeReducer = getErrorCodeReducer;
exports.getStatusCodeReducer = getStatusCodeReducer;
exports.getConnectRetryCountsReducer = getConnectRetryCountsReducer;
exports.getActiveSessionIdReducer = getActiveSessionIdReducer;
exports.getRingSessionIdReducer = getRingSessionIdReducer;
exports.getLastEndedSessionsReducer = getLastEndedSessionsReducer;
exports.getSessionsReducer = getSessionsReducer;
exports["default"] = getWebphoneReducer;

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.sort");

require("core-js/modules/es6.array.filter");

var _redux = require("redux");

var _getModuleStatusReducer = _interopRequireDefault(require("../../lib/getModuleStatusReducer"));

var _connectionStatus = _interopRequireDefault(require("./connectionStatus"));

var _sessionStatus = _interopRequireDefault(require("./sessionStatus"));

var _webphoneHelper = require("./webphoneHelper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function getVideoElementPreparedReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var _ref = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref.type;

    if (type === types.videoElementPrepared) return true;
    return state;
  };
}

function getConnectionStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _connectionStatus["default"].disconnected;

    var _ref2 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref2.type;

    switch (type) {
      case types.connect:
        // trigger by first 3 connect from disconnected or connectFailed status
        return _connectionStatus["default"].connecting;

      case types.reconnect:
        // trigger by connect from connectError status
        return _connectionStatus["default"].reconnecting;

      case types.registered:
        // trigger when register success
        return _connectionStatus["default"].connected;

      case types.connectFailed:
        // trigger when connect failed (retry time <=2)
        return _connectionStatus["default"].connectFailed;

      case types.connectError:
        // trigger when connect failed (retry time > 2)
        return _connectionStatus["default"].connectError;

      case types.unregistered:
        // trigger by user disconnect success
        return _connectionStatus["default"].disconnected;

      case types.disconnectOnInactive:
        return _connectionStatus["default"].inactiveDisconnecting;

      case types.unregisteredOnInactive:
        return _connectionStatus["default"].inactive;

      case types.disconnect:
        // trigger by user disconnect
        return _connectionStatus["default"].disconnecting;

      default:
        return state;
    }
  };
}

function getWebphoneDeviceReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var _ref3 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref3.type,
        device = _ref3.device;

    switch (type) {
      case types.reconnect:
      case types.connect:
      case types.connectFailed:
      case types.connectError:
      case types.unregistered:
      case types.disconnectOnInactive:
      case types.unregisteredOnInactive:
      case types.disconnect:
        return null;

      case types.registered:
        // trigger when register success
        return device;

      default:
        return state;
    }
  };
}

function getErrorCodeReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var _ref4 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref4.type,
        _ref4$errorCode = _ref4.errorCode,
        errorCode = _ref4$errorCode === void 0 ? state : _ref4$errorCode;

    switch (type) {
      case types.connectError:
      case types.connectFailed:
        return errorCode;

      case types.registered:
        return null;

      default:
        return state;
    }
  };
}

function getStatusCodeReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var _ref5 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref5.type,
        _ref5$statusCode = _ref5.statusCode,
        statusCode = _ref5$statusCode === void 0 ? state : _ref5$statusCode;

    switch (type) {
      case types.connectError:
      case types.connectFailed:
        return statusCode;

      case types.registered:
        return null;

      default:
        return state;
    }
  };
}

function getConnectRetryCountsReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    var _ref6 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref6.type,
        retryCounts = _ref6.retryCounts;

    switch (type) {
      case types.connect:
      case types.reconnect:
        return state + 1;

      case types.unregistered:
      case types.registered:
      case types.unregisteredOnInactive:
        return 0;

      case types.setRetryCounts:
        return retryCounts;

      default:
        return state;
    }
  };
}

function getActiveSessionIdReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var _ref7 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref7.type,
        _ref7$session = _ref7.session,
        session = _ref7$session === void 0 ? {} : _ref7$session,
        _ref7$sessions = _ref7.sessions,
        sessions = _ref7$sessions === void 0 ? [] : _ref7$sessions;

    switch (type) {
      case types.callInit:
      case types.callStart:
      case types.callResume:
        return session.id;

      case types.callEnd:
        {
          if (session.id !== state) {
            return state;
          }

          var activeSessions = sessions.filter(function (x) {
            return !(0, _webphoneHelper.isRing)(x);
          });
          activeSessions.sort(_webphoneHelper.sortByLastActiveTimeDesc);
          return activeSessions[0] && activeSessions[0].id || null;
        }

      case types.clearSessionCaching:
        {
          var _activeSessions = sessions.filter(function (x) {
            return !x.cached && !(0, _webphoneHelper.isRing)(x);
          });

          _activeSessions.sort(_webphoneHelper.sortByLastActiveTimeDesc);

          return _activeSessions[0] && _activeSessions[0].id || null;
        }

      case types.disconnect:
        return null;

      default:
        return state;
    }
  };
}

function getRingSessionIdReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var _ref8 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref8.type,
        _ref8$session = _ref8.session,
        session = _ref8$session === void 0 ? {} : _ref8$session,
        _ref8$sessions = _ref8.sessions,
        sessions = _ref8$sessions === void 0 ? [] : _ref8$sessions;

    switch (type) {
      case types.callRing:
        return session.id;

      case types.callStart:
      case types.callEnd:
        {
          if (session.id !== state) {
            return state;
          }

          var ringSessions = sessions.filter(function (x) {
            return (0, _webphoneHelper.isRing)(x);
          });
          return ringSessions[0] && ringSessions[0].id || null;
        }

      case types.disconnect:
        return null;

      default:
        return state;
    }
  };
}

function getLastEndedSessionsReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var _ref9 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref9.type,
        _ref9$session = _ref9.session,
        session = _ref9$session === void 0 ? {} : _ref9$session;

    switch (type) {
      case types.callEnd:
        {
          if (
          /**
           * don't add incoming call that isn't relied by current app
           *   to end sessions. this call can be answered by other apps
           */
          !session.startTime && !session.isToVoicemail && !session.isForwarded && !session.isReplied) {
            return state;
          }

          var lastSessions = [session].concat(state.filter(function (x) {
            return x.id !== session.id;
          }));
          return lastSessions.slice(0, 5);
        }

      default:
        return state;
    }
  };
}

function getSessionsReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var _ref10 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref10.type,
        sessions = _ref10.sessions,
        cachingSessionIds = _ref10.cachingSessionIds;

    switch (type) {
      case types.updateSessions:
        {
          var cachedSessions = state.filter(function (x) {
            return x.cached;
          });
          cachedSessions.forEach(function (cachedSession) {
            var session = sessions.find(function (x) {
              return x.id === cachedSession.id;
            });

            if (session) {
              session.cached = true;
            } else {
              cachedSession.removed = true;
              sessions.push(cachedSession);
            }
          });
          return sessions.sort(_webphoneHelper.sortByLastActiveTimeDesc);
        }

      case types.setSessionCaching:
        {
          var needUpdate = false;
          cachingSessionIds.forEach(function (sessionId) {
            var session = state.find(function (x) {
              return x.id === sessionId;
            });

            if (session) {
              session.cached = true;
              needUpdate = true;
            }
          });
          return needUpdate ? _toConsumableArray(state) : state;
        }

      case types.clearSessionCaching:
        {
          var _needUpdate = false;
          state.forEach(function (session) {
            if (session.cached) {
              session.cached = false;
              _needUpdate = true;
            }
          });

          if (_needUpdate) {
            return state.filter(function (x) {
              return !x.removed;
            });
          }

          return state;
        }

      case types.onholdCachedSession:
        {
          var _needUpdate2 = false;
          state.forEach(function (session) {
            if (session.cached) {
              session.callStatus = _sessionStatus["default"].onHold;
              session.isOnHold = true;
              _needUpdate2 = true;
            }
          });
          return _needUpdate2 ? _toConsumableArray(state) : state;
        }

      case types.destroySessions:
        return [];

      default:
        return state;
    }
  };
}

function getWebphoneReducer(types) {
  return (0, _redux.combineReducers)({
    status: (0, _getModuleStatusReducer["default"])(types),
    videoElementPrepared: getVideoElementPreparedReducer(types),
    connectionStatus: getConnectionStatusReducer(types),
    connectRetryCounts: getConnectRetryCountsReducer(types),
    errorCode: getErrorCodeReducer(types),
    statusCode: getStatusCodeReducer(types),
    activeSessionId: getActiveSessionIdReducer(types),
    ringSessionId: getRingSessionIdReducer(types),
    sessions: getSessionsReducer(types),
    lastEndedSessions: getLastEndedSessionsReducer(types),
    device: getWebphoneDeviceReducer(types)
  });
}
//# sourceMappingURL=getWebphoneReducer.js.map
