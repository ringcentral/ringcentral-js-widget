"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VideoPanel = void 0;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.function.name");

var _react = _interopRequireWildcard(require("react"));

var _sleep = _interopRequireDefault(require("ringcentral-integration/lib/sleep"));

var _isSafari = _interopRequireDefault(require("../../lib/isSafari"));

var _VideoConfig = require("./VideoConfig");

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var VideoPanel = function VideoPanel(_ref) {
  var ScheduleButton = _ref.scheduleButton,
      meeting = _ref.meeting,
      hidden = _ref.hidden,
      currentLocale = _ref.currentLocale,
      onOK = _ref.onOK,
      showSaveAsDefault = _ref.showSaveAsDefault,
      disableSaveAsDefault = _ref.disableSaveAsDefault,
      disabled = _ref.disabled,
      openNewWindow = _ref.openNewWindow,
      invite = _ref.invite,
      updateMeetingSettings = _ref.updateMeetingSettings,
      validatePasswordSettings = _ref.validatePasswordSettings,
      init = _ref.init,
      recipientsSection = _ref.recipientsSection,
      showWhen = _ref.showWhen,
      showDuration = _ref.showDuration,
      brandName = _ref.brandName;

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      topicRef = _useState2[0],
      setTopicRef = _useState2[1];

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].videoPanel
  }, /*#__PURE__*/_react["default"].createElement(_VideoConfig.VideoConfig, {
    currentLocale: currentLocale,
    meeting: meeting,
    updateMeetingSettings: updateMeetingSettings,
    validatePasswordSettings: validatePasswordSettings,
    recipientsSection: recipientsSection,
    init: init,
    showWhen: showWhen,
    showDuration: showDuration,
    brandName: brandName
  }, /*#__PURE__*/_react["default"].createElement(_VideoConfig.Topic, {
    name: meeting.name,
    updateMeetingTopic: function updateMeetingTopic(name) {
      updateMeetingSettings({
        name: name
      });
    },
    currentLocale: currentLocale,
    setTopicRef: setTopicRef
  })), ScheduleButton ? /*#__PURE__*/_react["default"].createElement(ScheduleButton, {
    currentLocale: currentLocale,
    hidden: hidden,
    disabled: disabled,
    meeting: meeting,
    onOK: onOK,
    onClick: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var opener;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (disabled) {
                _context.next = 6;
                break;
              }

              _context.next = 3;
              return (0, _sleep["default"])(100);

            case 3:
              opener = openNewWindow && (0, _isSafari["default"])() ? window.open() : null;
              _context.next = 6;
              return invite(_objectSpread(_objectSpread({}, meeting), {}, {
                name: topicRef.current.props.value
              }), opener);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })),
    update: updateMeetingSettings,
    showSaveAsDefault: showSaveAsDefault,
    disableSaveAsDefault: disableSaveAsDefault
  }) : null);
};

exports.VideoPanel = VideoPanel;
//# sourceMappingURL=VideoPanel.js.map
