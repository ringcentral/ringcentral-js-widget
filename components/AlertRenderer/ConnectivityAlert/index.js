"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ConnectivityAlert;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ConnectivityManager = require("../../../modules/ConnectivityManager");

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ConnectivityAlert(_ref) {
  var message = _ref.message.message,
      currentLocale = _ref.currentLocale;
  return /*#__PURE__*/_react["default"].createElement("div", null, _i18n["default"].getString(message, currentLocale));
}

ConnectivityAlert.propTypes = {
  message: _propTypes["default"].shape({
    message: _propTypes["default"].string.isRequired
  }).isRequired,
  currentLocale: _propTypes["default"].string.isRequired
};

ConnectivityAlert.handleMessage = function (_ref2) {
  var message = _ref2.message;
  return message === _ConnectivityManager.connectivityTypes.networkLoss || message === _ConnectivityManager.connectivityTypes.offline || message === _ConnectivityManager.connectivityTypes.serverUnavailable || message === _ConnectivityManager.connectivityTypes.voipOnly || message === _ConnectivityManager.connectivityTypes.survival || message === _ConnectivityManager.connectivityTypes.webphoneUnavailable;
};
//# sourceMappingURL=index.js.map
