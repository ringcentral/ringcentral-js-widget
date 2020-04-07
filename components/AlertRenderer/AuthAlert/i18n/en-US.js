"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _authMessages = _interopRequireDefault(require("ringcentral-integration/modules/Auth/authMessages"));

var _authMessages$interna;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_authMessages$interna = {}, _defineProperty(_authMessages$interna, _authMessages["default"].internalError, 'Login failed due to internal errors. Please try again later.'), _defineProperty(_authMessages$interna, _authMessages["default"].accessDenied, 'Access denied. Please contact support.'), _defineProperty(_authMessages$interna, _authMessages["default"].sessionExpired, 'Session expired. Please sign in.'), _authMessages$interna);

exports["default"] = _default;
//# sourceMappingURL=en-US.js.map
