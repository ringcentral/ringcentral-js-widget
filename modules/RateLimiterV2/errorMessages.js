"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorMessages = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var errorMessages = _ObjectMap.ObjectMap.prefixKeys(['rateLimitReached'], 'rateLimiterErrorMessages');

exports.errorMessages = errorMessages;
//# sourceMappingURL=errorMessages.js.map