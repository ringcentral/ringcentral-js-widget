"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ActivityMatcher = require("./ActivityMatcher");

Object.keys(_ActivityMatcher).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ActivityMatcher[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ActivityMatcher[key];
    }
  });
});

var _ActivityMatcher2 = require("./ActivityMatcher.interface");

Object.keys(_ActivityMatcher2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ActivityMatcher2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ActivityMatcher2[key];
    }
  });
});
//# sourceMappingURL=index.js.map