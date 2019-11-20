"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.map");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.array.find");

var _di = require("../../lib/di");

var _RcModule2 = _interopRequireDefault(require("../../lib/RcModule"));

var _isBlank = _interopRequireDefault(require("../../lib/isBlank"));

var _moduleStatuses = _interopRequireDefault(require("../../enums/moduleStatuses"));

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

var _getComposeTextReducer = _interopRequireDefault(require("./getComposeTextReducer"));

var _getCacheReducer = _interopRequireDefault(require("./getCacheReducer"));

var _messageSenderMessages = _interopRequireDefault(require("../MessageSender/messageSenderMessages"));

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _dec, _class, _class2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var ComposeText = (
/**
 * @class
 * @description Compose text managing module
 */
_dec = (0, _di.Module)({
  deps: ['Alert', 'Auth', 'Storage', 'MessageSender', 'NumberValidate', 'RolesAndPermissions', // { dep: 'Conversations', optional: true },
  {
    dep: 'ContactSearch',
    optional: true
  }, {
    dep: 'ComposeTextOptions',
    optional: true
  }]
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_RcModule) {
  _inherits(ComposeText, _RcModule);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Alert} params.alert - alert module instance
   * @param {Auth} params.auth - auth module instance
   * @param {Storage} params.storage - storage module instance
   * @param {MessageSender} params.messageSender - messageSender module instance
   * @param {NumberValidate} params.numberValidate - numberValidate module instance
   * @param {ContactSearch} params.contactSearch - contactSearch module instance
   */
  function ComposeText(_ref) {
    var _this;

    var alert = _ref.alert,
        auth = _ref.auth,
        storage = _ref.storage,
        messageSender = _ref.messageSender,
        numberValidate = _ref.numberValidate,
        contactSearch = _ref.contactSearch,
        rolesAndPermissions = _ref.rolesAndPermissions,
        conversations = _ref.conversations,
        options = _objectWithoutProperties(_ref, ["alert", "auth", "storage", "messageSender", "numberValidate", "contactSearch", "rolesAndPermissions", "conversations"]);

    _classCallCheck(this, ComposeText);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ComposeText).call(this, _objectSpread({}, options, {
      actionTypes: _actionTypes["default"]
    })));
    _this._alert = alert;
    _this._auth = auth;
    _this._storage = storage;
    _this._rolesAndPermissions = rolesAndPermissions;
    _this._storageKey = 'composeText';
    _this._reducer = (0, _getComposeTextReducer["default"])(_this.actionTypes);
    _this._cacheReducer = (0, _getCacheReducer["default"])(_this.actionTypes);
    _this._messageSender = messageSender;
    _this._numberValidate = numberValidate;
    _this._contactSearch = contactSearch; // this._conversations = conversations;

    _this._lastContactSearchResult = [];
    _this.senderNumbersList = [];
    storage.registerReducer({
      key: _this._storageKey,
      reducer: _this._cacheReducer
    });
    return _this;
  }

  _createClass(ComposeText, [{
    key: "initialize",
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe(function () {
        return _this2._onStateChange();
      });
    }
  }, {
    key: "_onStateChange",
    value: function _onStateChange() {
      if (this._shouldInit()) {
        this.senderNumbersList = this._messageSender.senderNumbersList;
        this.store.dispatch({
          type: this.actionTypes.initSuccess
        });

        if (this._auth.isFreshLogin) {
          this.clean();
        }

        this._initSenderNumber();
      } else if (this._shouldHandleRecipient()) {
        this._handleRecipient();
      } else if (this._shouldReset()) {
        this._resetModuleStatus();
      }

      if (this.ready && this._messageSender.senderNumbersList.length !== this.senderNumbersList.length) {
        this.senderNumbersList = this._messageSender.senderNumbersList;

        this._initSenderNumber();
      }
    }
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return this._messageSender.ready && this._auth.ready && !this.ready;
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return !this._messageSender.ready && this.ready;
    }
  }, {
    key: "_shouldHandleRecipient",
    value: function _shouldHandleRecipient() {
      return this.ready && !!this._contactSearch && this._contactSearch.ready && this._contactSearch.searchResult.length > 0 && this._contactSearch.searchResult !== this._lastContactSearchResult;
    }
  }, {
    key: "_resetModuleStatus",
    value: function _resetModuleStatus() {
      this.store.dispatch({
        type: this.actionTypes.resetSuccess
      });
    }
  }, {
    key: "_initSenderNumber",
    value: function _initSenderNumber() {
      var cachedPhoneNumber = this.cache && this.cache.senderNumber;

      if (cachedPhoneNumber) {
        this.updateSenderNumber(cachedPhoneNumber);
      } else {
        this.updateSenderNumber(this._messageSender.senderNumbersList[0] && this._messageSender.senderNumbersList[0].phoneNumber);
      }
    }
  }, {
    key: "_handleRecipient",
    value: function _handleRecipient() {
      var dummy = this.toNumbers.find(function (toNumber) {
        return !toNumber.entityType;
      });

      if (dummy) {
        var recipient = this._contactSearch.searchResult.find(function (item) {
          return item.id === dummy.id;
        });

        if (recipient) {
          this.addToNumber(recipient);
          this._lastContactSearchResult = this._contactSearch.searchResult.slice();
        }
      }
    }
  }, {
    key: "_alertWarning",
    value: function _alertWarning(message) {
      if (message) {
        var ttlConfig = message !== _messageSenderMessages["default"].noAreaCode ? {
          ttl: 0
        } : null;

        this._alert.warning(_objectSpread({
          message: message,
          allowDuplicates: false
        }, ttlConfig));

        return true;
      }

      return false;
    }
  }, {
    key: "_validatePhoneNumber",
    value: function _validatePhoneNumber(phoneNumber) {
      if (this._validateIsOnlyPager(phoneNumber)) {
        return null;
      }

      var validateResult = this._numberValidate.validateFormat([phoneNumber]);

      if (!validateResult.result) {
        var error = validateResult.errors[0];

        if (error && this._alertWarning(_messageSenderMessages["default"][error.type])) {
          return false;
        }

        this._alertWarning(_messageSenderMessages["default"].recipientNumberInvalids);

        return false;
      }

      return true;
    }
  }, {
    key: "_validateIsOnlyPager",
    value: function _validateIsOnlyPager(phoneNumber) {
      if (phoneNumber.length >= 7 && this._rolesAndPermissions.onlyPagerPermission) {
        this._alertWarning(_messageSenderMessages["default"].noSMSPermission);

        return true;
      }

      return false;
    }
  }, {
    key: "send",
    value: function send() {
      var text, fromNumber, toNumbers, typingToNumber;
      return regeneratorRuntime.async(function send$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              text = this.messageText;
              fromNumber = this.senderNumber;
              toNumbers = this.toNumbers.map(function (number) {
                return number.phoneNumber;
              });
              typingToNumber = this.typingToNumber;

              if ((0, _isBlank["default"])(typingToNumber)) {
                _context.next = 10;
                break;
              }

              if (!this._validatePhoneNumber(typingToNumber)) {
                _context.next = 9;
                break;
              }

              toNumbers.push(typingToNumber);
              _context.next = 10;
              break;

            case 9:
              return _context.abrupt("return", null);

            case 10:
              return _context.abrupt("return", this._messageSender.send({
                fromNumber: fromNumber,
                toNumbers: toNumbers,
                text: text
              }));

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "updateSenderNumber",
    value: function updateSenderNumber(number) {
      return regeneratorRuntime.async(function updateSenderNumber$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              this.store.dispatch({
                type: this.actionTypes.updateSenderNumber,
                number: number || ''
              });

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "updateTypingToNumber",
    value: function updateTypingToNumber(number) {
      return regeneratorRuntime.async(function updateTypingToNumber$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!(number.length > 30)) {
                _context3.next = 3;
                break;
              }

              this._alertWarning(_messageSenderMessages["default"].recipientNumberInvalids);

              return _context3.abrupt("return");

            case 3:
              this.store.dispatch({
                type: this.actionTypes.updateTypingToNumber,
                number: number
              });

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "onToNumberMatch",
    value: function onToNumberMatch(_ref2) {
      var entityId;
      return regeneratorRuntime.async(function onToNumberMatch$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              entityId = _ref2.entityId;
              this.store.dispatch({
                type: this.actionTypes.toNumberMatched,
                entityId: entityId
              });

            case 2:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "addToRecipients",
    value: function addToRecipients(recipient) {
      var shouldClean,
          isAdded,
          _args5 = arguments;
      return regeneratorRuntime.async(function addToRecipients$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              shouldClean = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : true;
              _context5.next = 3;
              return regeneratorRuntime.awrap(this.addToNumber(recipient));

            case 3:
              isAdded = _context5.sent;

              if (!(isAdded && shouldClean)) {
                _context5.next = 7;
                break;
              }

              _context5.next = 7;
              return regeneratorRuntime.awrap(this.cleanTypingToNumber());

            case 7:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "cleanTypingToNumber",
    value: function cleanTypingToNumber() {
      return regeneratorRuntime.async(function cleanTypingToNumber$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              this.store.dispatch({
                type: this.actionTypes.cleanTypingToNumber
              });

            case 1:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "addToNumber",
    value: function addToNumber(number) {
      return regeneratorRuntime.async(function addToNumber$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              if (!(0, _isBlank["default"])(number.phoneNumber)) {
                _context7.next = 2;
                break;
              }

              return _context7.abrupt("return", false);

            case 2:
              if (this._validatePhoneNumber(number.phoneNumber)) {
                _context7.next = 4;
                break;
              }

              return _context7.abrupt("return", false);

            case 4:
              this.store.dispatch({
                type: this.actionTypes.addToNumber,
                number: number
              });
              return _context7.abrupt("return", true);

            case 6:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "removeToNumber",
    value: function removeToNumber(number) {
      return regeneratorRuntime.async(function removeToNumber$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              this.store.dispatch({
                type: this.actionTypes.removeToNumber,
                number: number
              });

            case 1:
            case "end":
              return _context8.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "updateMessageText",
    value: function updateMessageText(text) {
      return regeneratorRuntime.async(function updateMessageText$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              if (!(text.length > 1000)) {
                _context9.next = 3;
                break;
              }

              this._alertWarning(_messageSenderMessages["default"].textTooLong);

              return _context9.abrupt("return");

            case 3:
              this.store.dispatch({
                type: this.actionTypes.updateMessageText,
                text: text
              });

            case 4:
            case "end":
              return _context9.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "clean",
    value: function clean() {
      return regeneratorRuntime.async(function clean$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              this.store.dispatch({
                type: this.actionTypes.clean
              });

            case 1:
            case "end":
              return _context10.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "alertMessageSending",
    value: function alertMessageSending() {
      return regeneratorRuntime.async(function alertMessageSending$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              this._alert.warning({
                message: _messageSenderMessages["default"].sending,
                ttl: 0
              });

            case 1:
            case "end":
              return _context11.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "dismissMessageSending",
    value: function dismissMessageSending() {
      var alertMessage;
      return regeneratorRuntime.async(function dismissMessageSending$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              alertMessage = this._alert.messages.find(function (m) {
                return m.message === _messageSenderMessages["default"].sending;
              });

              if (alertMessage && alertMessage.id) {
                this._alert.dismiss(alertMessage.id);
              }

            case 2:
            case "end":
              return _context12.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "cache",
    get: function get() {
      return this._storage.getItem(this._storageKey);
    }
  }, {
    key: "status",
    get: function get() {
      return this.state.status;
    }
  }, {
    key: "ready",
    get: function get() {
      return this.status === _moduleStatuses["default"].ready;
    }
  }, {
    key: "senderNumber",
    get: function get() {
      return this.state.senderNumber;
    }
  }, {
    key: "typingToNumber",
    get: function get() {
      return this.state.typingToNumber;
    }
  }, {
    key: "toNumbers",
    get: function get() {
      return this.state.toNumbers;
    }
  }, {
    key: "toNumberEntity",
    get: function get() {
      return this.state.toNumberEntity;
    }
  }, {
    key: "messageText",
    get: function get() {
      return this.state.messageText;
    }
  }]);

  return ComposeText;
}(_RcModule2["default"]), (_applyDecoratedDescriptor(_class2.prototype, "send", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "send"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateSenderNumber", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "updateSenderNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateTypingToNumber", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "updateTypingToNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onToNumberMatch", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "onToNumberMatch"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "addToRecipients", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "addToRecipients"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "cleanTypingToNumber", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "cleanTypingToNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "addToNumber", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "addToNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "removeToNumber", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "removeToNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateMessageText", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "updateMessageText"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clean", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "clean"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "alertMessageSending", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "alertMessageSending"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "dismissMessageSending", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "dismissMessageSending"), _class2.prototype)), _class2)) || _class);
exports["default"] = ComposeText;
//# sourceMappingURL=index.js.map
