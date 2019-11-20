"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

var _di = require("ringcentral-integration/lib/di");

var _RcUIModule2 = _interopRequireDefault(require("../../lib/RcUIModule"));

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var CallBadgeUI = (_dec = (0, _di.Module)({
  name: 'CallBadgeUI',
  deps: ['Locale', 'Webphone']
}), _dec(_class =
/*#__PURE__*/
function (_RcUIModule) {
  _inherits(CallBadgeUI, _RcUIModule);

  function CallBadgeUI() {
    _classCallCheck(this, CallBadgeUI);

    return _possibleConstructorReturn(this, _getPrototypeOf(CallBadgeUI).apply(this, arguments));
  }

  _createClass(CallBadgeUI, [{
    key: "getUIProps",
    value: function getUIProps(_ref) {
      var hidden = _ref.hidden,
          goToCallCtrl = _ref.goToCallCtrl,
          _ref$defaultOffsetX = _ref.defaultOffsetX,
          defaultOffsetX = _ref$defaultOffsetX === void 0 ? 0 : _ref$defaultOffsetX,
          _ref$defaultOffsetY = _ref.defaultOffsetY,
          defaultOffsetY = _ref$defaultOffsetY === void 0 ? 0 : _ref$defaultOffsetY,
          _ref$phone = _ref.phone,
          locale = _ref$phone.locale,
          webphone = _ref$phone.webphone;
      var currentSession = webphone.activeSession || webphone.ringSession || {};
      return {
        hidden: hidden,
        goToCallCtrl: goToCallCtrl,
        defaultOffsetX: defaultOffsetX,
        defaultOffsetY: defaultOffsetY,
        session: currentSession,
        currentLocale: locale.currentLocale
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref2) {
      var webphone = _ref2.phone.webphone;
      return {
        toggleMinimized: function toggleMinimized(id) {
          return webphone.toggleMinimized(id);
        }
      };
    }
  }]);

  return CallBadgeUI;
}(_RcUIModule2["default"])) || _class);
exports["default"] = CallBadgeUI;
//# sourceMappingURL=index.js.map
