"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventEmitterTransporter = exports.TRANSPORTER_DIRECTION = void 0;

require("core-js/modules/es6.object.set-prototype-of");

var _events = require("events");

var _BasicTransporter2 = _interopRequireDefault(require("./BasicTransporter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var TRANSPORTER_DIRECTION = {
  TO_INTERNAL: 'toInternal',
  TO_EXTERNAL: 'toExternal'
};
exports.TRANSPORTER_DIRECTION = TRANSPORTER_DIRECTION;

/**
 * @param direction if direction is 'toExternal', meaning this instance is created in internal adapter, need in eventEmitter
 */
var EventEmitterTransporter = /*#__PURE__*/function (_BasicTransporter) {
  _inherits(EventEmitterTransporter, _BasicTransporter);

  var _super = _createSuper(EventEmitterTransporter);

  function EventEmitterTransporter(_ref) {
    var _this;

    var direction = _ref.direction;

    _classCallCheck(this, EventEmitterTransporter);

    _this = _super.call(this);
    _this._direction = void 0;

    _this.addReceiver = function (onMessage) {
      window._transporterEventEmitter.on(_this._direction === TRANSPORTER_DIRECTION.TO_EXTERNAL ? TRANSPORTER_DIRECTION.TO_INTERNAL : TRANSPORTER_DIRECTION.TO_EXTERNAL, function (data) {
        onMessage({
          data: data
        });
      });
    };

    _this.createEmitter = function () {
      return function (emitterData) {
        var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            callback = _ref2.callback;

        window._transporterEventEmitter.emit(_this._direction === TRANSPORTER_DIRECTION.TO_EXTERNAL ? TRANSPORTER_DIRECTION.TO_EXTERNAL : TRANSPORTER_DIRECTION.TO_INTERNAL, emitterData);

        if (typeof callback === 'function') callback();
      };
    };

    if (!window._transporterEventEmitter) {
      window._transporterEventEmitter = new _events.EventEmitter();
    }

    _this._direction = direction;
    return _this;
  }

  return EventEmitterTransporter;
}(_BasicTransporter2["default"]);

exports.EventEmitterTransporter = EventEmitterTransporter;
//# sourceMappingURL=EventEmitterTransporter.js.map