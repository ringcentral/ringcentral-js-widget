"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = AuthAlert;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ramda = require("ramda");

var _react = _interopRequireDefault(require("react"));

var _authMessages = _interopRequireDefault(require("@ringcentral-integration/commons/modules/Auth/authMessages"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function AuthAlert(props) {
  var msg = _i18n["default"].getString(props.message.message, props.currentLocale);

  return /*#__PURE__*/_react["default"].createElement("span", null, msg);
}

AuthAlert.propTypes = {
  currentLocale: _propTypes["default"].string.isRequired,
  message: _propTypes["default"].shape({
    message: _propTypes["default"].string.isRequired
  }).isRequired
};

AuthAlert.handleMessage = function (_ref) {
  var message = _ref.message;
  return (0, _ramda.contains)(message, [_authMessages["default"].accessDenied, _authMessages["default"].internalError, _authMessages["default"].sessionExpired, _authMessages["default"].beforeLogoutError, _authMessages["default"].logoutError]);
};
//# sourceMappingURL=index.js.map
