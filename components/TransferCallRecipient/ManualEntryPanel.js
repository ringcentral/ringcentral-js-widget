"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ManualEntryPanel = void 0;

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

var _rcui = require("@ringcentral-integration/rcui");

var _react = _interopRequireWildcard(require("react"));

var _BackHeaderV = _interopRequireDefault(require("ringcentral-widgets/components/BackHeaderV2"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _DialerPanel = require("../DialerPanel");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ManualEntryPanel = function ManualEntryPanel(_ref) {
  var currentLocale = _ref.currentLocale,
      goBack = _ref.goBack,
      transferRecipientCountryId = _ref.transferRecipientCountryId,
      changeRecipientNumber = _ref.changeRecipientNumber,
      changeRecipientCountryId = _ref.changeRecipientCountryId,
      transferCountryOptions = _ref.transferCountryOptions,
      transferRecipientNumber = _ref.transferRecipientNumber,
      allowManualInternationalTransfer = _ref.allowManualInternationalTransfer;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      inputFocus = _useState2[0],
      setInputFocus = _useState2[1];

  var _useState3 = (0, _react.useState)(transferRecipientNumber),
      _useState4 = _slicedToArray(_useState3, 2),
      inputValue = _useState4[0],
      setInputValue = _useState4[1];

  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_BackHeaderV["default"], {
    currentLocale: currentLocale,
    title: _i18n["default"].getString('callRecipient', currentLocale),
    onBackClick: goBack,
    className: _styles["default"].backHeader
  }), /*#__PURE__*/_react["default"].createElement(_DialerPanel.Dialer, {
    value: inputValue,
    setValue: setInputValue,
    placeholder: _i18n["default"].getString('dialPlaceholder', currentLocale)
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].actionContainer
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].button
  }, /*#__PURE__*/_react["default"].createElement(_rcui.RcButton, {
    "data-sign": "nextButton",
    size: "medium",
    fullWidth: true,
    disabled: !inputValue,
    onClick: function onClick() {
      return changeRecipientNumber(inputValue);
    }
  }, _i18n["default"].getString('next', currentLocale))))));
};

exports.ManualEntryPanel = ManualEntryPanel;
//# sourceMappingURL=ManualEntryPanel.js.map
