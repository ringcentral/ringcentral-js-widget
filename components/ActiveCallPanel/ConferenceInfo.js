"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

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

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.array.find");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _debounce = _interopRequireDefault(require("ringcentral-integration/lib/debounce"));

var _CallAvatar = _interopRequireDefault(require("../CallAvatar"));

var _DynamicsFont = _interopRequireDefault(require("../../assets/DynamicsFont/DynamicsFont.scss"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var MAXIMUM_AVATARS = 4;
var WIDTH_PER_AVATAR = parseInt(_styles["default"].conferenceAvatarSize, 0); // 51

var AVATAR_MERGIN_LEFT = parseInt(_styles["default"].avatarMerginLeftSize, 0); // -20

var PEDDING_WIDTH = parseInt(_styles["default"].avatarPaddingSize, 0); // 15

var minWidthCalculator = function minWidthCalculator(count) {
  return WIDTH_PER_AVATAR * count + AVATAR_MERGIN_LEFT * (count - 1) + PEDDING_WIDTH * 2 + 1 + 2;
}; // when the container width reachs below item of width, display the avatar amount of count.


var KINDS_OF_WIDTH_THAT_NEED_ADAPATER = [{
  avartarCount: 0,
  width: minWidthCalculator(1)
}, {
  avartarCount: 1,
  width: minWidthCalculator(3)
}, {
  avartarCount: 2,
  width: minWidthCalculator(MAXIMUM_AVATARS)
}, {
  avartarCount: 3,
  width: minWidthCalculator(MAXIMUM_AVATARS + 1)
}];

var ConferenceInfo =
/*#__PURE__*/
function (_Component) {
  _inherits(ConferenceInfo, _Component);

  function ConferenceInfo(props) {
    var _this;

    _classCallCheck(this, ConferenceInfo);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ConferenceInfo).call(this, props));
    _this.onWindowResize = (0, _debounce["default"])(function () {
      _this.updateAvatarAmounts(_this.props);
    }, 100);
    _this.state = {
      avatarCount: MAXIMUM_AVATARS
    };
    _this._container = _react["default"].createRef();
    return _this;
  }

  _createClass(ConferenceInfo, [{
    key: "_computeAvatarCountByWindowWidth",
    value: function _computeAvatarCountByWindowWidth(props) {
      var partyProfiles = props.partyProfiles;
      var avatarProfilesCount = partyProfiles && partyProfiles.length || 0;

      if (!this._mounted) {
        if (avatarProfilesCount >= MAXIMUM_AVATARS) {
          return MAXIMUM_AVATARS;
        }

        return avatarProfilesCount;
      }

      var width = this._container && this._container.current && this._container.current.clientWidth;
      var avatarCount = avatarProfilesCount;
      var firstMatchWidth = KINDS_OF_WIDTH_THAT_NEED_ADAPATER.find(function (it) {
        return width < it.width;
      });

      if (firstMatchWidth) {
        avatarCount = firstMatchWidth.avartarCount;

        if (avatarCount + 1 === avatarProfilesCount) {
          avatarCount = avatarProfilesCount;
        }
      } else if (avatarCount >= MAXIMUM_AVATARS) {
        avatarCount = MAXIMUM_AVATARS;
      }

      return avatarCount;
    }
  }, {
    key: "updateAvatarAmounts",
    value: function updateAvatarAmounts(props) {
      if (!this._mounted) {
        return;
      }

      var avatarCount = this._computeAvatarCountByWindowWidth(props);

      if (avatarCount !== this.state.avatarCount) {
        this.setState({
          avatarCount: avatarCount
        });
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      this.updateAvatarAmounts(nextProps);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this._mounted = true;
      window.addEventListener('resize', this.onWindowResize);
      this.updateAvatarAmounts(this.props);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._mounted = false;
      window.removeEventListener('resize', this.onWindowResize);
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      var partyProfiles = nextProps.partyProfiles;
      var oldpartyProfiles = this.props.partyProfiles;
      var showUpdate = true;

      if (partyProfiles !== oldpartyProfiles) {
        if (Array.isArray(partyProfiles) && Array.isArray(oldpartyProfiles) && partyProfiles.length === oldpartyProfiles.length) {
          showUpdate = false;

          for (var i = 0; i < partyProfiles.length; i += 1) {
            if (partyProfiles[i].id !== oldpartyProfiles[i].id) {
              showUpdate = true;
              break;
            }
          }
        }
      } else if (nextState.avatarCount !== this.state.avatarCount) {
        showUpdate = true;
      } else {
        showUpdate = false;
      }

      return showUpdate;
    }
  }, {
    key: "computeDisplayedProfiles",
    value: function computeDisplayedProfiles(_ref) {
      var profiles = _ref.profiles,
          avatarCount = _ref.avatarCount;
      var displayedProfiles = profiles.length >= avatarCount ? profiles.slice(0, avatarCount) : profiles;
      var remains = profiles.length - avatarCount;
      return {
        displayedProfiles: displayedProfiles,
        remains: remains
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          currentLocale = _this$props.currentLocale,
          partyProfiles = _this$props.partyProfiles,
          _onClick = _this$props.onClick;
      var profiles = partyProfiles || [];
      var avatarCount = this.state.avatarCount;

      var _this$computeDisplaye = this.computeDisplayedProfiles({
        profiles: profiles,
        avatarCount: avatarCount
      }),
          displayedProfiles = _this$computeDisplaye.displayedProfiles,
          remains = _this$computeDisplaye.remains;

      return _react["default"].createElement("div", {
        className: _styles["default"].conferenceCallInfoContainer,
        ref: this._container
      }, displayedProfiles.length || avatarCount === 0 && remains > 0 ? _react["default"].createElement("div", {
        className: (0, _classnames["default"])(_styles["default"].avatarContainer, _styles["default"].clickable),
        onClick: function onClick(e) {
          e.preventDefault();

          _onClick();
        }
      }, displayedProfiles.map(function (_ref2, idx) {
        var avatarUrl = _ref2.avatarUrl,
            partyName = _ref2.partyName;
        return _react["default"].createElement("div", {
          key: "".concat(partyName, "_").concat(idx),
          className: _styles["default"].avatar
        }, _react["default"].createElement(_CallAvatar["default"], {
          avatarUrl: avatarUrl
        }));
      }), remains > 0 ? _react["default"].createElement("div", {
        className: (0, _classnames["default"])(_styles["default"].avatar, _styles["default"].remains)
      }, "+".concat(remains)) : null) : _react["default"].createElement("div", {
        className: _styles["default"].avatarContainer
      }, _react["default"].createElement("div", {
        className: _styles["default"].avatar,
        style: {
          backgroundColor: '#fff'
        }
      }, _react["default"].createElement("i", {
        className: (0, _classnames["default"])(_DynamicsFont["default"].portrait, _styles["default"].icon)
      }))), _react["default"].createElement("p", {
        className: _styles["default"].info,
        "data-sign": "conferenceCall"
      }, _i18n["default"].getString('conferenceCall', currentLocale)));
    }
  }]);

  return ConferenceInfo;
}(_react.Component);

exports["default"] = ConferenceInfo;
ConferenceInfo.propTypes = {
  currentLocale: _propTypes["default"].string.isRequired,
  partyProfiles: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    avatarUrl: _propTypes["default"].string,
    partyName: _propTypes["default"].string
  })),
  onClick: _propTypes["default"].func
};
ConferenceInfo.defaultProps = {
  partyProfiles: null,
  onClick: function onClick(i) {
    return i;
  }
};
//# sourceMappingURL=ConferenceInfo.js.map
