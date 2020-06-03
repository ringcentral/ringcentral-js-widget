"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ConnectivityBadge;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _connectivityTypes = _interopRequireDefault(require("../../modules/ConnectivityManager/connectivityTypes"));

var _Badge = _interopRequireDefault(require("../Badge"));

var _Draggable = _interopRequireDefault(require("../Draggable"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _RetryIcon = _interopRequireDefault(require("../../assets/images/RetryIcon.svg"));

var _OvalLoading = _interopRequireDefault(require("../../assets/images/OvalLoading.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ConnectivityBadge(_ref) {
  var onClick = _ref.onClick,
      className = _ref.className,
      currentLocale = _ref.currentLocale,
      mode = _ref.mode,
      webphoneConnecting = _ref.webphoneConnecting,
      hasLimitedStatusError = _ref.hasLimitedStatusError;
  if (!mode) return null;
  var isWebphoneConnecting = mode === _connectivityTypes["default"].webphoneUnavailable && webphoneConnecting;
  var hasRetryButton = mode === _connectivityTypes["default"].webphoneUnavailable || hasLimitedStatusError;
  var view = null;

  if (isWebphoneConnecting) {
    view = /*#__PURE__*/_react["default"].createElement(_Badge["default"], {
      className: (0, _classnames["default"])(className, _styles["default"].badge, _styles["default"].loading),
      name: _i18n["default"].getString(mode, currentLocale)
    }, _i18n["default"].getString('Connecting', currentLocale), /*#__PURE__*/_react["default"].createElement(_OvalLoading["default"], {
      width: 12,
      height: 12
    }));
  } else {
    view = /*#__PURE__*/_react["default"].createElement(_Badge["default"], {
      className: (0, _classnames["default"])(className, _styles["default"].badge, _styles["default"].result),
      name: _i18n["default"].getString(mode, currentLocale)
    }, _i18n["default"].getString(mode, currentLocale), hasRetryButton ? /*#__PURE__*/_react["default"].createElement(_RetryIcon["default"], {
      width: 12,
      height: 12
    }) : null);
  }

  return /*#__PURE__*/_react["default"].createElement(_Draggable["default"], {
    className: _styles["default"].root,
    onClick: onClick
  }, view);
}

ConnectivityBadge.propTypes = {
  className: _propTypes["default"].string,
  currentLocale: _propTypes["default"].string.isRequired,
  mode: _propTypes["default"].string,
  webphoneConnecting: _propTypes["default"].bool,
  onClick: _propTypes["default"].func,
  hasLimitedStatusError: _propTypes["default"].bool
};
ConnectivityBadge.defaultProps = {
  className: null,
  onClick: function onClick() {},
  mode: null,
  webphoneConnecting: false,
  hasLimitedStatusError: false
};
//# sourceMappingURL=index.js.map
