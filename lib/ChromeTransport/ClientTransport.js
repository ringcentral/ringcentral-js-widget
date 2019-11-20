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

/* global chrome */
var ClientTransport =
/*#__PURE__*/
function (_TransportBase) {
  _inherits(ClientTransport, _TransportBase);

  function ClientTransport(options) {
    var _this;

    _classCallCheck(this, ClientTransport);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ClientTransport).call(this, _objectSpread({}, options, {
      name: 'ChromeTransport'
    })));
    _this._requests = new Map();
    _this._port = chrome.runtime.connect({
      name: 'transport'
    });

    _this._port.onMessage.addListener(function (_ref) {
      var type = _ref.type,
          payload = _ref.payload,
          requestId = _ref.requestId,
          result = _ref.result,
          error = _ref.error;

      switch (type) {
        case _this._events.push:
          if (payload) {
            _this.emit(_this._events.push, payload);
          }

          break;

        case _this._events.response:
          if (requestId && _this._requests.has(requestId)) {
            if (error) {
              _this._requests.get(requestId).reject(new Error(error));
            } else {
              _this._requests.get(requestId).resolve(result);
            }
          }

          break;

        default:
          break;
      }
    });

    return _this;
  }

  _createClass(ClientTransport, [{
    key: "request",
    value: function request(_ref2) {
      var _this2 = this;

      var payload, requestId, promise, timeout;
      return regeneratorRuntime.async(function request$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              payload = _ref2.payload;
              requestId = _uuid["default"].v4();
              promise = new Promise(function (resolve, reject) {
                _this2._requests.set(requestId, {
                  resolve: resolve,
                  reject: reject
                });

                _this2._port.postMessage({
                  type: _this2._events.request,
                  requestId: requestId,
                  payload: payload
                });
              });
              timeout = setTimeout(function () {
                timeout = null;

                _this2._requests.get(requestId).reject(new Error(_this2._events.timeout));
              }, this._timeout);
              promise = promise.then(function (result) {
                if (timeout) clearTimeout(timeout);

                _this2._requests["delete"](requestId);

                return Promise.resolve(result);
              })["catch"](function (error) {
                if (timeout) clearTimeout(timeout);

                _this2._requests["delete"](requestId);

                return Promise.reject(error);
              });
              return _context.abrupt("return", promise);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }]);

  return ClientTransport;
}(_TransportBase2["default"]);

exports["default"] = ClientTransport;
//# sourceMappingURL=ClientTransport.js.map
