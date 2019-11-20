"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _RemoveButton = _interopRequireDefault(require("../RemoveButton"));

var _i18n = _interopRequireDefault(require("../RecipientsInput/i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var PhoneNumberInput = (0, _react.forwardRef)(function PhoneNumberInput(_ref, ref) {
  var currentLocale = _ref.currentLocale,
      _ref$placeholder = _ref.placeholder,
      placeholder = _ref$placeholder === void 0 ? _i18n["default"].getString('enterNameOrNumber', currentLocale) : _ref$placeholder,
      value = _ref.value,
      _onChange = _ref.onChange,
      onClear = _ref.onClear,
      onFocus = _ref.onFocus,
      isFocused = _ref.isFocused;
  var inputEl = (0, _react.useRef)(null);
  (0, _react.useImperativeHandle)(ref, function () {
    return {
      focus: function focus() {
        // Ensure focus is called in the next event cycle
        // This avoids any event handler in the same cycle messing up the focus
        setImmediate(function () {
          if (inputEl.current) {
            inputEl.current.focus();
          }
        });
      },
      blur: function blur() {
        if (inputEl.current) {
          inputEl.current.blur();
        }
      }
    };
  });
  return _react["default"].createElement("div", {
    className: _styles["default"].inputWrapper
  }, _react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].inputField, isFocused && 'Mui-focused', 'MuiInput-underline')
  }, _react["default"].createElement("input", {
    "data-sign": "recipientsInput",
    ref: inputEl,
    name: "receiver",
    value: value,
    onChange: function onChange(_ref2) {
      var value = _ref2.currentTarget.value;
      return _onChange(value);
    },
    className: _styles["default"].numberInput,
    maxLength: 30,
    onFocus: onFocus,
    placeholder: placeholder,
    autoComplete: "off"
  })), _react["default"].createElement(_RemoveButton["default"], {
    className: _styles["default"].removeButton,
    onClick: onClear,
    visibility: value.length > 0
  }));
});
PhoneNumberInput.propTypes = {
  placeholder: _propTypes["default"].string,
  currentLocale: _propTypes["default"].string.isRequired,
  value: _propTypes["default"].string.isRequired,
  onChange: _propTypes["default"].func,
  onClear: _propTypes["default"].func,
  onFocus: _propTypes["default"].func,
  isFocused: _propTypes["default"].bool
};
PhoneNumberInput.defaultProps = {
  placeholder: undefined,
  onChange: undefined,
  onClear: undefined,
  onFocus: undefined,
  isFocused: false
};
var _default = PhoneNumberInput;
exports["default"] = _default;
//# sourceMappingURL=PhoneNumberInput.js.map
