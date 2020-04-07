"use strict";

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

var _uuid = _interopRequireDefault(require("uuid"));

var _global$navigator, _global$navigator$loc, _global$navigator$loc2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * If the browser supports web lock api, obtain a web lock indefinitely.
 * This will prevent chrome's proactive tab freeze feature from freezing
 * our app.
 *
 * https://www.chromestatus.com/feature/5193677469122560
 * https://developer.mozilla.org/en-US/docs/Web/API/Lock
 *
 * Use randomly generated uuid to prevent lock collision. While it should not
 * have any affect if multiple tabs uses the same name for the lock, we want to
 * avoid this since the api is still experimental and might have strange results.
 */
// eslint-disable-next-line no-unused-expressions
(_global$navigator = global.navigator) === null || _global$navigator === void 0 ? void 0 : (_global$navigator$loc = _global$navigator.locks) === null || _global$navigator$loc === void 0 ? void 0 : (_global$navigator$loc2 = _global$navigator$loc.request) === null || _global$navigator$loc2 === void 0 ? void 0 : _global$navigator$loc2.call(_global$navigator$loc, _uuid["default"].v4(), function () {
  return new Promise(function () {});
});
//# sourceMappingURL=TabFreezePrevention.js.map
