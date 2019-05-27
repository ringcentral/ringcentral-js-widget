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

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _SpinnerOverlay = _interopRequireDefault(require("ringcentral-widgets/components/SpinnerOverlay"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _left_arrow = _interopRequireDefault(require("../../assets/images/left_arrow.png"));

var _GlipPostList = _interopRequireDefault(require("../GlipPostList"));

var _GlipChatForm = _interopRequireDefault(require("../GlipChatForm"));

var _GlipGroupName = _interopRequireDefault(require("../GlipGroupName"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var GlipChatPage =
/*#__PURE__*/
function (_Component) {
  _inherits(GlipChatPage, _Component);

  function GlipChatPage(props) {
    var _this;

    _classCallCheck(this, GlipChatPage);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(GlipChatPage).call(this, props));
    _this.state = {
      inputHeight: props.mobile ? 80 : 110,
      headerHeight: props.mobile ? 38 : 50
    };
    return _this;
  }

  _createClass(GlipChatPage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.loadGroup(this.props.groupId);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.groupId !== nextProps.groupId) {
        this.props.loadGroup(nextProps.groupId);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          group = _this$props.group,
          className = _this$props.className,
          posts = _this$props.posts,
          updateText = _this$props.updateText,
          createPost = _this$props.createPost,
          textValue = _this$props.textValue,
          dateTimeFormatter = _this$props.dateTimeFormatter,
          showSpinner = _this$props.showSpinner,
          atRender = _this$props.atRender,
          uploadFile = _this$props.uploadFile,
          viewProfile = _this$props.viewProfile,
          loadNextPage = _this$props.loadNextPage,
          onBackClick = _this$props.onBackClick,
          mobile = _this$props.mobile;
      var spinner = showSpinner ? _react["default"].createElement(_SpinnerOverlay["default"], null) : null; // TODO: update alt with i18n

      var backIcon = onBackClick ? _react["default"].createElement("img", {
        src: _left_arrow["default"],
        alt: "Back",
        className: _styles["default"].backIcon,
        onClick: onBackClick
      }) : null;
      return _react["default"].createElement("div", {
        className: (0, _classnames["default"])(_styles["default"].root, className)
      }, _react["default"].createElement("div", {
        className: _styles["default"].header,
        style: {
          height: this.state.headerHeight,
          lineHeight: "".concat(this.state.headerHeight, "px")
        }
      }, backIcon, _react["default"].createElement(_GlipGroupName["default"], {
        group: group,
        showNumber: true
      })), _react["default"].createElement("div", {
        className: _styles["default"].content,
        style: {
          height: "calc(100% - ".concat(this.state.inputHeight + this.state.headerHeight, "px)")
        }
      }, _react["default"].createElement(_GlipPostList["default"], {
        posts: posts,
        atRender: atRender,
        groupId: group.id,
        showName: group.members && group.members.length > 2,
        dateTimeFormatter: dateTimeFormatter,
        viewProfile: viewProfile,
        loadNextPage: loadNextPage
      })), _react["default"].createElement(_GlipChatForm["default"], {
        className: _styles["default"].inputArea,
        height: this.state.inputHeight,
        textValue: textValue,
        onTextChange: updateText,
        groupId: group.id,
        onSubmit: createPost,
        onUploadFile: uploadFile,
        members: group.detailMembers,
        mobile: mobile
      }), spinner);
    }
  }]);

  return GlipChatPage;
}(_react.Component);

exports["default"] = GlipChatPage;
GlipChatPage.propTypes = {
  className: _propTypes["default"].string,
  group: _propTypes["default"].object,
  posts: _propTypes["default"].array,
  groupId: _propTypes["default"].string,
  textValue: _propTypes["default"].string,
  showSpinner: _propTypes["default"].bool,
  loadGroup: _propTypes["default"].func.isRequired,
  updateText: _propTypes["default"].func.isRequired,
  createPost: _propTypes["default"].func.isRequired,
  uploadFile: _propTypes["default"].func.isRequired,
  dateTimeFormatter: _propTypes["default"].func.isRequired,
  atRender: _propTypes["default"].func,
  onBackClick: _propTypes["default"].func,
  viewProfile: _propTypes["default"].func.isRequired,
  loadNextPage: _propTypes["default"].func.isRequired,
  mobile: _propTypes["default"].bool
};
GlipChatPage.defaultProps = {
  className: undefined,
  groupId: null,
  group: {},
  posts: [],
  textValue: '',
  showSpinner: false,
  atRender: undefined,
  onBackClick: undefined,
  mobile: false
};
//# sourceMappingURL=index.js.map
