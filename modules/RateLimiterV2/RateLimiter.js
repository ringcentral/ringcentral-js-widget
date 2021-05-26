"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RateLimiter = void 0;

require("regenerator-runtime/runtime");

require("core-js/modules/es6.date.now");

require("core-js/modules/es6.number.constructor");

require("core-js/modules/es6.number.parse-int");

var _core = require("@ringcentral-integration/core");

var _di = require("../../lib/di");

var _errorMessages = require("./errorMessages");

var _proxify = require("../../lib/proxy/proxify");

var _dec, _class, _class2, _descriptor;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var DEFAULT_THROTTLE_DURATION = 61 * 1000;
var RateLimiter = (_dec = (0, _di.Module)({
  name: 'RateLimiter',
  deps: ['Alert', 'Client', 'GlobalStorage', {
    dep: 'Environment',
    optional: true
  }, {
    dep: 'RateLimiterOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(RateLimiter, _RcModuleV);

  var _super = _createSuper(RateLimiter);

  function RateLimiter(deps) {
    var _this$_deps$rateLimit, _this$_deps$rateLimit2;

    var _this;

    _classCallCheck(this, RateLimiter);

    _this = _super.call(this, {
      deps: deps,
      enableGlobalCache: true,
      storageKey: 'RateLimiter'
    });
    _this._timeoutId = null;
    _this._unbindHandlers = void 0;
    _this._throttleDuration = DEFAULT_THROTTLE_DURATION;

    _initializerDefineProperty(_this, "timestamp", _descriptor, _assertThisInitialized(_this));

    _this._beforeRequestHandler = function () {
      if (_this.throttling) {
        throw new Error(_errorMessages.errorMessages.rateLimitReached);
      }
    };

    _this._checkTimestamp = function () {
      _this._timeoutId = null;

      if (!_this.throttling) {
        _this.stopThrottle();
      }
    };

    _this._requestErrorHandler = function (error) {
      if (!(error instanceof Error) || error.message !== 'Request rate exceeded') {
        return;
      } // Get `retry-after` from response headers first


      _this._throttleDuration = DEFAULT_THROTTLE_DURATION;

      if (error.response) {
        var retryAfter = error.response.headers.get('retry-after');

        if (retryAfter) {
          _this._throttleDuration = 1000 * Number.parseInt(retryAfter, 10);
        }
      }

      var wasThrottling = _this.throttling;

      _this.startThrottle(Date.now());

      if (!wasThrottling) {
        _this.showAlert();
      }

      clearTimeout(_this._timeoutId);
      _this._timeoutId = setTimeout(_this._checkTimestamp, _this._throttleDuration);
    };

    _this._throttleDuration = (_this$_deps$rateLimit = (_this$_deps$rateLimit2 = _this._deps.rateLimiterOptions) === null || _this$_deps$rateLimit2 === void 0 ? void 0 : _this$_deps$rateLimit2.throttleDuration) !== null && _this$_deps$rateLimit !== void 0 ? _this$_deps$rateLimit : DEFAULT_THROTTLE_DURATION;
    return _this;
  }

  _createClass(RateLimiter, [{
    key: "startThrottle",
    value: function startThrottle(timestamp) {
      this.timestamp = timestamp;
    }
  }, {
    key: "stopThrottle",
    value: function stopThrottle() {
      this.timestamp = null;
    }
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this2 = this;

      if (this._deps.environment) {
        (0, _core.watch)(this, function () {
          return _this2._deps.environment.changeCounter;
        }, function () {
          if (_this2.ready) {
            _this2._bindHandlers();
          }
        });
      }
    }
  }, {
    key: "onInit",
    value: function onInit() {
      this._bindHandlers();
    }
    /**
     * If the app is throttling, an incoming request will lead to an exception
     */

  }, {
    key: "showAlert",
    value: function () {
      var _showAlert = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(!this.throttling || !this._deps.alert || this._suppressAlerts)) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return");

              case 2:
                this._deps.alert.warning({
                  message: _errorMessages.errorMessages.rateLimitReached,
                  ttl: this.ttl,
                  allowDuplicates: false
                });

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function showAlert() {
        return _showAlert.apply(this, arguments);
      }

      return showAlert;
    }()
  }, {
    key: "_bindHandlers",
    value: function _bindHandlers() {
      var _this3 = this;

      if (this._unbindHandlers) {
        this._unbindHandlers();
      }

      var client = this._deps.client.service.client(); // TODO: Bind the `rateLimitError` event instead


      client.on(client.events.requestError, this._requestErrorHandler);
      client.on(client.events.beforeRequest, this._beforeRequestHandler);

      this._unbindHandlers = function () {
        client.removeListener(client.events.requestError, _this3._requestErrorHandler);
        client.removeListener(client.events.beforeRequest, _this3._beforeRequestHandler);
        _this3._unbindHandlers = null;
      };
    }
  }, {
    key: "_suppressAlerts",
    get: function get() {
      var _this$_deps$rateLimit3, _this$_deps$rateLimit4;

      return (_this$_deps$rateLimit3 = (_this$_deps$rateLimit4 = this._deps.rateLimiterOptions) === null || _this$_deps$rateLimit4 === void 0 ? void 0 : _this$_deps$rateLimit4.suppressAlerts) !== null && _this$_deps$rateLimit3 !== void 0 ? _this$_deps$rateLimit3 : false;
    }
  }, {
    key: "ttl",
    get: function get() {
      return this.throttling ? this._throttleDuration - (Date.now() - this.timestamp) : 0;
    }
  }, {
    key: "throttleDuration",
    get: function get() {
      return this._throttleDuration;
    }
    /**
     * Is in throttling status
     */

  }, {
    key: "throttling",
    get: function get() {
      return Date.now() - this.timestamp <= this._throttleDuration;
    }
  }]);

  return RateLimiter;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "timestamp", [_core.globalStorage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "startThrottle", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "startThrottle"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "stopThrottle", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "stopThrottle"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "showAlert", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "showAlert"), _class2.prototype)), _class2)) || _class);
exports.RateLimiter = RateLimiter;
//# sourceMappingURL=RateLimiter.js.map
