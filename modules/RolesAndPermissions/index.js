"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.reflect.get");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.array.for-each");

var _di = require("../../lib/di");

var _selector = require("../../lib/selector");

var _DataFetcher2 = _interopRequireDefault(require("../../lib/DataFetcher"));

var _permissionsMessages = _interopRequireDefault(require("./permissionsMessages"));

var _loginStatus = _interopRequireDefault(require("../Auth/loginStatus"));

var _ensureExist = _interopRequireDefault(require("../../lib/ensureExist"));

var _dec, _class, _class2, _descriptor, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var DEFAULT_TTL = 24 * 60 * 60 * 1000;

function extractData(permissions) {
  var output = {};
  permissions.permissions.forEach(function (item) {
    output[item.permission.id] = true;
  });
  return output;
}
/**
 * @class
 * @description Roles and permission module
 */


var RolesAndPermissions = (_dec = (0, _di.Module)({
  deps: ['Client', 'Alert', 'ExtensionInfo', {
    dep: 'RolesAndPermissionsOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_DataFetcher) {
  _inherits(RolesAndPermissions, _DataFetcher);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   * @param {Alert} params.alert - alert module instance
   * @param {ExtensionInfo} params.extensionInfo - extensionInfo module instance
   * @param {Bool} params.isCRM - if it is CRM
   * @param {String} params.flag - app flag
   * @param {Number} params.ttl - local cache time
   */
  function RolesAndPermissions(_ref) {
    var _this;

    var isCRM = _ref.isCRM,
        flag = _ref.flag,
        client = _ref.client,
        alert = _ref.alert,
        extensionInfo = _ref.extensionInfo,
        _ref$ttl = _ref.ttl,
        ttl = _ref$ttl === void 0 ? DEFAULT_TTL : _ref$ttl,
        options = _objectWithoutProperties(_ref, ["isCRM", "flag", "client", "alert", "extensionInfo", "ttl"]);

    _classCallCheck(this, RolesAndPermissions);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RolesAndPermissions).call(this, _objectSpread({}, options, {
      client: client,
      ttl: ttl,
      fetchFunction: function fetchFunction() {
        return regeneratorRuntime.async(function fetchFunction$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.t0 = extractData;
                _context.next = 3;
                return regeneratorRuntime.awrap(_this._client.account().extension().authzProfile().get());

              case 3:
                _context.t1 = _context.sent;
                return _context.abrupt("return", (0, _context.t0)(_context.t1));

              case 5:
              case "end":
                return _context.stop();
            }
          }
        });
      },
      readyCheckFn: function readyCheckFn() {
        return _this._extensionInfo.ready;
      },
      forbiddenHandler: function forbiddenHandler() {
        return regeneratorRuntime.async(function forbiddenHandler$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return regeneratorRuntime.awrap(_this._auth.logout());

              case 2:
                _this._alert.danger({
                  message: _permissionsMessages["default"].insufficientPrivilege,
                  ttl: 0
                });

                return _context2.abrupt("return", {});

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        });
      },
      cleanOnReset: true
    })));

    _initializerDefineProperty(_this, "permissions", _descriptor, _assertThisInitialized(_this));

    _this._isCRM = !!isCRM;
    _this._flag = flag || 'SalesForce';
    _this._alert = (0, _ensureExist["default"])(alert, 'alert');
    _this._extensionInfo = (0, _ensureExist["default"])(extensionInfo, 'extensionInfo');
    _this._onDataReadyHandler = [];
    return _this;
  }

  _createClass(RolesAndPermissions, [{
    key: "_onStateChange",
    value: function _onStateChange() {
      var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, handler, hasPermissions;

      return regeneratorRuntime.async(function _onStateChange$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!this._isDataReady()) {
                _context3.next = 20;
                break;
              }

              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context3.prev = 4;

              for (_iterator = this._onDataReadyHandler[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                handler = _step.value;
                handler();
              }

              _context3.next = 12;
              break;

            case 8:
              _context3.prev = 8;
              _context3.t0 = _context3["catch"](4);
              _didIteratorError = true;
              _iteratorError = _context3.t0;

            case 12:
              _context3.prev = 12;
              _context3.prev = 13;

              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }

            case 15:
              _context3.prev = 15;

              if (!_didIteratorError) {
                _context3.next = 18;
                break;
              }

              throw _iteratorError;

            case 18:
              return _context3.finish(15);

            case 19:
              return _context3.finish(12);

            case 20:
              _context3.next = 22;
              return regeneratorRuntime.awrap(_get(_getPrototypeOf(RolesAndPermissions.prototype), "_onStateChange", this).call(this));

            case 22:
              if (!(this.ready && this._auth.loginStatus === _loginStatus["default"].loggedIn && this._isCRM && this.tierEnabled !== null && !this.tierEnabled)) {
                _context3.next = 26;
                break;
              }

              _context3.next = 25;
              return regeneratorRuntime.awrap(this._auth.logout());

            case 25:
              this._alert.danger({
                message: _permissionsMessages["default"].invalidTier,
                ttl: 0
              });

            case 26:
              if (!(this.ready && this._auth.loginStatus === _loginStatus["default"].loggedIn && !this.permissions.ReadUserInfo)) {
                _context3.next = 31;
                break;
              }

              hasPermissions = !!this.data;
              _context3.next = 30;
              return regeneratorRuntime.awrap(this._auth.logout());

            case 30:
              if (hasPermissions) {
                this._alert.danger({
                  message: _permissionsMessages["default"].insufficientPrivilege,
                  ttl: 0
                });
              }

            case 31:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this, [[4, 8, 12, 20], [13,, 15, 19]]);
    }
  }, {
    key: "onDataReady",
    value: function onDataReady(fn) {
      this._onDataReadyHandler.push(fn);
    }
  }, {
    key: "refreshServiceFeatures",
    value: function refreshServiceFeatures() {
      if (this._extensionInfo.ready) {
        this._extensionInfo.fetchData();
      }
    }
  }, {
    key: "_name",
    get: function get() {
      return 'rolesAndPermissions';
    }
  }, {
    key: "serviceFeatures",
    get: function get() {
      return this._extensionInfo.serviceFeatures;
    }
  }, {
    key: "ringoutEnabled",
    get: function get() {
      return !!(this._extensionInfo.serviceFeatures && this._extensionInfo.serviceFeatures.RingOut && this._extensionInfo.serviceFeatures.RingOut.enabled);
    }
  }, {
    key: "webphoneEnabled",
    get: function get() {
      return !!(this._extensionInfo.serviceFeatures && this._extensionInfo.serviceFeatures.WebPhone && this._extensionInfo.serviceFeatures.WebPhone.enabled);
    }
  }, {
    key: "callingEnabled",
    get: function get() {
      return this.webphoneEnabled || this.ringoutEnabled;
    }
  }, {
    key: "tierEnabled",
    get: function get() {
      if (!this._extensionInfo.serviceFeatures || !this._extensionInfo.serviceFeatures[this._flag]) {
        return null;
      }

      return this._extensionInfo.serviceFeatures[this._flag].enabled;
    }
  }, {
    key: "hasReadCallLogPermission",
    get: function get() {
      return !!(this.ready && this.permissions && this.permissions.ReadCallLog);
    }
  }, {
    key: "hasPresencePermission",
    get: function get() {
      return !!(this.ready && this.callingEnabled && this.permissions && this.permissions.ReadPresenceStatus);
    }
  }, {
    key: "hasEditPresencePermission",
    get: function get() {
      return !!(this.ready && this.callingEnabled && this.permissions && this.permissions.EditPresenceStatus);
    }
  }, {
    key: "hasComposeTextPermission",
    get: function get() {
      return !!(this.serviceFeatures && (this.serviceFeatures.Pager && this.serviceFeatures.Pager.enabled || this.serviceFeatures.SMS && this.serviceFeatures.SMS.enabled));
    }
  }, {
    key: "onlyPagerPermission",
    get: function get() {
      return !!(this.serviceFeatures && this.serviceFeatures.Pager && this.serviceFeatures.Pager.enabled && this.serviceFeatures.SMS && !this.serviceFeatures.SMS.enabled);
    }
  }, {
    key: "hasReadMessagesPermission",
    get: function get() {
      return this.ready && (this.readTextPermissions || this.voicemailPermissions || this.readFaxPermissions);
    }
  }, {
    key: "readTextPermissions",
    get: function get() {
      return !!(this.serviceFeatures && (this.serviceFeatures.PagerReceiving && this.serviceFeatures.PagerReceiving.enabled || this.serviceFeatures.SMSReceiving && this.serviceFeatures.SMSReceiving.enabled));
    }
  }, {
    key: "voicemailPermissions",
    get: function get() {
      return !!(this.permissions && this.permissions.Voicemail && this.serviceFeatures && this.serviceFeatures.Voicemail && this.serviceFeatures.Voicemail.enabled);
    }
  }, {
    key: "readFaxPermissions",
    get: function get() {
      return !!(this.serviceFeatures && this.serviceFeatures.FaxReceiving && this.serviceFeatures.FaxReceiving.enabled);
    }
  }, {
    key: "hasUserGuidePermission",
    get: function get() {
      return !!(this.callingEnabled || this.hasReadMessagesPermission);
    }
  }, {
    key: "hasConferencingPermission",
    get: function get() {
      return !!(this.serviceFeatures && this.serviceFeatures.Conferencing && this.serviceFeatures.Conferencing.enabled);
    }
  }, {
    key: "hasGlipPermission",
    get: function get() {
      return !!(this.permissions && this.permissions.Glip);
    }
  }, {
    key: "hasConferenceCallPermission",
    get: function get() {
      return this.callingEnabled && this.webphoneEnabled;
    }
  }]);

  return RolesAndPermissions;
}(_DataFetcher2["default"]), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "permissions", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this2 = this;

    return [function () {
      return _this2.data;
    }, function (data) {
      return data || {};
    }];
  }
})), _class2)) || _class);
exports["default"] = RolesAndPermissions;
//# sourceMappingURL=index.js.map
