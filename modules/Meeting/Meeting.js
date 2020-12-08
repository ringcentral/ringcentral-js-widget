"use strict";

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.array.find");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Meeting = void 0;

require("core-js/modules/es6.array.from");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.promise");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("regenerator-runtime/runtime");

var _core = require("@ringcentral-integration/core");

var _moment = _interopRequireDefault(require("moment"));

var _ramda = require("ramda");

var _meetingHelper = require("../../helpers/meetingHelper");

var _background = _interopRequireDefault(require("../../lib/background"));

var _di = require("../../lib/di");

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _RcModule2 = _interopRequireDefault(require("../../lib/RcModule"));

var _selector = require("../../lib/selector");

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

var _getMeetingReducer = _interopRequireWildcard(require("./getMeetingReducer"));

var _meetingErrors = require("./meetingErrors");

var _meetingStatus = _interopRequireDefault(require("./meetingStatus"));

var _scheduleStatus = _interopRequireDefault(require("./scheduleStatus"));

var _constants = require("./constants");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _class, _class2, _descriptor, _descriptor2, _temp;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

// eslint-disable-next-line
var Meeting = (_dec = (0, _di.Module)({
  deps: ['Brand', 'Alert', 'Client', 'ExtensionInfo', 'Storage', 'MeetingProvider', {
    dep: 'AvailabilityMonitor',
    optional: true
  }, {
    dep: 'MeetingOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (_ref) {
  var _enableServiceWebSettings = _ref._enableServiceWebSettings,
      scheduleUserSettings = _ref.scheduleUserSettings;
  return [_enableServiceWebSettings, scheduleUserSettings];
}), _dec3 = (0, _core.computed)(function (_ref2) {
  var _enablePersonalMeeting = _ref2._enablePersonalMeeting,
      personalMeeting = _ref2.personalMeeting;
  return [_enablePersonalMeeting, personalMeeting];
}), _dec4 = (0, _core.computed)(function (_ref3) {
  var _enableServiceWebSettings = _ref3._enableServiceWebSettings,
      scheduleLockedSettings = _ref3.scheduleLockedSettings;
  return [_enableServiceWebSettings, scheduleLockedSettings];
}), _dec5 = (0, _core.computed)(function (_ref4) {
  var initialMeetingSetting = _ref4.initialMeetingSetting,
      defaultLockedSettings = _ref4.defaultLockedSettings,
      commonUserSettings = _ref4.commonUserSettings,
      commonPersonalMeetingSettings = _ref4.commonPersonalMeetingSettings;
  return [initialMeetingSetting, defaultLockedSettings, commonUserSettings, commonPersonalMeetingSettings];
}), _dec6 = (0, _core.computed)(function (_ref5) {
  var initialMeetingSetting = _ref5.initialMeetingSetting,
      defaultLockedSettings = _ref5.defaultLockedSettings,
      commonUserSettings = _ref5.commonUserSettings,
      commonPersonalMeetingSettings = _ref5.commonPersonalMeetingSettings,
      savedDefaultMeetingSetting = _ref5.savedDefaultMeetingSetting,
      lastMeetingSetting = _ref5.lastMeetingSetting;
  return [initialMeetingSetting, defaultLockedSettings, commonUserSettings, commonPersonalMeetingSettings, savedDefaultMeetingSetting, lastMeetingSetting];
}), _dec7 = (0, _core.computed)(function (_ref6) {
  var _enablePersonalMeeting = _ref6._enablePersonalMeeting,
      _enableServiceWebSettings = _ref6._enableServiceWebSettings,
      scheduleUserSettings = _ref6.scheduleUserSettings;
  return [_enablePersonalMeeting, _enableServiceWebSettings, scheduleUserSettings];
}), _dec8 = (0, _core.computed)(function (_ref7) {
  var userSettings = _ref7.userSettings;
  return [userSettings];
}), _dec9 = (0, _core.computed)(function (_ref8) {
  var userSettings = _ref8.userSettings;
  return [userSettings];
}), _dec10 = (0, _core.computed)(function (_ref9) {
  var lockedSettings = _ref9.lockedSettings;
  return [lockedSettings];
}), _dec11 = (0, _core.computed)(function (_ref10) {
  var lockedSettings = _ref10.lockedSettings;
  return [lockedSettings];
}), _dec12 = (0, _core.computed)(function (_ref11) {
  var state = _ref11.state;
  return [state.userSettings];
}), _dec13 = (0, _core.computed)(function (_ref12) {
  var state = _ref12.state;
  return [state.lockedSettings];
}), _dec14 = (0, _core.computed)(function (_ref13) {
  var state = _ref13.state,
      loginUser = _ref13.loginUser;
  return [state, loginUser];
}), _dec15 = (0, _core.computed)(function (_ref14) {
  var extensionInfo = _ref14.extensionInfo;
  return [extensionInfo];
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_RcModule) {
  _inherits(Meeting, _RcModule);

  var _super = _createSuper(Meeting);

  // TODO: add state interface
  function Meeting(_ref15) {
    var _this;

    var brand = _ref15.brand,
        alert = _ref15.alert,
        client = _ref15.client,
        extensionInfo = _ref15.extensionInfo,
        storage = _ref15.storage,
        availabilityMonitor = _ref15.availabilityMonitor,
        reducers = _ref15.reducers,
        meetingProvider = _ref15.meetingProvider,
        _ref15$showSaveAsDefa = _ref15.showSaveAsDefault,
        showSaveAsDefault = _ref15$showSaveAsDefa === void 0 ? false : _ref15$showSaveAsDefa,
        _ref15$enableInvitati = _ref15.enableInvitationApi,
        enableInvitationApi = _ref15$enableInvitati === void 0 ? false : _ref15$enableInvitati,
        _ref15$enablePersonal = _ref15.enablePersonalMeeting,
        enablePersonalMeeting = _ref15$enablePersonal === void 0 ? false : _ref15$enablePersonal,
        _ref15$enableReloadAf = _ref15.enableReloadAfterSchedule,
        enableReloadAfterSchedule = _ref15$enableReloadAf === void 0 ? true : _ref15$enableReloadAf,
        _ref15$enableServiceW = _ref15.enableServiceWebSettings,
        enableServiceWebSettings = _ref15$enableServiceW === void 0 ? false : _ref15$enableServiceW,
        _ref15$enableSchedule = _ref15.enableScheduleOnBehalf,
        enableScheduleOnBehalf = _ref15$enableSchedule === void 0 ? false : _ref15$enableSchedule,
        _ref15$enableCustomTi = _ref15.enableCustomTimezone,
        enableCustomTimezone = _ref15$enableCustomTi === void 0 ? false : _ref15$enableCustomTi,
        options = _objectWithoutProperties(_ref15, ["brand", "alert", "client", "extensionInfo", "storage", "availabilityMonitor", "reducers", "meetingProvider", "showSaveAsDefault", "enableInvitationApi", "enablePersonalMeeting", "enableReloadAfterSchedule", "enableServiceWebSettings", "enableScheduleOnBehalf", "enableCustomTimezone"]);

    _classCallCheck(this, Meeting);

    _this = _super.call(this, _objectSpread(_objectSpread({}, options), {}, {
      actionTypes: options.actionTypes || _actionTypes["default"]
    }));
    _this._brand = void 0;
    _this._alert = void 0;
    _this._client = void 0;
    _this._extensionInfo = void 0;
    _this._storage = void 0;
    _this._availabilityMonitor = void 0;
    _this._lastMeetingSettingKey = void 0;
    _this._defaultMeetingSettingKey = void 0;
    _this._showSaveAsDefault = void 0;
    _this._enableInvitationApi = void 0;
    _this._personalMeetingKey = void 0;
    _this._enablePersonalMeeting = void 0;
    _this._enableReloadAfterSchedule = void 0;
    _this._enableServiceWebSettings = void 0;
    _this._enableScheduleOnBehalf = void 0;
    _this._fetchPersonMeetingTimeout = void 0;
    _this._meetingProvider = void 0;
    _this._fetchDelegatorsTimeout = void 0;
    _this._enableCustomTimezone = void 0;

    _initializerDefineProperty(_this, "defaultMeetingSetting", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "initialMeetingSetting", _descriptor2, _assertThisInitialized(_this));

    _this._brand = brand;
    _this._alert = alert;
    _this._client = client;
    _this._storage = storage;
    _this._extensionInfo = extensionInfo;
    _this._meetingProvider = meetingProvider;
    _this._showSaveAsDefault = showSaveAsDefault;
    _this._enableInvitationApi = enableInvitationApi;
    _this._enableCustomTimezone = enableCustomTimezone;
    _this._enableReloadAfterSchedule = enableReloadAfterSchedule;
    _this._enablePersonalMeeting = enablePersonalMeeting;
    _this._enableServiceWebSettings = enableServiceWebSettings;
    _this._enableScheduleOnBehalf = enableScheduleOnBehalf;
    _this._availabilityMonitor = availabilityMonitor;
    _this._lastMeetingSettingKey = 'lastMeetingSetting';
    _this._defaultMeetingSettingKey = 'defaultMeetingSetting';
    _this._personalMeetingKey = 'personalMeeting';
    _this._reducer = (0, _getMeetingReducer["default"])(_this.actionTypes, reducers);

    _this._storage.registerReducer({
      key: _this._lastMeetingSettingKey,
      reducer: (0, _getMeetingReducer.getMeetingStorageReducer)(_this.actionTypes)
    });

    if (_this._showSaveAsDefault) {
      _this._storage.registerReducer({
        key: _this._defaultMeetingSettingKey,
        reducer: (0, _getMeetingReducer.getDefaultMeetingSettingReducer)(_this.actionTypes)
      });
    }

    if (_this._enablePersonalMeeting) {
      _this._storage.registerReducer({
        key: _this._personalMeetingKey,
        reducer: (0, _getMeetingReducer.getPersonalMeetingReducer)(_this.actionTypes)
      });
    }

    return _this;
  }

  _createClass(Meeting, [{
    key: "initialize",
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe(function () {
        return _this2._onStateChange();
      });
    }
  }, {
    key: "_onStateChange",
    value: function () {
      var _onStateChange2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this._shouldInit()) {
                  _context.next = 5;
                  break;
                }

                _context.next = 3;
                return this._init();

              case 3:
                _context.next = 6;
                break;

              case 5:
                if (this._shouldReset()) {
                  this._reset();
                }

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _onStateChange() {
        return _onStateChange2.apply(this, arguments);
      }

      return _onStateChange;
    }()
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return this.pending && this._alert.ready && this._storage.ready && this._extensionInfo.ready && this._meetingProvider.ready && this._meetingProvider.isRCM && (!this._availabilityMonitor || this._availabilityMonitor.ready);
    }
  }, {
    key: "_initMeetingSettings",
    value: function () {
      var _initMeetingSettings2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(extensionId) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this._enablePersonalMeeting) {
                  _context2.next = 3;
                  break;
                }

                _context2.next = 3;
                return this._initPersonalMeeting(extensionId);

              case 3:
                if (!this._enableServiceWebSettings) {
                  _context2.next = 6;
                  break;
                }

                _context2.next = 6;
                return this._updateServiceWebSettings(extensionId);

              case 6:
                _context2.next = 8;
                return this._initMeeting(extensionId);

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _initMeetingSettings(_x) {
        return _initMeetingSettings2.apply(this, arguments);
      }

      return _initMeetingSettings;
    }()
  }, {
    key: "_init",
    value: function () {
      var _init2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.init
                });
                _context3.next = 3;
                return this._initMeetingSettings();

              case 3:
                if (!this._enableScheduleOnBehalf) {
                  _context3.next = 6;
                  break;
                }

                _context3.next = 6;
                return this._initScheduleFor();

              case 6:
                this.store.dispatch({
                  type: this.actionTypes.initSuccess
                });

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _init() {
        return _init2.apply(this, arguments);
      }

      return _init;
    }()
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return this.ready && (!this._alert.ready || !this._storage.ready || !this._extensionInfo.ready || !this._meetingProvider.ready || !this._meetingProvider.isRCM || this._availabilityMonitor && !this._availabilityMonitor.ready);
    }
  }, {
    key: "_reset",
    value: function _reset() {
      this.store.dispatch({
        type: this.actionTypes.resetSuccess
      });
    }
    /**
     * Init basic meeting information
     * also load meeting setting from previous one.
     */

  }, {
    key: "init",
    value: function init() {
      this._initMeeting();
    }
  }, {
    key: "reload",
    value: function reload() {
      this._initMeeting();
    }
  }, {
    key: "_initMeeting",
    value: function _initMeeting(extensionId) {
      this.update(_objectSpread(_objectSpread({}, this.defaultMeetingSetting), {}, {
        host: {
          id: extensionId || this.loginUser.id
        }
      }));

      this._updatePreferences();
    }
  }, {
    key: "_initPersonalMeeting",
    value: function () {
      var _initPersonalMeeting2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(extensionId) {
        var _this3 = this;

        var meetingInfoResponse, meeting;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (this._fetchPersonMeetingTimeout) {
                  clearTimeout(this._fetchPersonMeetingTimeout);
                }

                _context4.prev = 1;
                _context4.next = 4;
                return this.fetchPersonalMeeting(extensionId);

              case 4:
                meetingInfoResponse = _context4.sent;
                meeting = this.formatPersonalMeeting(meetingInfoResponse);
                this.store.dispatch({
                  type: this.actionTypes.updatePersonalMeeting,
                  meeting: meeting
                });
                _context4.next = 15;
                break;

              case 9:
                _context4.prev = 9;
                _context4.t0 = _context4["catch"](1);
                console.error('fetch personal meeting error:', _context4.t0);
                this.store.dispatch({
                  type: this.actionTypes.resetPersonalMeeting
                });
                console.warn('retry after 10s');
                this._fetchPersonMeetingTimeout = setTimeout(function () {
                  _this3._initPersonalMeeting(extensionId);
                }, 10000);

              case 15:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[1, 9]]);
      }));

      function _initPersonalMeeting(_x2) {
        return _initPersonalMeeting2.apply(this, arguments);
      }

      return _initPersonalMeeting;
    }()
  }, {
    key: "_initScheduleFor",
    value: function () {
      var _initScheduleFor2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var _this4 = this;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (this._fetchDelegatorsTimeout) {
                  clearTimeout(this._fetchDelegatorsTimeout);
                }

                _context5.prev = 1;
                _context5.next = 4;
                return this.setDelegators();

              case 4:
                _context5.next = 11;
                break;

              case 6:
                _context5.prev = 6;
                _context5.t0 = _context5["catch"](1);
                console.error('fetch delegators error:', _context5.t0);
                console.warn('retry after 10s');
                this._fetchDelegatorsTimeout = setTimeout(function () {
                  _this4.setDelegators();
                }, 10000);

              case 11:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[1, 6]]);
      }));

      function _initScheduleFor() {
        return _initScheduleFor2.apply(this, arguments);
      }

      return _initScheduleFor;
    }()
  }, {
    key: "combineWithSettings",
    value: function combineWithSettings(_meeting) {
      return this._combineWithSWSettings(_meeting);
    }
  }, {
    key: "update",
    value: function update(_meeting) {
      var meeting = _meeting;

      if (this._enableServiceWebSettings) {
        meeting = this.combineWithSettings(_meeting);
      }

      this.store.dispatch({
        type: this.actionTypes.updateMeeting,
        meeting: _objectSpread(_objectSpread({}, meeting), {}, {
          isMeetingPasswordValid: this.validatePasswordSettings(_meeting.password, _meeting._requireMeetingPassword)
        })
      });

      this._comparePreferences();
    }
  }, {
    key: "switchUsePersonalMeetingId",
    value: function () {
      var _switchUsePersonalMeetingId = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(usePersonalMeetingId) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                this.update(usePersonalMeetingId ? this.pmiDefaultSettings : this.generalDefaultSettings);

              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function switchUsePersonalMeetingId(_x3) {
        return _switchUsePersonalMeetingId.apply(this, arguments);
      }

      return switchUsePersonalMeetingId;
    }()
  }, {
    key: "updateScheduleFor",
    value: function () {
      var _updateScheduleFor = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(userExtensionId) {
        var hostId, user;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (!(!userExtensionId || !this.delegators || this.delegators.length === 0)) {
                  _context7.next = 2;
                  break;
                }

                return _context7.abrupt("return");

              case 2:
                hostId = "".concat(userExtensionId);
                user = (0, _ramda.find)(function (item) {
                  return item.id === hostId;
                }, this.delegators);

                if (!user) {
                  _context7.next = 7;
                  break;
                }

                _context7.next = 7;
                return this._initMeetingSettings(hostId);

              case 7:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function updateScheduleFor(_x4) {
        return _updateScheduleFor.apply(this, arguments);
      }

      return updateScheduleFor;
    }()
  }, {
    key: "_updatePreferences",
    value: function _updatePreferences() {
      this.store.dispatch({
        type: this.actionTypes.updateMeetingPreferences,
        preferences: (0, _meetingHelper.prunePreferencesObject)(this.meeting)
      });
    }
  }, {
    key: "_comparePreferences",
    value: function _comparePreferences() {
      var preferences = this.preferences,
          meeting = this.meeting;
      this.store.dispatch({
        type: this.actionTypes.saveMeetingPreferencesState,
        isPreferencesChanged: (0, _meetingHelper.comparePreferences)(preferences, meeting)
      });
    }
  }, {
    key: "_updateServiceWebSettings",
    value: function () {
      var _updateServiceWebSettings2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(extensionId) {
        var _yield$Promise$all, _yield$Promise$all2, userSettings, lockedSettings;

        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return Promise.all([this.getUserSettings(extensionId), this.getLockedSettings()]);

              case 2:
                _yield$Promise$all = _context8.sent;
                _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
                userSettings = _yield$Promise$all2[0];
                lockedSettings = _yield$Promise$all2[1];
                this.store.dispatch({
                  type: this.actionTypes.updateUserSettings,
                  userSettings: userSettings
                });
                this.store.dispatch({
                  type: this.actionTypes.updateLockedSettings,
                  lockedSettings: lockedSettings
                });

              case 8:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function _updateServiceWebSettings(_x5) {
        return _updateServiceWebSettings2.apply(this, arguments);
      }

      return _updateServiceWebSettings;
    }()
  }, {
    key: "_initDefaultData",
    value: function _initDefaultData(meeting, _ref16, usePmi) {
      var userSettings = _ref16.userSettings,
          personalMeetingSettings = _ref16.personalMeetingSettings;

      if (!this._enableServiceWebSettings) {
        return meeting;
      }

      var _this$scheduleUserSet = this.scheduleUserSettings,
          _this$scheduleUserSet2 = _this$scheduleUserSet.requirePasswordForSchedulingNewMeetings,
          requirePasswordForSchedulingNewMeetings = _this$scheduleUserSet2 === void 0 ? false : _this$scheduleUserSet2,
          requirePasswordForPmiMeetings = _this$scheduleUserSet.requirePasswordForPmiMeetings;
      var _this$scheduleLockedS = this.scheduleLockedSettings,
          lockedRequirePasswordForSchedulingNewMeetings = _this$scheduleLockedS.requirePasswordForSchedulingNewMeetings,
          lockedRequirePasswordForPmiMeetings = _this$scheduleLockedS.requirePasswordForPmiMeetings;

      var processedMeeting = _objectSpread(_objectSpread(_objectSpread({}, meeting), usePmi ? personalMeetingSettings : userSettings), {}, {
        usePersonalMeetingId: usePmi
      }); // For PMI meetings


      if (usePmi) {
        var allowJoinBeforeHost = processedMeeting.allowJoinBeforeHost,
            _processedMeeting$pas = processedMeeting.password,
            password = _processedMeeting$pas === void 0 ? '' : _processedMeeting$pas;

        if (password !== '') {
          processedMeeting._pmiPassword = password;
        }

        var pmiRequiresPwd;

        switch (requirePasswordForPmiMeetings) {
          case _constants.PMIRequirePassword.NONE:
            pmiRequiresPwd = password !== '';
            break;

          case _constants.PMIRequirePassword.ALL:
            pmiRequiresPwd = true;
            break;

          case _constants.PMIRequirePassword.JBH_ONLY:
            pmiRequiresPwd = allowJoinBeforeHost || password !== '';
            break;

          default:
            pmiRequiresPwd = processedMeeting._requireMeetingPassword;
        }

        var pmiRequiresPwdLocked = processedMeeting._lockRequireMeetingPassword;

        if (requirePasswordForPmiMeetings === _constants.PMIRequirePassword.JBH_ONLY) {
          pmiRequiresPwdLocked = lockedRequirePasswordForPmiMeetings && allowJoinBeforeHost;
        } else if (requirePasswordForPmiMeetings !== _constants.PMIRequirePassword.JBH_ONLY) {
          pmiRequiresPwdLocked = lockedRequirePasswordForPmiMeetings;
        }

        processedMeeting._requireMeetingPassword = pmiRequiresPwd;
        processedMeeting._lockRequireMeetingPassword = pmiRequiresPwdLocked;
      } else {
        // For non-PMI meetings
        if (requirePasswordForSchedulingNewMeetings) {
          processedMeeting._requireMeetingPassword = true;
        }

        if (lockedRequirePasswordForSchedulingNewMeetings) {
          processedMeeting._lockRequireMeetingPassword = true;
        }
      }

      return _objectSpread(_objectSpread({}, processedMeeting), {}, {
        password: processedMeeting._requireMeetingPassword && !processedMeeting.password ? (0, _meetingHelper.generateRandomPassword)() : processedMeeting.password
      });
    }
  }, {
    key: "_combineWithSWSettings",
    value: function _combineWithSWSettings(meeting) {
      if (!meeting.usePersonalMeetingId) {
        return meeting;
      }

      var processedMeeting = _objectSpread({}, meeting);

      var allowJoinBeforeHost = processedMeeting.allowJoinBeforeHost;
      var requirePasswordForPmiMeetings = this.scheduleUserSettings.requirePasswordForPmiMeetings;
      var lockedRequirePasswordForPmiMeetings = this.scheduleLockedSettings.requirePasswordForPmiMeetings;

      if (lockedRequirePasswordForPmiMeetings && requirePasswordForPmiMeetings === _constants.PMIRequirePassword.JBH_ONLY) {
        if (allowJoinBeforeHost && !processedMeeting._requireMeetingPassword) {
          processedMeeting._requireMeetingPassword = true;
          processedMeeting.password = processedMeeting._pmiPassword || (0, _meetingHelper.generateRandomPassword)();
        }

        processedMeeting._lockRequireMeetingPassword = allowJoinBeforeHost;
      }

      return processedMeeting;
    }
  }, {
    key: "fetchPersonalMeeting",
    value: function () {
      var _fetchPersonalMeeting = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(extensionId) {
        var serviceInfo, personalMeetingId, meetingInfoResponse;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return this.getMeetingServiceInfo(extensionId);

              case 2:
                serviceInfo = _context9.sent;
                personalMeetingId = serviceInfo.externalUserInfo.personalMeetingId;
                _context9.next = 6;
                return this.getMeeting(personalMeetingId);

              case 6:
                meetingInfoResponse = _context9.sent;
                return _context9.abrupt("return", meetingInfoResponse);

              case 8:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function fetchPersonalMeeting(_x6) {
        return _fetchPersonalMeeting.apply(this, arguments);
      }

      return fetchPersonalMeeting;
    }()
  }, {
    key: "formatPersonalMeeting",
    value: function formatPersonalMeeting(meetingInfo, shortId) {
      var settings = _objectSpread(_objectSpread(_objectSpread({}, this.initialMeetingSetting), meetingInfo), {}, {
        shortId: shortId || meetingInfo.id,
        usePersonalMeetingId: true
      });

      return _objectSpread(_objectSpread({}, settings), {}, {
        _requireMeetingPassword: !!settings.password
      });
    }
  }, {
    key: "setDelegators",
    value: function () {
      var _setDelegators = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
        var _yield$this$getDelega, records;

        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return this.getDelegators();

              case 2:
                _yield$this$getDelega = _context10.sent;
                records = _yield$this$getDelega.records;
                this.store.dispatch({
                  type: this.actionTypes.updateDelegatorList,
                  delegators: records
                });

              case 5:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function setDelegators() {
        return _setDelegators.apply(this, arguments);
      }

      return setDelegators;
    }()
  }, {
    key: "schedule",
    value: function () {
      var _schedule2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(meeting) {
        var _this5 = this;

        var _ref17,
            _ref17$isAlertSuccess,
            isAlertSuccess,
            _meeting$host,
            formattedMeeting,
            _yield$_promise,
            _yield$_promise2,
            resp,
            serviceInfo,
            invitationInfo,
            result,
            _args11 = arguments;

        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _ref17 = _args11.length > 1 && _args11[1] !== undefined ? _args11[1] : {}, _ref17$isAlertSuccess = _ref17.isAlertSuccess, isAlertSuccess = _ref17$isAlertSuccess === void 0 ? true : _ref17$isAlertSuccess;

                if (!this.isScheduling) {
                  _context11.next = 3;
                  break;
                }

                return _context11.abrupt("return", this.schedule._promise);

              case 3:
                meeting = meeting || this.meeting;
                _context11.prev = 4;
                this.store.dispatch({
                  type: this.actionTypes.initScheduling
                }); // Validate meeting

                this._validate(meeting);

                formattedMeeting = this._format(meeting);

                if (this._showSaveAsDefault && meeting.saveAsDefault) {
                  this.saveAsDefaultSetting(meeting);
                }

                this.schedule._promise = Promise.all([this.postMeeting(formattedMeeting), this.getMeetingServiceInfo((_meeting$host = meeting.host) === null || _meeting$host === void 0 ? void 0 : _meeting$host.id)]);
                _context11.next = 12;
                return this.schedule._promise;

              case 12:
                _yield$_promise = _context11.sent;
                _yield$_promise2 = _slicedToArray(_yield$_promise, 2);
                resp = _yield$_promise2[0];
                serviceInfo = _yield$_promise2[1];
                _context11.next = 18;
                return this.getMeetingInvitation(resp.id);

              case 18:
                invitationInfo = _context11.sent;
                this.store.dispatch({
                  type: this.actionTypes.scheduled,
                  meeting: _objectSpread(_objectSpread({}, formattedMeeting), {}, {
                    id: resp.id,
                    _saved: meeting._saved
                  })
                });
                _context11.next = 22;
                return this._createDialingNumberTpl(serviceInfo, resp, invitationInfo);

              case 22:
                result = _context11.sent;

                // Reload meeting info
                if (this._enableReloadAfterSchedule) {
                  this._initMeeting();
                } // Update personal meeting setting


                if (this._enablePersonalMeeting && resp.usePersonalMeetingId) {
                  this.store.dispatch({
                    type: this.actionTypes.updatePersonalMeeting,
                    meeting: this.formatPersonalMeeting(resp, serviceInfo.externalUserInfo.personalMeetingId)
                  });

                  if (this._enableServiceWebSettings) {
                    this.update(_objectSpread(_objectSpread({}, this.meeting), {}, {
                      _pmiPassword: resp.password
                    }));
                  }
                } // Notify user the meeting has been scheduled


                if (isAlertSuccess) {
                  setTimeout(function () {
                    _this5._alert.success({
                      message: _meetingStatus["default"].scheduledSuccess
                    });
                  }, 50);
                }

                return _context11.abrupt("return", result);

              case 29:
                _context11.prev = 29;
                _context11.t0 = _context11["catch"](4);
                this.store.dispatch({
                  type: this.actionTypes.resetScheduling
                });
                _context11.next = 34;
                return this._errorHandle(_context11.t0);

              case 34:
                return _context11.abrupt("return", null);

              case 35:
                _context11.prev = 35;
                delete this.schedule._promise;
                return _context11.finish(35);

              case 38:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this, [[4, 29, 35, 38]]);
      }));

      function schedule(_x7) {
        return _schedule2.apply(this, arguments);
      }

      return schedule;
    }()
  }, {
    key: "getMeetingServiceInfo",
    value: function () {
      var _getMeetingServiceInfo = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(extensionId) {
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                return _context12.abrupt("return", this._client.account().extension(extensionId).meeting().serviceInfo().get());

              case 1:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function getMeetingServiceInfo(_x8) {
        return _getMeetingServiceInfo.apply(this, arguments);
      }

      return getMeetingServiceInfo;
    }()
  }, {
    key: "getMeeting",
    value: function () {
      var _getMeeting = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(meetingId) {
        var _this6 = this;

        var _ref18,
            _ref18$isAlertError,
            isAlertError,
            settings,
            _yield$e$response$clo,
            errorCode,
            message,
            isMeetingDeleted,
            _args13 = arguments;

        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _ref18 = _args13.length > 1 && _args13[1] !== undefined ? _args13[1] : {}, _ref18$isAlertError = _ref18.isAlertError, isAlertError = _ref18$isAlertError === void 0 ? true : _ref18$isAlertError;
                _context13.prev = 1;
                _context13.next = 4;
                return this._client.account().extension().meeting(meetingId).get();

              case 4:
                settings = _context13.sent;
                return _context13.abrupt("return", _objectSpread(_objectSpread({}, settings), {}, {
                  _requireMeetingPassword: !!settings.password
                }));

              case 8:
                _context13.prev = 8;
                _context13.t0 = _context13["catch"](1);
                _context13.next = 12;
                return _context13.t0.response.clone().json();

              case 12:
                _yield$e$response$clo = _context13.sent;
                errorCode = _yield$e$response$clo.errorCode;
                message = _yield$e$response$clo.message;
                console.log("failed to get meeting info: ".concat(meetingId, ", ").concat(errorCode, ", ").concat(message));
                isMeetingDeleted = errorCode === 'CMN-102' && message.indexOf('[meetingId] is not found') > -1;

                if (isAlertError && isMeetingDeleted) {
                  setTimeout(function () {
                    _this6._alert.danger({
                      message: _meetingStatus["default"].meetingIsDeleted
                    });
                  }, 50);
                }

                throw _context13.t0;

              case 19:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this, [[1, 8]]);
      }));

      function getMeeting(_x9) {
        return _getMeeting.apply(this, arguments);
      }

      return getMeeting;
    }()
  }, {
    key: "postMeeting",
    value: function () {
      var _postMeeting = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(formattedMeeting) {
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                return _context14.abrupt("return", this._client.account().extension().meeting().post(formattedMeeting));

              case 1:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      function postMeeting(_x10) {
        return _postMeeting.apply(this, arguments);
      }

      return postMeeting;
    }()
  }, {
    key: "putMeeting",
    value: function () {
      var _putMeeting = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(meetingId, formattedMeeting) {
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                return _context15.abrupt("return", this._client.account().extension().meeting(meetingId).put(formattedMeeting));

              case 1:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));

      function putMeeting(_x11, _x12) {
        return _putMeeting.apply(this, arguments);
      }

      return putMeeting;
    }()
  }, {
    key: "getDelegators",
    value: function () {
      var _getDelegators = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16() {
        var res;
        return regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                _context16.next = 2;
                return this._client.service.platform().get('/restapi/v1.0/account/~/extension/~/meetings-configuration/assisted');

              case 2:
                res = _context16.sent;
                return _context16.abrupt("return", res.json());

              case 4:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this);
      }));

      function getDelegators() {
        return _getDelegators.apply(this, arguments);
      }

      return getDelegators;
    }()
  }, {
    key: "getMeetingInvitation",
    value: function () {
      var _getMeetingInvitation = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(meetingId) {
        var platform, apiResponse, _yield$apiResponse$js, invitation;

        return regeneratorRuntime.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                if (this._enableInvitationApi) {
                  _context17.next = 2;
                  break;
                }

                return _context17.abrupt("return", null);

              case 2:
                if (!(this._brand.code !== 'rc')) {
                  _context17.next = 4;
                  break;
                }

                return _context17.abrupt("return", null);

              case 4:
                _context17.prev = 4;
                platform = this._client.service.platform();
                _context17.next = 8;
                return platform.send({
                  method: 'GET',
                  url: "/restapi/v1.0/account/~/extension/~/meeting/".concat(meetingId, "/invitation")
                });

              case 8:
                apiResponse = _context17.sent;
                _context17.next = 11;
                return apiResponse.json();

              case 11:
                _yield$apiResponse$js = _context17.sent;
                invitation = _yield$apiResponse$js.invitation;
                return _context17.abrupt("return", {
                  invitation: invitation
                });

              case 16:
                _context17.prev = 16;
                _context17.t0 = _context17["catch"](4);
                console.warn(_context17.t0);
                return _context17.abrupt("return", null);

              case 20:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this, [[4, 16]]);
      }));

      function getMeetingInvitation(_x13) {
        return _getMeetingInvitation.apply(this, arguments);
      }

      return getMeetingInvitation;
    }()
  }, {
    key: "getUserSettings",
    value: function () {
      var _getUserSettings = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18() {
        var extensionId,
            platform,
            apiResponse,
            _yield$apiResponse$js2,
            _yield$apiResponse$js3,
            recording,
            _yield$apiResponse$js4,
            scheduleMeeting,
            _args18 = arguments;

        return regeneratorRuntime.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                extensionId = _args18.length > 0 && _args18[0] !== undefined ? _args18[0] : '~';
                _context18.prev = 1;
                platform = this._client.service.platform();
                _context18.next = 5;
                return platform.send({
                  method: 'GET',
                  url: "/restapi/v1.0/account/~/extension/".concat(extensionId, "/meeting/user-settings")
                });

              case 5:
                apiResponse = _context18.sent;
                _context18.next = 8;
                return apiResponse.json();

              case 8:
                _yield$apiResponse$js2 = _context18.sent;
                _yield$apiResponse$js3 = _yield$apiResponse$js2.recording;
                recording = _yield$apiResponse$js3 === void 0 ? {} : _yield$apiResponse$js3;
                _yield$apiResponse$js4 = _yield$apiResponse$js2.scheduleMeeting;
                scheduleMeeting = _yield$apiResponse$js4 === void 0 ? {} : _yield$apiResponse$js4;
                return _context18.abrupt("return", {
                  recording: recording,
                  scheduleMeeting: scheduleMeeting
                });

              case 16:
                _context18.prev = 16;
                _context18.t0 = _context18["catch"](1);
                console.warn(_context18.t0);
                return _context18.abrupt("return", null);

              case 20:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, this, [[1, 16]]);
      }));

      function getUserSettings() {
        return _getUserSettings.apply(this, arguments);
      }

      return getUserSettings;
    }()
  }, {
    key: "getLockedSettings",
    value: function () {
      var _getLockedSettings = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19() {
        var platform, apiResponse, _yield$apiResponse$js5, _yield$apiResponse$js6, recording, _yield$apiResponse$js7, scheduleMeeting, startParticipantsVideo, startParticipantVideo, restScheduleOptions, processedScheduleMeeting;

        return regeneratorRuntime.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                _context19.prev = 0;
                platform = this._client.service.platform();
                _context19.next = 4;
                return platform.send({
                  method: 'GET',
                  url: '/restapi/v1.0/account/~/meeting/locked-settings'
                });

              case 4:
                apiResponse = _context19.sent;
                _context19.next = 7;
                return apiResponse.json();

              case 7:
                _yield$apiResponse$js5 = _context19.sent;
                _yield$apiResponse$js6 = _yield$apiResponse$js5.recording;
                recording = _yield$apiResponse$js6 === void 0 ? {} : _yield$apiResponse$js6;
                _yield$apiResponse$js7 = _yield$apiResponse$js5.scheduleMeeting;
                scheduleMeeting = _yield$apiResponse$js7 === void 0 ? {} : _yield$apiResponse$js7;
                startParticipantsVideo = scheduleMeeting.startParticipantsVideo, startParticipantVideo = scheduleMeeting.startParticipantVideo, restScheduleOptions = _objectWithoutProperties(scheduleMeeting, ["startParticipantsVideo", "startParticipantVideo"]);
                processedScheduleMeeting = _objectSpread(_objectSpread({}, restScheduleOptions), {}, {
                  startParticipantsVideo: startParticipantsVideo || startParticipantVideo || false
                });
                return _context19.abrupt("return", {
                  recording: recording,
                  scheduleMeeting: processedScheduleMeeting
                });

              case 17:
                _context19.prev = 17;
                _context19.t0 = _context19["catch"](0);
                console.warn(_context19.t0);
                return _context19.abrupt("return", null);

              case 21:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19, this, [[0, 17]]);
      }));

      function getLockedSettings() {
        return _getLockedSettings.apply(this, arguments);
      }

      return getLockedSettings;
    }()
  }, {
    key: "updateMeeting",
    value: function () {
      var _updateMeeting = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20(meetingId, meeting) {
        var _this7 = this;

        var _ref19,
            _ref19$isAlertSuccess,
            isAlertSuccess,
            _meeting$host2,
            formattedMeeting,
            _yield$_promise3,
            _yield$_promise4,
            resp,
            serviceInfo,
            invitationInfo,
            result,
            _args20 = arguments;

        return regeneratorRuntime.wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                _ref19 = _args20.length > 2 && _args20[2] !== undefined ? _args20[2] : {}, _ref19$isAlertSuccess = _ref19.isAlertSuccess, isAlertSuccess = _ref19$isAlertSuccess === void 0 ? false : _ref19$isAlertSuccess;

                if (!this._isUpdating(meetingId)) {
                  _context20.next = 3;
                  break;
                }

                return _context20.abrupt("return", this.updateMeeting._promise);

              case 3:
                meeting = meeting || this.meeting;
                _context20.prev = 4;
                this.store.dispatch({
                  type: this.actionTypes.initUpdating,
                  meetingId: meetingId
                }); // Validate meeting

                this._validate(meeting);

                formattedMeeting = this._format(meeting);

                if (this._showSaveAsDefault && meeting.saveAsDefault) {
                  this.saveAsDefaultSetting(meeting);
                }

                this.updateMeeting._promise = Promise.all([this.putMeeting(meetingId, formattedMeeting), this.getMeetingServiceInfo((_meeting$host2 = meeting.host) === null || _meeting$host2 === void 0 ? void 0 : _meeting$host2.id)]);
                _context20.next = 12;
                return this.updateMeeting._promise;

              case 12:
                _yield$_promise3 = _context20.sent;
                _yield$_promise4 = _slicedToArray(_yield$_promise3, 2);
                resp = _yield$_promise4[0];
                serviceInfo = _yield$_promise4[1];
                _context20.next = 18;
                return this.getMeetingInvitation(meetingId);

              case 18:
                invitationInfo = _context20.sent;
                this.store.dispatch({
                  type: this.actionTypes.updated,
                  meeting: _objectSpread(_objectSpread({}, formattedMeeting), {}, {
                    _saved: meeting._saved
                  }),
                  meetingId: meetingId
                });
                _context20.next = 22;
                return this._createDialingNumberTpl(serviceInfo, resp, invitationInfo);

              case 22:
                result = _context20.sent;

                // Reload meeting info
                if (this._enableReloadAfterSchedule) {
                  this._initMeeting();
                } // Update personal meeting setting


                if (this._enablePersonalMeeting && resp.usePersonalMeetingId) {
                  this.store.dispatch({
                    type: this.actionTypes.updatePersonalMeeting,
                    meeting: this.formatPersonalMeeting(resp, serviceInfo.externalUserInfo.personalMeetingId)
                  });

                  if (this._enableServiceWebSettings) {
                    this.update(_objectSpread(_objectSpread({}, this.meeting), {}, {
                      _pmiPassword: resp.password
                    }));
                  }
                } // Notify user the meeting has been updated


                if (isAlertSuccess) {
                  setTimeout(function () {
                    _this7._alert.success({
                      message: _meetingStatus["default"].updatedSuccess
                    });
                  }, 50);
                }

                return _context20.abrupt("return", result);

              case 29:
                _context20.prev = 29;
                _context20.t0 = _context20["catch"](4);
                this.store.dispatch({
                  type: this.actionTypes.resetUpdating,
                  meetingId: meetingId
                });
                _context20.next = 34;
                return this._errorHandle(_context20.t0);

              case 34:
                return _context20.abrupt("return", null);

              case 35:
                _context20.prev = 35;
                delete this.updateMeeting._promise;
                return _context20.finish(35);

              case 38:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee20, this, [[4, 29, 35, 38]]);
      }));

      function updateMeeting(_x14, _x15) {
        return _updateMeeting.apply(this, arguments);
      }

      return updateMeeting;
    }()
  }, {
    key: "_createDialingNumberTpl",
    value: function () {
      var _createDialingNumberTpl2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee21(serviceInfo, resp, invitationInfo) {
        var result;
        return regeneratorRuntime.wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                serviceInfo.mobileDialingNumberTpl = (0, _meetingHelper.getMobileDialingNumberTpl)(serviceInfo.dialInNumbers, resp.id);
                serviceInfo.phoneDialingNumberTpl = (0, _meetingHelper.getPhoneDialingNumberTpl)(serviceInfo.dialInNumbers);
                result = {
                  meeting: resp,
                  serviceInfo: serviceInfo,
                  extensionInfo: this.extensionInfo,
                  invitationInfo: invitationInfo
                };
                return _context21.abrupt("return", result);

              case 4:
              case "end":
                return _context21.stop();
            }
          }
        }, _callee21, this);
      }));

      function _createDialingNumberTpl(_x16, _x17, _x18) {
        return _createDialingNumberTpl2.apply(this, arguments);
      }

      return _createDialingNumberTpl;
    }()
  }, {
    key: "_errorHandle",
    value: function () {
      var _errorHandle2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee22(errors) {
        var _iterator, _step, error, _yield$errors$respons, message, errorCode, permissionName;

        return regeneratorRuntime.wrap(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                if (!(errors instanceof _meetingErrors.MeetingErrors)) {
                  _context22.next = 5;
                  break;
                }

                _iterator = _createForOfIteratorHelper(errors.all);

                try {
                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    error = _step.value;

                    this._alert.warning(error);
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }

                _context22.next = 31;
                break;

              case 5:
                if (!(errors && errors.response)) {
                  _context22.next = 29;
                  break;
                }

                _context22.next = 8;
                return errors.response.clone().json();

              case 8:
                _yield$errors$respons = _context22.sent;
                message = _yield$errors$respons.message;
                errorCode = _yield$errors$respons.errorCode;
                permissionName = _yield$errors$respons.permissionName;

                if (!(errorCode === 'InsufficientPermissions' && permissionName)) {
                  _context22.next = 16;
                  break;
                }

                this._alert.danger({
                  message: _meetingStatus["default"].insufficientPermissions,
                  payload: {
                    permissionName: permissionName
                  }
                });

                _context22.next = 27;
                break;

              case 16:
                if (!(errorCode === 'CMN-102' && message.indexOf('[meetingId] is not found') > -1)) {
                  _context22.next = 20;
                  break;
                }

                this._alert.danger({
                  message: _meetingStatus["default"].meetingIsDeleted
                });

                _context22.next = 27;
                break;

              case 20:
                _context22.t0 = !this._availabilityMonitor;

                if (_context22.t0) {
                  _context22.next = 25;
                  break;
                }

                _context22.next = 24;
                return this._availabilityMonitor.checkIfHAError(errors);

              case 24:
                _context22.t0 = !_context22.sent;

              case 25:
                if (!_context22.t0) {
                  _context22.next = 27;
                  break;
                }

                this._alert.danger({
                  message: _meetingStatus["default"].internalError
                });

              case 27:
                _context22.next = 31;
                break;

              case 29:
                console.log('errors:', errors);

                this._alert.danger({
                  message: _meetingStatus["default"].internalError
                });

              case 31:
              case "end":
                return _context22.stop();
            }
          }
        }, _callee22, this);
      }));

      function _errorHandle(_x19) {
        return _errorHandle2.apply(this, arguments);
      }

      return _errorHandle;
    }()
    /**
     * @param {number} meetingId
     */

  }, {
    key: "_isUpdating",
    value: function _isUpdating(meetingId) {
      return this.state.updatingStatus && (0, _ramda.find)(function (obj) {
        return obj.meetingId === meetingId;
      }, this.state.updatingStatus);
    }
    /**
     * Format meeting information.
     * @param {Object} meeting
     */

  }, {
    key: "_format",
    value: function _format(meeting) {
      var topic = meeting.topic,
          meetingType = meeting.meetingType,
          allowJoinBeforeHost = meeting.allowJoinBeforeHost,
          startHostVideo = meeting.startHostVideo,
          startParticipantsVideo = meeting.startParticipantsVideo,
          audioOptions = meeting.audioOptions,
          password = meeting.password,
          schedule = meeting.schedule,
          recurrence = meeting.recurrence,
          usePersonalMeetingId = meeting.usePersonalMeetingId,
          _requireMeetingPassword = meeting._requireMeetingPassword,
          host = meeting.host;
      var formatted = {
        host: host,
        topic: topic,
        meetingType: meetingType,
        allowJoinBeforeHost: allowJoinBeforeHost,
        startHostVideo: startHostVideo,
        startParticipantsVideo: startParticipantsVideo,
        audioOptions: audioOptions,
        password: _requireMeetingPassword ? password : '',
        recurrence: recurrence,
        usePersonalMeetingId: usePersonalMeetingId
      }; // Recurring meetings do not have schedule info

      if (meetingType !== _meetingHelper.MeetingType.RECURRING) {
        var _schedule = {
          durationInMinutes: schedule.durationInMinutes,
          timeZone: {
            id: this._enableCustomTimezone ? schedule.timeZone.id : _meetingHelper.UTC_TIMEZONE_ID
          }
        };

        if (schedule.startTime) {
          // Format selected startTime to utc standard time
          // Timezone information is not included here
          _schedule.startTime = this._enableCustomTimezone ? schedule.startTime : _moment["default"].utc(schedule.startTime).format();
        }

        formatted.schedule = _schedule;

        if (recurrence && recurrence.until) {
          formatted.recurrence.until = _moment["default"].utc(recurrence.until).format();
        }
      } // For PMI


      formatted.meetingType = formatted.meetingType === _meetingHelper.MeetingType.PMI ? _meetingHelper.MeetingType.SCHEDULED : formatted.meetingType;
      return formatted;
    }
    /**
     * Validate meeting information format.
     * @param {Object} meeting
     * @throws
     */

  }, {
    key: "_validate",
    value: function _validate(meeting) {
      if (!meeting) {
        throw new _meetingErrors.MeetingErrors(_meetingStatus["default"].invalidMeetingInfo);
      }

      var topic = meeting.topic,
          password = meeting.password,
          schedule = meeting.schedule,
          _requireMeetingPassword = meeting._requireMeetingPassword;
      var errors = new _meetingErrors.MeetingErrors();

      if (topic.length <= 0) {
        errors.push(_meetingStatus["default"].emptyTopic);
      }

      if (_requireMeetingPassword && (!password || password.length <= 0)) {
        errors.push(_meetingStatus["default"].noPassword);
      }

      if (schedule) {
        if (schedule.durationInMinutes < 0) {
          errors.push(_meetingStatus["default"].durationIncorrect);
        }
      }

      if (errors.length > 0) {
        throw errors;
      }
    }
  }, {
    key: "saveAsDefaultSetting",
    value: function saveAsDefaultSetting(meeting) {
      var formattedMeeting = this._format(meeting);

      this.store.dispatch({
        type: this.actionTypes.saveAsDefaultSetting,
        meeting: _objectSpread(_objectSpread({}, formattedMeeting), {}, {
          _saved: meeting.notShowAgain,
          _requireMeetingPassword: meeting._requireMeetingPassword
        })
      });
    }
  }, {
    key: "validatePasswordSettings",
    value: function validatePasswordSettings(password, isSecret) {
      if (!isSecret) {
        return true;
      }

      if (password && _constants.RCM_PASSWORD_REGEX.test(password)) {
        return true;
      }

      return false;
    }
  }, {
    key: "extensionInfo",
    get: function get() {
      return this._extensionInfo.info;
    }
  }, {
    key: "meeting",
    get: function get() {
      return this.state.meeting;
    }
  }, {
    key: "isScheduling",
    get: function get() {
      return this.state.schedulingStatus === _scheduleStatus["default"].scheduling;
    }
  }, {
    key: "isUpdating",
    get: function get() {
      return this.meeting && this.meeting.id && this._isUpdating(this.meeting.id);
    }
  }, {
    key: "status",
    get: function get() {
      return this.state.status;
    }
  }, {
    key: "preferences",
    get: function get() {
      return this.state.preferences;
    }
  }, {
    key: "commonUserSettings",
    get: function get() {
      if (!this._enableServiceWebSettings) {
        return {};
      }

      return (0, _ramda.pick)(_constants.COMMON_SETTINGS, this.scheduleUserSettings);
    }
  }, {
    key: "commonPersonalMeetingSettings",
    get: function get() {
      if (!this._enablePersonalMeeting) {
        return {};
      }

      return (0, _ramda.pick)([].concat(_toConsumableArray(_constants.COMMON_SETTINGS), ['password']), this.personalMeeting);
    }
  }, {
    key: "defaultLockedSettings",
    get: function get() {
      if (!this._enableServiceWebSettings) {
        return {};
      }

      return {
        settingLock: (0, _ramda.pick)(_constants.COMMON_SETTINGS, this.scheduleLockedSettings)
      };
    }
  }, {
    key: "pmiDefaultSettings",
    get: function get() {
      if (!this._enableServiceWebSettings) {
        return this.personalMeeting;
      }

      return this._initDefaultData(_objectSpread(_objectSpread({}, this.initialMeetingSetting), this.defaultLockedSettings), {
        userSettings: this.commonUserSettings,
        personalMeetingSettings: this.commonPersonalMeetingSettings
      }, true);
    }
  }, {
    key: "generalDefaultSettings",
    get: function get() {
      if (!this._enableServiceWebSettings) {
        var savedSetting = this._showSaveAsDefault ? this.savedDefaultMeetingSetting : this.lastMeetingSetting;
        return _objectSpread(_objectSpread(_objectSpread({}, this.initialMeetingSetting), savedSetting), {}, {
          meetingType: _meetingHelper.MeetingType.SCHEDULED
        });
      }

      return this._initDefaultData(_objectSpread(_objectSpread({}, this.initialMeetingSetting), this.defaultLockedSettings), {
        userSettings: this.commonUserSettings,
        personalMeetingSettings: this.commonPersonalMeetingSettings
      }, false);
    }
  }, {
    key: "usePmiDefaultFromSW",
    get: function get() {
      return this._enablePersonalMeeting && this._enableServiceWebSettings && this.scheduleUserSettings.usePmiForScheduledMeetings;
    }
  }, {
    key: "recordingUserSettings",
    get: function get() {
      var _this$userSettings$re = this.userSettings.recording,
          recording = _this$userSettings$re === void 0 ? {} : _this$userSettings$re;
      return recording;
    }
  }, {
    key: "scheduleUserSettings",
    get: function get() {
      var _this$userSettings$sc = this.userSettings.scheduleMeeting,
          scheduleMeeting = _this$userSettings$sc === void 0 ? {} : _this$userSettings$sc;
      return scheduleMeeting;
    }
  }, {
    key: "recordingLockedSettings",
    get: function get() {
      var _this$lockedSettings$ = this.lockedSettings.recording,
          recording = _this$lockedSettings$ === void 0 ? {} : _this$lockedSettings$;
      return recording;
    }
  }, {
    key: "scheduleLockedSettings",
    get: function get() {
      var _this$lockedSettings$2 = this.lockedSettings.scheduleMeeting,
          scheduleMeeting = _this$lockedSettings$2 === void 0 ? {} : _this$lockedSettings$2;
      return scheduleMeeting;
    }
  }, {
    key: "savedDefaultMeetingSetting",
    get: function get() {
      return this._storage.getItem(this._defaultMeetingSettingKey);
    }
  }, {
    key: "lastMeetingSetting",
    get: function get() {
      return this._storage.getItem(this._lastMeetingSettingKey);
    }
  }, {
    key: "showSaveAsDefault",
    get: function get() {
      return this._showSaveAsDefault;
    }
  }, {
    key: "isPreferencesChanged",
    get: function get() {
      return this.state.isPreferencesChanged;
    }
  }, {
    key: "userSettings",
    get: function get() {
      return this.state.userSettings || {};
    }
  }, {
    key: "lockedSettings",
    get: function get() {
      return this.state.lockedSettings || {};
    }
  }, {
    key: "showAdminLock",
    get: function get() {
      return false;
    }
  }, {
    key: "enablePersonalMeeting",
    get: function get() {
      return this._enablePersonalMeeting;
    }
  }, {
    key: "personalMeeting",
    get: function get() {
      return this._storage.getItem(this._personalMeetingKey);
    }
  }, {
    key: "delegators",
    get: function get() {
      if (this.state.delegators.length === 0) {
        return [];
      }

      return [this.loginUser].concat(_toConsumableArray(this.state.delegators));
    }
  }, {
    key: "loginUser",
    get: function get() {
      var myself = {
        id: "".concat(this.extensionInfo.id),
        name: _constants.ASSISTED_USERS_MYSELF,
        isLoginUser: true
      };
      return myself;
    }
  }]);

  return Meeting;
}(_RcModule2["default"]), _temp), (_applyDecoratedDescriptor(_class2.prototype, "init", [_background["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "init"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "reload", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "reload"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "update", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "update"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "switchUsePersonalMeetingId", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "switchUsePersonalMeetingId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateScheduleFor", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "updateScheduleFor"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateServiceWebSettings", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateServiceWebSettings"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fetchPersonalMeeting", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "fetchPersonalMeeting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setDelegators", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "setDelegators"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "schedule", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "schedule"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getMeetingServiceInfo", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "getMeetingServiceInfo"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getMeeting", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "getMeeting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "putMeeting", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "putMeeting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getDelegators", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "getDelegators"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getMeetingInvitation", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "getMeetingInvitation"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getUserSettings", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "getUserSettings"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getLockedSettings", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "getLockedSettings"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateMeeting", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "updateMeeting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "commonUserSettings", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "commonUserSettings"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "commonPersonalMeetingSettings", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "commonPersonalMeetingSettings"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "defaultLockedSettings", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "defaultLockedSettings"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "pmiDefaultSettings", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "pmiDefaultSettings"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "generalDefaultSettings", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "generalDefaultSettings"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "defaultMeetingSetting", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this8 = this;

    return [function () {
      return _this8.initialMeetingSetting;
    }, function () {
      return _this8.usePmiDefaultFromSW;
    }, function () {
      return _this8.userSettings;
    }, function () {
      return _this8.pmiDefaultSettings;
    }, function () {
      return _this8.generalDefaultSettings;
    }, function () {
      var savedSetting = _this8._showSaveAsDefault ? _this8.savedDefaultMeetingSetting : _this8.lastMeetingSetting;
      return savedSetting;
    }, function (initialSetting, usePmi, userSettings, pmiDefaultSettings, generalDefaultSettings, savedSetting) {
      if (_this8._enableServiceWebSettings) {
        if (!(0, _ramda.isEmpty)(userSettings)) {
          return usePmi ? pmiDefaultSettings : generalDefaultSettings;
        }

        return initialSetting;
      }

      var meeting = _objectSpread(_objectSpread(_objectSpread({}, initialSetting), savedSetting), {}, {
        meetingType: _meetingHelper.MeetingType.SCHEDULED
      });

      return meeting;
    }];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "initialMeetingSetting", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this9 = this;

    return [function () {
      var extensionName = _this9.extensionInfo.name || '';

      if (!_this9._enableScheduleOnBehalf || !_this9.meeting || !_this9.delegators || _this9.delegators.length === 0) {
        return extensionName;
      }

      var currentHost = "".concat(_this9.meeting.host && _this9.meeting.host.id || '');
      var user = (0, _ramda.find)(function (item) {
        return item.id === currentHost;
      }, _this9.delegators);
      return user && user.id !== "".concat(_this9.extensionInfo.id) ? user.name : extensionName;
    }, function () {
      return (0, _meetingHelper.getInitializedStartTime)();
    }, function () {
      if (_this9._enableScheduleOnBehalf && _this9.meeting && _this9.meeting.host && _this9.meeting.host.id) {
        return "".concat(_this9.meeting.host.id);
      }

      return "".concat(_this9.extensionInfo.id) || '';
    }, function (meetingName, startTime, hostId) {
      var setting = (0, _meetingHelper.getDefaultMeetingSettings)(meetingName, startTime, hostId);

      if (!_this9._enableServiceWebSettings) {
        return setting;
      }

      return _objectSpread(_objectSpread(_objectSpread({}, setting), _constants.DEFAULT_LOCK_SETTINGS), {}, {
        _pmiPassword: ''
      });
    }];
  }
}), _applyDecoratedDescriptor(_class2.prototype, "usePmiDefaultFromSW", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "usePmiDefaultFromSW"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "recordingUserSettings", [_dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "recordingUserSettings"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "scheduleUserSettings", [_dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "scheduleUserSettings"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "recordingLockedSettings", [_dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "recordingLockedSettings"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "scheduleLockedSettings", [_dec11], Object.getOwnPropertyDescriptor(_class2.prototype, "scheduleLockedSettings"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "userSettings", [_dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "userSettings"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "lockedSettings", [_dec13], Object.getOwnPropertyDescriptor(_class2.prototype, "lockedSettings"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "delegators", [_dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "delegators"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "loginUser", [_dec15], Object.getOwnPropertyDescriptor(_class2.prototype, "loginUser"), _class2.prototype)), _class2)) || _class);
exports.Meeting = Meeting;
//# sourceMappingURL=Meeting.js.map
