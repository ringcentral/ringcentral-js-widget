"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = mapOptionToMode;

var _callingOptions = _interopRequireDefault(require("./callingOptions"));

var _callingModes = _interopRequireDefault(require("./callingModes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function mapOptionToMode(callWith) {
  switch (callWith) {
    case _callingOptions["default"].softphone:
      return _callingModes["default"].softphone;

    case _callingOptions["default"].myphone:
    case _callingOptions["default"].otherphone:
    case _callingOptions["default"].customphone:
      return _callingModes["default"].ringout;

    case _callingOptions["default"].browser:
      return _callingModes["default"].webphone;

    default:
      return _callingModes["default"].softphone;
  }
}
//# sourceMappingURL=mapOptionToMode.js.map
