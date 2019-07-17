"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Dialog;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _Button = _interopRequireDefault(require("../Button"));

var _CloseIcon = _interopRequireDefault(require("../../assets/images/CloseIcon.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function FlatButton(_ref) {
  var className = _ref.className,
      disabled = _ref.disabled,
      onClick = _ref.onClick,
      children = _ref.children,
      dataSign = _ref.dataSign;
  return _react["default"].createElement("div", {
    className: (0, _classnames["default"])(className, _styles["default"].flatBtn, _styles["default"].text, disabled && _styles["default"].disabled),
    "data-sign": dataSign,
    onClick: !disabled && onClick
  }, children);
}

FlatButton.propTypes = {
  className: _propTypes["default"].string,
  disabled: _propTypes["default"].bool,
  onClick: _propTypes["default"].func,
  children: _propTypes["default"].node,
  dataSign: _propTypes["default"].string
};
FlatButton.defaultProps = {
  className: undefined,
  disabled: false,
  onClick: undefined,
  children: undefined,
  dataSign: ''
};

function Dialog(_ref2) {
  var children = _ref2.children,
      title = _ref2.title,
      onConfirm = _ref2.onConfirm,
      onCancel = _ref2.onCancel,
      textConfirm = _ref2.textConfirm,
      textCancel = _ref2.textCancel,
      currentLocale = _ref2.currentLocale,
      className = _ref2.className,
      cancelBtnClassName = _ref2.cancelBtnClassName,
      confirmBtnClassName = _ref2.confirmBtnClassName,
      showTitle = _ref2.showTitle,
      showCloseBtn = _ref2.showCloseBtn,
      headerClassName = _ref2.headerClassName,
      contentClassName = _ref2.contentClassName,
      footerClassName = _ref2.footerClassName;
  var footer = !currentLocale || !onCancel && !onConfirm ? null : _react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].footer, footerClassName)
  }, onCancel ? _react["default"].createElement(FlatButton, {
    className: (0, _classnames["default"])(_styles["default"].btn, _styles["default"].cancelBtn, cancelBtnClassName),
    dataSign: "cancel",
    onClick: onCancel
  }, textCancel || _i18n["default"].getString('cancel', currentLocale)) : null, onConfirm ? _react["default"].createElement(FlatButton, {
    className: (0, _classnames["default"])(_styles["default"].btn, _styles["default"].confirmBtn, confirmBtnClassName),
    dataSign: "confirm",
    onClick: onConfirm
  }, textConfirm || _i18n["default"].getString('confirm', currentLocale)) : null);
  return _react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].dialog, className)
  }, showTitle ? _react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].header, headerClassName)
  }, "".concat(title) || null) : null, showCloseBtn ? _react["default"].createElement(_Button["default"], {
    dataSign: "closeButton",
    className: _styles["default"].closeBtn,
    onClick: onCancel
  }, _react["default"].createElement(_CloseIcon["default"], null)) : null, _react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].content, contentClassName)
  }, children), footer);
}

Dialog.propTypes = {
  className: _propTypes["default"].string,
  cancelBtnClassName: _propTypes["default"].string,
  confirmBtnClassName: _propTypes["default"].string,
  children: _propTypes["default"].node,
  onConfirm: _propTypes["default"].func,
  onCancel: _propTypes["default"].func,
  title: _propTypes["default"].string,
  currentLocale: _propTypes["default"].string,
  textConfirm: _propTypes["default"].string,
  textCancel: _propTypes["default"].string,
  showCloseBtn: _propTypes["default"].bool,
  showTitle: _propTypes["default"].bool,
  headerClassName: _propTypes["default"].string,
  contentClassName: _propTypes["default"].string,
  footerClassName: _propTypes["default"].string
};
Dialog.defaultProps = {
  currentLocale: '',
  className: '',
  cancelBtnClassName: '',
  confirmBtnClassName: '',
  children: undefined,
  onConfirm: undefined,
  onCancel: undefined,
  title: '',
  textConfirm: '',
  textCancel: '',
  showCloseBtn: true,
  showTitle: true,
  headerClassName: undefined,
  contentClassName: undefined,
  footerClassName: undefined
};
//# sourceMappingURL=index.js.map
