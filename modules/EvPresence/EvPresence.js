"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvPresence = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.some");

require("core-js/modules/es6.array.find");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.index-of");

var _core = require("@ringcentral-integration/core");

var _events = _interopRequireDefault(require("events"));

var _di = require("ringcentral-integration/lib/di");

var _enums = require("../../enums");

var _callbackTypes = require("../../lib/EvClient/enums/callbackTypes");

var _helper = require("./helper");

var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var EvPresence = (_dec = (0, _di.Module)({
  name: 'EvPresence',
  deps: ['EvSubscription', 'EvClient', 'EvAuth', 'Storage', 'EvSettings', 'EvAgentSession', 'Alert', {
    dep: 'PresenceOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (that) {
  return [that.callIds, that.callsMapping];
}), _dec3 = (0, _core.computed)(function (that) {
  return [that.otherCallIds, that.callsMapping];
}), _dec4 = (0, _core.computed)(function (that) {
  return [that.callLogsIds, that.callsMapping];
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_RcModuleV) {
  _inherits(EvPresence, _RcModuleV);

  var _super = _createSuper(EvPresence);

  function EvPresence(deps) {
    var _this;

    _classCallCheck(this, EvPresence);

    _this = _super.call(this, {
      deps: deps,
      enableCache: true,
      storageKey: 'EvPresence'
    });
    _this.evPresenceEvents = new _events["default"]();
    _this.showOffHookInitError = true;

    _initializerDefineProperty(_this, "recordId", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "caseId", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "objectValue", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "objectType", _descriptor4, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "callIds", _descriptor5, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "otherCallIds", _descriptor6, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "callLogsIds", _descriptor7, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "callsMapping", _descriptor8, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "rawCallsMapping", _descriptor9, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "dialoutStatus", _descriptor10, _assertThisInitialized(_this));

    _this._deps.evAgentSession.clearCalls = function () {
      _this.clearCalls();
    };

    return _this;
  } // temporary code for test screen pop sf object when inbound call


  _createClass(EvPresence, [{
    key: "setRecordId",
    // temporary code for test screen pop sf object when inbound call
    value: function setRecordId(recordId) {
      this.recordId = recordId;
    } // temporary code for test screen pop sf object when inbound call

  }, {
    key: "setCaseId",
    // temporary code for test screen pop sf object when inbound call
    value: function setCaseId(caseId) {
      this.caseId = caseId;
    } // temporary code for test screen pop sf object when inbound call

  }, {
    key: "setObjectValue",
    // temporary code for test screen pop sf object when inbound call
    value: function setObjectValue(objectValue) {
      this.objectValue = objectValue;
    } // temporary code for test screen pop sf object when inbound call

  }, {
    key: "setObjectType",
    // temporary code for test screen pop sf object when inbound call
    value: function setObjectType(objectType) {
      this.objectType = objectType;
    }
  }, {
    key: "addNewCall",
    value: function addNewCall(call) {
      // note: rawCallsMapping index is raw call uii.
      this.rawCallsMapping[call.uii] = _objectSpread(_objectSpread({}, call), {}, {
        // input timezone in second arg if EV reponse has timezone propoty
        // default timezone is 'America/New_York'
        timestamp: (0, _helper.getTimeStamp)(call.queueDts),
        gate: this._getCurrentGateData(call),
        // temporary code for test screen pop sf object when inbound call
        recordId: this.recordId,
        caseId: this.caseId,
        objectValue: this.objectValue,
        objectType: this.objectType
      });
    }
  }, {
    key: "addNewSession",
    value: function addNewSession(session) {
      var id = this._getCallEncodeId(session);

      if (session.agentId === this._deps.evAuth.agentId) {
        // related to current agent session
        var index = this.callIds.indexOf(id);

        if (index === -1) {
          this.callIds.unshift(id);
        }
      } else {
        // other session without current agent
        var _index = this.otherCallIds.indexOf(id);

        if (_index === -1) {
          this.otherCallIds.unshift(id);
        }
      }

      this.callsMapping[id] = _objectSpread(_objectSpread({}, this.rawCallsMapping[session.uii]), {}, {
        session: session
      });
    }
  }, {
    key: "dropSession",
    value: function dropSession(_dropSession) {
      var id = this._getCallEncodeId(_dropSession);

      this.otherCallIds = this.otherCallIds.filter(function (callId) {
        return callId !== id;
      });
    }
  }, {
    key: "removeEndedCall",
    value: function removeEndedCall(endedCall) {
      var id = this._getCallEncodeId(endedCall); // remove current agent session call with uii.


      this.callIds = this.callIds.filter(function (callId) {
        return callId !== id;
      }); // remove other call session with uii.

      this.otherCallIds = this.otherCallIds.filter(function (callId) {
        return !callId.includes(endedCall.uii);
      }); // add call with id (encodeUii({ uii, sessionId }))

      var callLogsIndex = this.callLogsIds.indexOf(id);

      if (callLogsIndex === -1) {
        this.callLogsIds.unshift(id);
      }

      if (this.callsMapping[id]) {
        this.callsMapping[id].endedCall = endedCall;
      }
    }
  }, {
    key: "setCallHoldStatus",
    value: function setCallHoldStatus(res) {
      var id = this._getCallEncodeId(res);

      this.callsMapping[id].isHold = res.holdState;
    }
  }, {
    key: "clearCalls",
    value: function clearCalls() {
      this.callIds = [];
      this.otherCallIds = [];
    }
  }, {
    key: "setDialoutStatus",
    value: function setDialoutStatus(status) {
      if (this.dialoutStatus !== status) {
        this.dialoutStatus = status;
      }
    }
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this2 = this;

      this._deps.evAgentSession.onConfigSuccess.push(function () {
        if (_this2.calls.length === 0) {
          _this2.setDialoutStatus(_enums.dialoutStatuses.idle);
        }
      });

      this._bindSubscription();
    }
  }, {
    key: "setOffhookInit",
    value: function setOffhookInit() {
      this._deps.evSettings.setOffhookInit();
    }
  }, {
    key: "setOffhookTerm",
    value: function setOffhookTerm() {
      this._deps.evSettings.setOffhookTerm();
    }
  }, {
    key: "_bindSubscription",
    value: function _bindSubscription() {
      var _this3 = this;

      this._deps.evSubscription.subscribe(_callbackTypes.EvCallbackTypes.OFFHOOK_INIT, function (data) {
        _this3.evPresenceEvents.emit(_callbackTypes.EvCallbackTypes.OFFHOOK_INIT, data);

        if (data.status === 'OK') {
          _this3.setOffhookInit(); // when that is reject integrated softphone, we not alert error

        } else if (_this3.showOffHookInitError) {
          _this3._deps.alert.danger({
            message: _enums.messageTypes.OFFHOOK_INIT_ERROR
          });

          _this3.setOffhookTerm();

          _this3.showOffHookInitError = true;
        }
      });

      this._deps.evSubscription.subscribe(_callbackTypes.EvCallbackTypes.OFFHOOK_TERM, function (data) {
        if (data.status === 'OK') {
          _this3.setOffhookTerm();
        } else {
          _this3._deps.alert.danger({
            message: _enums.messageTypes.OFFHOOK_TERM_ERROR
          });

          console.error(data);
        }
      });

      this._deps.evSubscription.subscribe(_callbackTypes.EvCallbackTypes.ADD_SESSION, function (data) {
        if (data.status === 'OK') {
          _this3.addNewSession(data);
        } else {
          _this3._deps.alert.danger({
            message: _enums.messageTypes.ADD_SESSION_ERROR
          });
        }
      });

      this._deps.evSubscription.subscribe(_callbackTypes.EvCallbackTypes.DROP_SESSION, function (data) {
        if (data.status === 'OK') {
          _this3.dropSession(data);
        } else {
          _this3._deps.alert.danger({
            message: _enums.messageTypes.DROP_SESSION_ERROR
          });
        }
      });

      this._deps.evSubscription.subscribe(_callbackTypes.EvCallbackTypes.HOLD, function (data) {
        if (data.status === 'OK') {
          _this3.setCallHoldStatus(data);
        } else {
          _this3._deps.alert.danger({
            message: _enums.messageTypes.HOLD_ERROR
          });
        }
      });

      this._deps.evSubscription.subscribe(_callbackTypes.EvCallbackTypes.NEW_CALL, function (data) {
        _this3.addNewCall(data);
      });

      this._deps.evSubscription.subscribe(_callbackTypes.EvCallbackTypes.END_CALL, function (data) {
        var id = _this3._getCallEncodeId(data);

        if (!_this3.callsMapping[id]) return;

        if (!_this3._deps.evSettings.isManualOffhook) {
          _this3._deps.evClient.offhookTerm();
        }

        _this3.removeEndedCall(data);
      });
    }
  }, {
    key: "_getCurrentGateData",
    value: function _getCurrentGateData(call) {
      var currentGateId = call.queue.number;

      var currentQueueGroup = this._deps.evAuth.availableRequeueQueues.find(function (_ref) {
        var gates = _ref.gates;
        return gates.some(function (_ref2) {
          var gateId = _ref2.gateId;
          return gateId === currentGateId;
        });
      });

      return {
        gateId: currentGateId,
        gateGroupId: currentQueueGroup === null || currentQueueGroup === void 0 ? void 0 : currentQueueGroup.gateGroupId
      };
    }
  }, {
    key: "_getCallEncodeId",
    value: function _getCallEncodeId(_ref3) {
      var uii = _ref3.uii,
          sessionId = _ref3.sessionId;
      return this._deps.evClient.encodeUii({
        sessionId: sessionId,
        uii: uii
      });
    }
  }, {
    key: "calls",
    get: function get() {
      var _this4 = this;

      return this.callIds.map(function (id) {
        return _this4.callsMapping[id];
      }).filter(function (call) {
        return !!call;
      });
    }
  }, {
    key: "otherCalls",
    get: function get() {
      var _this5 = this;

      return this.otherCallIds.map(function (id) {
        return _this5.callsMapping[id];
      });
    }
  }, {
    key: "callLogs",
    get: function get() {
      var _this6 = this;

      return this.callLogsIds.map(function (id) {
        return _this6.callsMapping[id];
      });
    }
  }]);

  return EvPresence;
}(_core.RcModuleV2), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "recordId", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setRecordId", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setRecordId"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "caseId", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setCaseId", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setCaseId"), _class2.prototype), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "objectValue", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setObjectValue", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setObjectValue"), _class2.prototype), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "objectType", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setObjectType", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setObjectType"), _class2.prototype), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "callIds", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "otherCallIds", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "callLogsIds", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "callsMapping", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "rawCallsMapping", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "dialoutStatus", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _enums.dialoutStatuses.idle;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "calls", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "calls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "otherCalls", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "otherCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "callLogs", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "callLogs"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "addNewCall", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "addNewCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "addNewSession", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "addNewSession"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "dropSession", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "dropSession"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "removeEndedCall", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "removeEndedCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setCallHoldStatus", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setCallHoldStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clearCalls", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "clearCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setDialoutStatus", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setDialoutStatus"), _class2.prototype)), _class2)) || _class);
exports.EvPresence = EvPresence;
//# sourceMappingURL=EvPresence.js.map
