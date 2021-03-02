"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.RUNTIME = exports.PSEUDO_LOCALE = exports.DEFAULT_LOCALE = void 0;

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.number.parse-float");

require("core-js/modules/es6.number.constructor");

require("core-js/modules/es6.number.is-nan");

require("regenerator-runtime/runtime");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.set");

var _toPseudoString = _interopRequireDefault(require("./lib/toPseudoString"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var DEFAULT_LOCALE = 'en-US';
exports.DEFAULT_LOCALE = DEFAULT_LOCALE;
var PSEUDO_LOCALE = 'en-ZZ';
exports.PSEUDO_LOCALE = PSEUDO_LOCALE;
var RUNTIME = {
  locale: DEFAULT_LOCALE,
  defaultLocale: DEFAULT_LOCALE,
  instances: new Set(),
  padRatio: 0.3,
  fallbackLocale: DEFAULT_LOCALE,
  languageDefaults: null
};
/**
 * @function
 * @description Set current runtime locale and load the locale files accordingly
 * @param {String} locale - The desired locale.
 * @return Promise<undefined>
 */

exports.RUNTIME = RUNTIME;

function setLocale(_x) {
  return _setLocale.apply(this, arguments);
}

function _setLocale() {
  _setLocale = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(locale) {
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            RUNTIME.locale = locale;
            _context8.next = 3;
            return reloadLocales();

          case 3:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return _setLocale.apply(this, arguments);
}

function reloadLocales() {
  return _reloadLocales.apply(this, arguments);
}

function _reloadLocales() {
  _reloadLocales = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
    var _iterator, _step, i;

    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _iterator = _createForOfIteratorHelper(RUNTIME.instances);
            _context9.prev = 1;

            _iterator.s();

          case 3:
            if ((_step = _iterator.n()).done) {
              _context9.next = 9;
              break;
            }

            i = _step.value;
            _context9.next = 7;
            return i.load();

          case 7:
            _context9.next = 3;
            break;

          case 9:
            _context9.next = 14;
            break;

          case 11:
            _context9.prev = 11;
            _context9.t0 = _context9["catch"](1);

            _iterator.e(_context9.t0);

          case 14:
            _context9.prev = 14;

            _iterator.f();

            return _context9.finish(14);

          case 17:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[1, 11, 14, 17]]);
  }));
  return _reloadLocales.apply(this, arguments);
}

function _setDefaultLocale2(_x2) {
  return _setDefaultLocale.apply(this, arguments);
}

function _setDefaultLocale() {
  _setDefaultLocale = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(locale) {
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            RUNTIME.defaultLocale = locale;
            _context10.next = 3;
            return reloadLocales();

          case 3:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));
  return _setDefaultLocale.apply(this, arguments);
}

function _setLanguageDefaults2(_x3) {
  return _setLanguageDefaults.apply(this, arguments);
}

function _setLanguageDefaults() {
  _setLanguageDefaults = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(defaults) {
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            RUNTIME.languageDefaults = defaults;
            _context11.next = 3;
            return reloadLocales();

          case 3:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));
  return _setLanguageDefaults.apply(this, arguments);
}

function _checkDefaults(locale) {
  return RUNTIME.languageDefaults && RUNTIME.languageDefaults[locale] || locale;
}
/**
 * @class
 * @description I18n is a simple localizations helper class that represents a set of locale files.
 */


var I18n = /*#__PURE__*/function () {
  /**
   * @constructor
   * @description Accepts a loadLocale function that should be async and resolve to the locale
   *  object when invoked.
   * @param {String => Promise<Object>} loadLocale - Asynchronous locale loader function.
   */
  function I18n(loadLocale) {
    _classCallCheck(this, I18n);

    if (typeof loadLocale !== 'function') {
      throw new Error('loadLocale must be a function');
    }

    this._loadLocale = loadLocale;
    this._cache = {};
    RUNTIME.instances.add(this);
    this.load();
  }

  _createClass(I18n, [{
    key: "_load",
    value: function () {
      var _load2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(locale) {
        var _this = this;

        var data;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(locale !== PSEUDO_LOCALE && !this._cache[locale])) {
                  _context2.next = 11;
                  break;
                }

                _context2.prev = 1;
                _context2.next = 4;
                return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          return _context.abrupt("return", _this._loadLocale(locale));

                        case 1:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }))();

              case 4:
                data = _context2.sent;
                _context2.next = 10;
                break;

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2["catch"](1);

                /* ignore error */
                data = {};

              case 10:
                this._cache[locale] = data;

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 7]]);
      }));

      function _load(_x4) {
        return _load2.apply(this, arguments);
      }

      return _load;
    }()
  }, {
    key: "load",
    value: function () {
      var _load3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this._load(_checkDefaults(RUNTIME.fallbackLocale));

              case 2:
                _context3.next = 4;
                return this._load(_checkDefaults(RUNTIME.defaultLocale));

              case 4:
                _context3.next = 6;
                return this._load(_checkDefaults(RUNTIME.locale));

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function load() {
        return _load3.apply(this, arguments);
      }

      return load;
    }()
  }, {
    key: "_getString",
    value: function _getString(key, locale) {
      if (this._cache[locale] && Object.prototype.hasOwnProperty.call(this._cache[locale], key)) {
        return this._cache[locale][key];
      }

      if (this._cache[RUNTIME.defaultLocale] && Object.prototype.hasOwnProperty.call(this._cache[RUNTIME.defaultLocale], key)) {
        return this._cache[RUNTIME.defaultLocale][key];
      }

      if (this._cache[RUNTIME.fallbackLocale] && Object.prototype.hasOwnProperty.call(this._cache[RUNTIME.fallbackLocale], key)) {
        return this._cache[RUNTIME.fallbackLocale][key];
      }

      return key;
    }
  }, {
    key: "getString",
    value: function getString(key) {
      var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : RUNTIME.locale;

      if (locale === PSEUDO_LOCALE) {
        return (0, _toPseudoString["default"])({
          str: this._getString(key, RUNTIME.fallbackLocale),
          padRatio: RUNTIME.padRatio
        });
      }

      return this._getString(key, _checkDefaults(locale));
    }
  }, {
    key: "checkDefaults",
    value: function checkDefaults(locale) {
      return _checkDefaults(locale);
    }
  }, {
    key: "setDefaultLocale",
    value: function () {
      var _setDefaultLocale3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(locale) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", _setDefaultLocale2(locale));

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function setDefaultLocale(_x5) {
        return _setDefaultLocale3.apply(this, arguments);
      }

      return setDefaultLocale;
    }()
  }, {
    key: "setLanguageDefaults",
    value: function () {
      var _setLanguageDefaults3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(defaults) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt("return", _setLanguageDefaults2(defaults));

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function setLanguageDefaults(_x6) {
        return _setLanguageDefaults3.apply(this, arguments);
      }

      return setLanguageDefaults;
    }()
  }, {
    key: "currentLocale",
    get: function get() {
      return RUNTIME.locale;
    }
  }, {
    key: "setLocale",
    get: function get() {
      return setLocale;
    }
  }], [{
    key: "checkDefaults",
    value: function checkDefaults(locale) {
      return _checkDefaults(locale);
    }
  }, {
    key: "setDefaultLocale",
    value: function setDefaultLocale(locale) {
      RUNTIME.defaultLocale = locale;
    }
  }, {
    key: "setDefaultLocale",
    value: function () {
      var _setDefaultLocale4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(locale) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                return _context6.abrupt("return", _setDefaultLocale2(locale));

              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function setDefaultLocale(_x7) {
        return _setDefaultLocale4.apply(this, arguments);
      }

      return setDefaultLocale;
    }()
  }, {
    key: "setLanguageDefaults",
    value: function () {
      var _setLanguageDefaults4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(defaults) {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                return _context7.abrupt("return", _setLanguageDefaults2(defaults));

              case 1:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function setLanguageDefaults(_x8) {
        return _setLanguageDefaults4.apply(this, arguments);
      }

      return setLanguageDefaults;
    }()
  }, {
    key: "currentLocale",
    get: function get() {
      return RUNTIME.locale;
    }
  }, {
    key: "setLocale",
    get: function get() {
      return setLocale;
    }
  }, {
    key: "padRatio",
    get: function get() {
      return RUNTIME.padRatio;
    },
    set: function set(ratio) {
      if (Number.isNaN(ratio)) {
        console.log('ratio must be a number');
        return;
      }

      RUNTIME.padRatio = Number.parseFloat(ratio);
    }
  }]);

  return I18n;
}();

exports["default"] = I18n;
//# sourceMappingURL=index.js.map
