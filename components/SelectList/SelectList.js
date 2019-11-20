"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectList = void 0;

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.is-array");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _ListView = require("./ListView");

var _SelectListBasic = require("../SelectListBasic");

var _WithScrollCheck = require("./WithScrollCheck");

var _styles = _interopRequireDefault(require("./styles.scss"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var SelectList = function SelectList(props) {
  var valueFunction = props.valueFunction,
      renderFunction = props.renderFunction,
      children = props.children,
      disabled = props.disabled,
      sourceValue = props.value,
      _onChange = props.onChange,
      currentLocale = props.currentLocale,
      startAdornment = props.startAdornment,
      matchedTitle = props.matchedTitle,
      otherTitle = props.otherTitle,
      backHeaderClassName = props.backHeaderClassName;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      open = _useState2[0],
      setOpen = _useState2[1];

  var renderListView = function renderListView(data, type, filter, scrollCheck) {
    return _react["default"].createElement(_ListView.ListView, {
      filter: filter,
      options: data,
      value: sourceValue,
      onChange: function onChange(value) {
        if (document.activeElement) {
          document.activeElement.blur();
        }

        _onChange(value);
      },
      renderFunction: renderFunction,
      valueFunction: valueFunction,
      onSelect: function onSelect(elm) {
        return scrollCheck(elm, type);
      },
      startAdornment: startAdornment
    });
  };

  var SelectListWithScrollCheck = (0, _WithScrollCheck.WithScrollCheck)(_SelectListBasic.SelectListBasic);
  return _react["default"].createElement("div", {
    className: disabled ? _styles["default"].disabled : null,
    "data-sign": "select-list-panel"
  }, _react["default"].createElement("div", {
    className: _styles["default"].field,
    onClick: function onClick(e) {
      e.preventDefault();
      e.stopPropagation();

      if (disabled) {
        return;
      }

      setOpen(true);
    }
  }, children), _react["default"].createElement(SelectListWithScrollCheck, _extends({
    matchedTitle: matchedTitle || _i18n["default"].getString('matched', currentLocale),
    otherTitle: otherTitle || _i18n["default"].getString('other', currentLocale),
    renderListView: renderListView,
    open: open,
    setOpen: setOpen,
    backHeaderClassName: backHeaderClassName
  }, props)));
};

exports.SelectList = SelectList;
SelectList.propTypes = {
  title: _propTypes["default"].string.isRequired,
  options: _propTypes["default"].arrayOf(_propTypes["default"].object),
  otherOptions: _propTypes["default"].arrayOf(_propTypes["default"].object),
  placeholder: _propTypes["default"].string,
  valueFunction: _propTypes["default"].func.isRequired,
  renderFunction: _propTypes["default"].func.isRequired,
  searchOption: _propTypes["default"].func.isRequired,
  children: _propTypes["default"].node,
  disabled: _propTypes["default"].bool,
  value: _propTypes["default"].any,
  rightIcon: _propTypes["default"].element,
  onChange: _propTypes["default"].func,
  currentLocale: _propTypes["default"].string.isRequired,
  startAdornment: _propTypes["default"].func,
  matchedTitle: _propTypes["default"].string,
  otherTitle: _propTypes["default"].string,
  backHeaderClassName: _propTypes["default"].string
};
SelectList.defaultProps = {
  options: [],
  otherOptions: [],
  placeholder: '',
  children: null,
  disabled: false,
  matchedTitle: '',
  otherTitle: '',
  value: {},
  rightIcon: null,
  onChange: function onChange() {},
  startAdornment: function startAdornment() {},
  backHeaderClassName: null
};
//# sourceMappingURL=SelectList.js.map
