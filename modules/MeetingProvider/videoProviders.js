"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.videoProviders = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var videoProviders = _ObjectMap.ObjectMap.fromKeys(['RCMeetings', 'RCVideo', 'None']);

exports.videoProviders = videoProviders;
//# sourceMappingURL=videoProviders.js.map