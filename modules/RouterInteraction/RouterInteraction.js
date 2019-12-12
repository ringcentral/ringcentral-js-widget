"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
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

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.regexp.replace");

require("regenerator-runtime/runtime");

var _reactRouter = require("react-router");

var _reactRouterRedux = require("react-router-redux");

var _moduleStatuses = _interopRequireDefault(require("ringcentral-integration/enums/moduleStatuses"));

var _di = require("ringcentral-integration/lib/di");

var _proxify = _interopRequireDefault(require("ringcentral-integration/lib/proxy/proxify"));

var _RcModule2 = _interopRequireDefault(require("ringcentral-integration/lib/RcModule"));

var _dec, _class, _class2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function getDefaultHistory() {
  return (0, _reactRouter.useRouterHistory)(_reactRouter.createMemoryHistory)();
}
/**
 * Known issues for browser history:
 * https://github.com/reactjs/react-router-redux/issues/570
 * https://github.com/ReactTraining/history/issues/427
 */


var RouterInteraction = (_dec = (0, _di.Module)({
  deps: [{
    dep: 'RouterInteractionOptions',
    optional: true,
    spread: true
  }]
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_RcModule) {
  _inherits(RouterInteraction, _RcModule);

  function RouterInteraction(_ref) {
    var _this;

    var _ref$history = _ref.history,
        history = _ref$history === void 0 ? getDefaultHistory() : _ref$history,
        options = _objectWithoutProperties(_ref, ["history"]);

    _classCallCheck(this, RouterInteraction);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RouterInteraction).call(this, _objectSpread({}, options)));
    _this._reducer = _reactRouterRedux.routerReducer;
    _this._history = history;
    return _this;
  }

  _createClass(RouterInteraction, [{
    key: "initialize",
    value: function initialize() {
      var _this2 = this;

      this._history = (0, _reactRouterRedux.syncHistoryWithStore)(this._history, this.store, {
        selectLocationState: function selectLocationState() {
          return _this2.state;
        }
      });
    }
  }, {
    key: "initializeProxy",
    value: function initializeProxy() {
      var _this3 = this;

      this._history = (0, _reactRouterRedux.syncHistoryWithStore)(this._history, this.store, {
        selectLocationState: function selectLocationState() {
          return _this3.state;
        }
      });
    }
  }, {
    key: "_onStateChange",
    value: function _onStateChange() {
      /* do nothing */
    }
  }, {
    key: "push",
    value: function push() {
      var _this$_history;

      var _args = arguments;
      return regeneratorRuntime.async(function push$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              (_this$_history = this._history).push.apply(_this$_history, _args);

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "replace",
    value: function replace() {
      var _this$_history2;

      var _args2 = arguments;
      return regeneratorRuntime.async(function replace$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              (_this$_history2 = this._history).replace.apply(_this$_history2, _args2);

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "goBack",
    value: function goBack() {
      var _this$_history3;

      var _args3 = arguments;
      return regeneratorRuntime.async(function goBack$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              (_this$_history3 = this._history).goBack.apply(_this$_history3, _args3);

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "go",
    value: function go() {
      var _this$_history4;

      var _args4 = arguments;
      return regeneratorRuntime.async(function go$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              (_this$_history4 = this._history).go.apply(_this$_history4, _args4);

            case 1:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "_actionTypes",
    get: function get() {
      /* no action types */
      return null;
    }
  }, {
    key: "history",
    get: function get() {
      return this._history;
    }
  }, {
    key: "currentPath",
    get: function get() {
      return this.state.locationBeforeTransitions.pathname;
    }
  }, {
    key: "status",
    get: function get() {
      return _moduleStatuses["default"].ready;
    }
  }, {
    key: "actionTypes",
    get: function get() {
      return {
        locationChange: _reactRouterRedux.LOCATION_CHANGE
      };
    }
  }]);

  return RouterInteraction;
}(_RcModule2["default"]), (_applyDecoratedDescriptor(_class2.prototype, "push", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "push"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "replace", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "replace"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "goBack", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "goBack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "go", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "go"), _class2.prototype)), _class2)) || _class);
exports["default"] = RouterInteraction;
//# sourceMappingURL=RouterInteraction.js.map
