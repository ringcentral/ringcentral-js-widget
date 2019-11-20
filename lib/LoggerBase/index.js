"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultIdentityFunction = defaultIdentityFunction;
exports.convertListToMap = convertListToMap;
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.object.keys");

require("regenerator-runtime/runtime");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.map");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.for-each");

var _RcModule2 = _interopRequireDefault(require("../RcModule"));

var _di = require("../di");

var _Enum = require("../Enum");

var _ensureExist = _interopRequireDefault(require("../ensureExist"));

var _baseActionTypes = _interopRequireDefault(require("./baseActionTypes"));

var _getDefaultReducer = _interopRequireDefault(require("./getDefaultReducer"));

var _proxify = _interopRequireDefault(require("../proxy/proxify"));

var _selector = require("../selector");

var _dec, _class, _class2, _descriptor, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

/**
 * @function defaultIdentityFunction
 * @description Identity function returns a deterministic id value for each item.
 * @param {Object} item
 * @return {String}
 */
function defaultIdentityFunction(item) {
  return item.id;
}
/**
 * @function
 * @description Convert array of { name, id } objects into a map.
 * @param {[{ name: String, id: String }]} loggingList
 * @return {{ [ids]: { [names]: true } }}
 */


function convertListToMap(loggingList) {
  var mapping = {};
  loggingList.forEach(function (id) {
    mapping[id] = true;
  });
  return mapping;
}
/**
 * @class
 * @description Base class implementation for loggers.
 */


var LoggerBase = (_dec = (0, _di.Library)({
  deps: [{
    dep: 'LoggerBaseOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_RcModule) {
  _inherits(LoggerBase, _RcModule);

  /**
   * @constructor
   * @param {String} params.name - name of the class
   * @param {Object} params.actionTypes
   * @param {Function} params.getReducer
   * @param {Function} params.identityFunction - function that can derive an unique
   *    id from items.
   */
  function LoggerBase(_ref) {
    var _context;

    var _this;

    var name = _ref.name,
        _ref$actionTypes = _ref.actionTypes,
        actionTypes = _ref$actionTypes === void 0 ? (0, _Enum.prefixEnum)({
      base: _baseActionTypes["default"],
      prefix: name
    }) : _ref$actionTypes,
        _ref$getReducer = _ref.getReducer,
        getReducer = _ref$getReducer === void 0 ? _getDefaultReducer["default"] : _ref$getReducer,
        _ref$identityFunction = _ref.identityFunction,
        identityFunction = _ref$identityFunction === void 0 ? defaultIdentityFunction : _ref$identityFunction,
        logFunction = _ref.logFunction,
        readyCheckFunction = _ref.readyCheckFunction,
        options = _objectWithoutProperties(_ref, ["name", "actionTypes", "getReducer", "identityFunction", "logFunction", "readyCheckFunction"]);

    _classCallCheck(this, LoggerBase);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LoggerBase).call(this, _objectSpread({}, options, {
      actionTypes: actionTypes
    })));

    _initializerDefineProperty(_this, "loggingMap", _descriptor, _assertThisInitialized(_this));

    _this._name = (_context = _assertThisInitialized(_this), _ensureExist["default"]).call(_context, name, 'name');
    _this._identityFunction = (_context = _assertThisInitialized(_this), _ensureExist["default"]).call(_context, identityFunction, 'identityFunction');
    _this._logFunction = (_context = _assertThisInitialized(_this), _ensureExist["default"]).call(_context, logFunction, 'logFunction');
    _this._readyCheckFunction = (_context = _assertThisInitialized(_this), _ensureExist["default"]).call(_context, readyCheckFunction, 'readyCheckFunction');
    _this._reducer = getReducer(_this.actionTypes);
    _this._logPromises = new Map();
    return _this;
  }

  _createClass(LoggerBase, [{
    key: "initialize",
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe(function () {
        return _this2._onStateChange();
      });
    }
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return this.pending && this._readyCheckFunction();
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return this.ready && !this._readyCheckFunction();
    }
  }, {
    key: "_onStateChange",
    value: function _onStateChange() {
      return regeneratorRuntime.async(function _onStateChange$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!this._shouldInit()) {
                _context2.next = 8;
                break;
              }

              this.store.dispatch({
                type: this.actionTypes.init
              });

              if (!(typeof this._onInit === 'function')) {
                _context2.next = 5;
                break;
              }

              _context2.next = 5;
              return regeneratorRuntime.awrap(this._onInit());

            case 5:
              this.store.dispatch({
                type: this.actionTypes.initSuccess
              });
              _context2.next = 14;
              break;

            case 8:
              if (!this._shouldReset()) {
                _context2.next = 14;
                break;
              }

              this.store.dispatch({
                type: this.actionTypes.reset
              });

              if (!(typeof this._onReset === 'function')) {
                _context2.next = 13;
                break;
              }

              _context2.next = 13;
              return regeneratorRuntime.awrap(this._onReset());

            case 13:
              this.store.dispatch({
                type: this.actionTypes.resetSuccess
              });

            case 14:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "_log",
    value: function _log() {
      var _ref2,
          item,
          options,
          id,
          promise,
          _args2 = arguments;

      return regeneratorRuntime.async(function _log$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _ref2 = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
              item = _ref2.item, options = _objectWithoutProperties(_ref2, ["item"]);

              if (this.ready) {
                _context3.next = 4;
                break;
              }

              throw new Error("".concat(this.constructor.name, "._log: module is not ready."));

            case 4:
              if (item) {
                _context3.next = 6;
                break;
              }

              throw new Error("".concat(this.constructor.name, "._log: options.item is undefined."));

            case 6:
              id = this._identityFunction(item); // wait for the previous log action to finish

              if (!this._logPromises.has(id)) {
                _context3.next = 10;
                break;
              }

              _context3.next = 10;
              return regeneratorRuntime.awrap(this._logPromises.get(id));

            case 10:
              _context3.prev = 10;
              this.store.dispatch({
                type: this.actionTypes.log,
                id: id
              });
              promise = this._logFunction(_objectSpread({
                item: item
              }, options));

              this._logPromises.set(id, promise);

              _context3.next = 16;
              return regeneratorRuntime.awrap(promise);

            case 16:
              this._logPromises["delete"](id);

              this.store.dispatch({
                type: this.actionTypes.logSuccess,
                id: id
              });
              _context3.next = 25;
              break;

            case 20:
              _context3.prev = 20;
              _context3.t0 = _context3["catch"](10);

              this._logPromises["delete"](id);

              this.store.dispatch({
                type: this.actionTypes.logError,
                error: _context3.t0,
                id: id
              });
              throw _context3.t0;

            case 25:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this, [[10, 20]]);
    }
  }, {
    key: "log",
    value: function log(_ref3) {
      var item, options;
      return regeneratorRuntime.async(function log$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              item = _ref3.item, options = _objectWithoutProperties(_ref3, ["item"]);

              if (this.ready) {
                _context4.next = 3;
                break;
              }

              throw new Error("".concat(this.constructor.name, ".log: module is not ready."));

            case 3:
              if (item) {
                _context4.next = 5;
                break;
              }

              throw new Error("".concat(this.constructor.name, ".log: options.item is undefined."));

            case 5:
              _context4.next = 7;
              return regeneratorRuntime.awrap(this._log(_objectSpread({
                item: item
              }, options)));

            case 7:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "status",
    get: function get() {
      return this.state.status;
    }
  }, {
    key: "loggingList",
    get: function get() {
      return this.state.loggingList;
    }
  }]);

  return LoggerBase;
}(_RcModule2["default"]), _temp), (_applyDecoratedDescriptor(_class2.prototype, "_log", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_log"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "log", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "log"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "loggingMap", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this3 = this;

    return [function () {
      return _this3.loggingList;
    }, convertListToMap];
  }
})), _class2)) || _class);
exports["default"] = LoggerBase;
//# sourceMappingURL=index.js.map
