"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

var _react = _interopRequireWildcard(require("react"));

var _presenceStatus = require("ringcentral-integration/enums/presenceStatus.enum");

var _dndStatus = _interopRequireDefault(require("ringcentral-integration/modules/Presence/dndStatus"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Line = _interopRequireDefault(require("../Line"));

var _PresenceItem = _interopRequireDefault(require("../PresenceItem"));

var _style = _interopRequireDefault(require("./style.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var PresenceDropdown = /*#__PURE__*/function (_Component) {
  _inherits(PresenceDropdown, _Component);

  var _super = _createSuper(PresenceDropdown);

  function PresenceDropdown(props) {
    var _this;

    _classCallCheck(this, PresenceDropdown);

    _this = _super.call(this, props);
    _this.state = {
      showSelects: false
    }; // TODO: Consider for the bubble event of click to set status.
    // (maybe discuss in coding dojo)

    _this.toggleShow = function () {
      var isReady = _this.props.isReady;

      if (isReady) {
        _this.setState(function (preState) {
          return {
            showSelects: !preState.showSelects
          };
        });
      }
    };

    return _this;
  }

  _createClass(PresenceDropdown, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          userStatus = _this$props.userStatus,
          dndStatus = _this$props.dndStatus,
          currentLocale = _this$props.currentLocale,
          setAvailable = _this$props.setAvailable,
          setBusy = _this$props.setBusy,
          setDoNotDisturb = _this$props.setDoNotDisturb,
          setInvisible = _this$props.setInvisible;
      var showSelects = this.state.showSelects;
      var showDropdown = (0, _classnames["default"])(_style["default"].root, showSelects ? _style["default"].showSelects : null);
      var showBackground = (0, _classnames["default"])(_style["default"].bk, showSelects ? _style["default"].showSelects : null);
      return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])(_style["default"].presence, _style["default"][userStatus], _style["default"][dndStatus]),
        onClick: this.toggleShow
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _style["default"].presenceBar
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: showDropdown
      }, /*#__PURE__*/_react["default"].createElement(_Line["default"], {
        className: _style["default"].presenceList
      }, /*#__PURE__*/_react["default"].createElement(_PresenceItem["default"], {
        className: _style["default"].presenceItem,
        userStatus: _presenceStatus.presenceStatus.available,
        dndStatus: _dndStatus["default"].takeAllCalls,
        currentLocale: currentLocale,
        onClick: setAvailable,
        selected: userStatus === _presenceStatus.presenceStatus.available && dndStatus !== _dndStatus["default"].doNotAcceptAnyCalls
      }), /*#__PURE__*/_react["default"].createElement(_PresenceItem["default"], {
        className: _style["default"].presenceItem,
        userStatus: _presenceStatus.presenceStatus.busy,
        dndStatus: _dndStatus["default"].takeAllCalls,
        currentLocale: currentLocale,
        onClick: setBusy,
        selected: userStatus === _presenceStatus.presenceStatus.busy && dndStatus !== _dndStatus["default"].doNotAcceptAnyCalls
      }), /*#__PURE__*/_react["default"].createElement(_PresenceItem["default"], {
        className: _style["default"].presenceItem,
        userStatus: _presenceStatus.presenceStatus.busy,
        dndStatus: _dndStatus["default"].doNotAcceptAnyCalls,
        currentLocale: currentLocale,
        onClick: setDoNotDisturb,
        selected: dndStatus === _dndStatus["default"].doNotAcceptAnyCalls
      }), /*#__PURE__*/_react["default"].createElement(_PresenceItem["default"], {
        className: _style["default"].presenceItem,
        userStatus: _presenceStatus.presenceStatus.offline,
        dndStatus: _dndStatus["default"].takeAllCalls,
        currentLocale: currentLocale,
        onClick: setInvisible,
        selected: userStatus === _presenceStatus.presenceStatus.offline && dndStatus !== _dndStatus["default"].doNotAcceptAnyCalls
      })))), /*#__PURE__*/_react["default"].createElement("div", {
        className: showBackground,
        onClick: this.toggleShow
      }));
    }
  }]);

  return PresenceDropdown;
}(_react.Component);

exports["default"] = PresenceDropdown;
PresenceDropdown.propTypes = {
  currentLocale: _propTypes["default"].string.isRequired,
  dndStatus: _propTypes["default"].string,
  userStatus: _propTypes["default"].string,
  setAvailable: _propTypes["default"].func.isRequired,
  setBusy: _propTypes["default"].func.isRequired,
  setDoNotDisturb: _propTypes["default"].func.isRequired,
  setInvisible: _propTypes["default"].func.isRequired,
  isReady: _propTypes["default"].bool.isRequired
};
PresenceDropdown.defaultProps = {
  dndStatus: null,
  userStatus: null
};
//# sourceMappingURL=index.js.map
