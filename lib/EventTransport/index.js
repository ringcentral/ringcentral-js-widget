"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.promise");

require("regenerator-runtime/runtime");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.map");

var _uuid = _interopRequireDefault(require("uuid"));

var _TransportBase2 = _interopRequireDefault(require("../TransportBase"));

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

var EventTransport =
/*#__PURE__*/
function (_TransportBase) {
  _inherits(EventTransport, _TransportBase);

  function EventTransport(options) {
    var _this;

    _classCallCheck(this, EventTransport);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(EventTransport).call(this, _objectSpread({}, options, {
      name: 'EventTransport'
    })));
    _this._deferred = new Map();
    return _this;
  }

  _createClass(EventTransport, [{
    key: "request",
    value: function request(_ref) {
      var _this2 = this;

      var payload, requestId, promise, timeoutId;
      return regeneratorRuntime.async(function request$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              payload = _ref.payload;
              requestId = _uuid["default"].v4();
              promise = new Promise(function (resolve, reject) {
                _this2._deferred.set(requestId, {
                  resolve: resolve,
                  reject: reject
                });
              });
              timeoutId = setTimeout(function () {
                timeoutId = null;

                _this2._deferred.get(requestId).reject(new Error(_this2._events.timeout));
              }, this._timeout);
              promise.then(function (result) {
                if (timeoutId) clearTimeout(timeoutId);

                _this2._deferred["delete"](requestId);

                return Promise.resolve(result);
              })["catch"](function (error) {
                if (timeoutId) clearTimeout(timeoutId);

                _this2._deferred["delete"](requestId);

                return Promise.reject(error);
              });
              this.emit(this._events.request, {
                requestId: requestId,
                payload: payload
              });
              return _context.abrupt("return", promise);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "response",
    value: function response(_ref2) {
      var requestId = _ref2.requestId,
          result = _ref2.result,
          error = _ref2.error;

      var deferred = this._deferred.get(requestId);

      if (deferred) {
        if (error) {
          deferred.reject(error);
        } else {
          deferred.resolve(result);
        }
      }
    }
  }, {
    key: "push",
    value: function push(_ref3) {
      var payload = _ref3.payload;
      this.emit(this._events.push, payload);
    }
  }]);

  return EventTransport;
}(_TransportBase2["default"]);

exports["default"] = EventTransport;
//# sourceMappingURL=index.js.map
