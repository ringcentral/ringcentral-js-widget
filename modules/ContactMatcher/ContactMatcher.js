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

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.regexp.match");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.object.assign");

var _di = require("../../lib/di");

var _DataMatcher2 = _interopRequireDefault(require("../../lib/DataMatcher"));

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _dec, _class, _class2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var ContactMatcher = (
/**
 * @class
 * @description Contact matcher managing module
 */
_dec = (0, _di.Module)({
  deps: [{
    dep: 'ContactMatcherOptions',
    optional: true
  }]
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_DataMatcher) {
  _inherits(ContactMatcher, _DataMatcher);

  /**
   * @constructor
   */
  function ContactMatcher(_ref) {
    var options = Object.assign({}, _ref);

    _classCallCheck(this, ContactMatcher);

    return _possibleConstructorReturn(this, _getPrototypeOf(ContactMatcher).call(this, _objectSpread({
      name: 'contactMatcher'
    }, options)));
  }

  _createClass(ContactMatcher, [{
    key: "hasMatchNumber",
    value: function hasMatchNumber(_ref2) {
      var phoneNumber, _ref2$ignoreCache, ignoreCache;

      return regeneratorRuntime.async(function hasMatchNumber$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              phoneNumber = _ref2.phoneNumber, _ref2$ignoreCache = _ref2.ignoreCache, ignoreCache = _ref2$ignoreCache === void 0 ? false : _ref2$ignoreCache;
              _context.next = 3;
              return regeneratorRuntime.awrap(this.match({
                queries: [phoneNumber],
                ignoreCache: ignoreCache
              }));

            case 3:
              return _context.abrupt("return", !!this.dataMapping[phoneNumber] && this.dataMapping[phoneNumber].length > 0);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "forceMatchBatchNumbers",
    value: function forceMatchBatchNumbers(_ref3) {
      var phoneNumbers;
      return regeneratorRuntime.async(function forceMatchBatchNumbers$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              phoneNumbers = _ref3.phoneNumbers;
              _context2.next = 3;
              return regeneratorRuntime.awrap(this.match({
                queries: phoneNumbers,
                ignoreCache: true,
                ignoreQueue: true
              }));

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "forceMatchNumber",
    value: function forceMatchNumber(_ref4) {
      var phoneNumber;
      return regeneratorRuntime.async(function forceMatchNumber$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              phoneNumber = _ref4.phoneNumber;
              _context3.next = 3;
              return regeneratorRuntime.awrap(this.forceMatchBatchNumbers({
                phoneNumbers: [phoneNumber]
              }));

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }]);

  return ContactMatcher;
}(_DataMatcher2["default"]), (_applyDecoratedDescriptor(_class2.prototype, "hasMatchNumber", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "hasMatchNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "forceMatchBatchNumbers", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "forceMatchBatchNumbers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "forceMatchNumber", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "forceMatchNumber"), _class2.prototype)), _class2)) || _class);
exports["default"] = ContactMatcher;
//# sourceMappingURL=ContactMatcher.js.map
