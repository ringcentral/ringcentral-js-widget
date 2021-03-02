"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfirmDeleteModal = ConfirmDeleteModal;
exports.ClickToDialButton = ClickToDialButton;
exports.ClickToSmsButton = ClickToSmsButton;
exports.DeleteButton = DeleteButton;
exports.MarkButton = MarkButton;
exports.PreviewButton = PreviewButton;
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("regenerator-runtime/runtime");

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _messageTypes = _interopRequireDefault(require("ringcentral-integration/enums/messageTypes"));

var _extensionTypes = require("ringcentral-integration/enums/extensionTypes");

var _DynamicsFont = _interopRequireDefault(require("../../assets/DynamicsFont/DynamicsFont.scss"));

var _DeleteMessageIcon = _interopRequireDefault(require("../../assets/images/DeleteMessageIcon.svg"));

var _Download = _interopRequireDefault(require("../../assets/images/Download.svg"));

var _Mark = _interopRequireDefault(require("../../assets/images/Mark.svg"));

var _Preview = _interopRequireDefault(require("../../assets/images/Preview.svg"));

var _Unmark = _interopRequireDefault(require("../../assets/images/Unmark.svg"));

var _Button = require("../Button");

var _EntityButton = _interopRequireDefault(require("../EntityButton"));

var _EntityModal = _interopRequireDefault(require("../EntityModal"));

var _LogButton = _interopRequireDefault(require("../LogButton"));

var _Modal = _interopRequireDefault(require("../Modal"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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

function ConfirmDeleteModal(_ref) {
  var currentLocale = _ref.currentLocale,
      show = _ref.show,
      onDelete = _ref.onDelete,
      onCancel = _ref.onCancel,
      type = _ref.type;
  var tip;

  if (type === _messageTypes["default"].fax) {
    tip = _i18n["default"].getString('sureToDeleteFax', currentLocale);
  } else {
    tip = _i18n["default"].getString('sureToDeleteVoiceMail', currentLocale);
  }

  return /*#__PURE__*/_react["default"].createElement(_Modal["default"], {
    show: show,
    currentLocale: currentLocale,
    onConfirm: onDelete,
    onCancel: onCancel
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].contentText
  }, tip));
}

ConfirmDeleteModal.propTypes = {
  currentLocale: _propTypes["default"].string.isRequired,
  show: _propTypes["default"].bool.isRequired,
  onDelete: _propTypes["default"].func,
  onCancel: _propTypes["default"].func,
  type: _propTypes["default"].string
};
ConfirmDeleteModal.defaultProps = {
  onDelete: function onDelete() {},
  onCancel: function onCancel() {},
  type: undefined
};

function ClickToDialButton(_ref2) {
  var className = _ref2.className,
      onClickToDial = _ref2.onClickToDial,
      disableLinks = _ref2.disableLinks,
      disableCallButton = _ref2.disableCallButton,
      disableClickToDial = _ref2.disableClickToDial,
      phoneNumber = _ref2.phoneNumber,
      title = _ref2.title;
  return /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    className: (0, _classnames["default"])(_styles["default"].button, _styles["default"].clickToDialButton, className),
    onClick: onClickToDial,
    dataSign: title,
    disabled: disableCallButton || disableClickToDial || !phoneNumber
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: _DynamicsFont["default"].call,
    title: title
  }));
}

ClickToDialButton.propTypes = {
  className: _propTypes["default"].string,
  onClickToDial: _propTypes["default"].func,
  disableLinks: _propTypes["default"].bool,
  disableCallButton: _propTypes["default"].bool,
  disableClickToDial: _propTypes["default"].bool,
  phoneNumber: _propTypes["default"].string,
  title: _propTypes["default"].string
};
ClickToDialButton.defaultProps = {
  className: undefined,
  onClickToDial: undefined,
  disableLinks: false,
  disableCallButton: false,
  disableClickToDial: false,
  phoneNumber: undefined,
  title: undefined
};

function ClickToSmsButton(_ref3) {
  var className = _ref3.className,
      onClickToSms = _ref3.onClickToSms,
      disableLinks = _ref3.disableLinks,
      phoneNumber = _ref3.phoneNumber,
      title = _ref3.title;
  return /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    className: (0, _classnames["default"])(_styles["default"].button, _styles["default"].clickToSmsButton, className),
    onClick: onClickToSms,
    dataSign: "clickToSms",
    disabled: disableLinks || !phoneNumber
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: _DynamicsFont["default"].composeText,
    title: title
  }));
}

ClickToSmsButton.propTypes = {
  className: _propTypes["default"].string,
  onClickToSms: _propTypes["default"].func,
  disableLinks: _propTypes["default"].bool,
  phoneNumber: _propTypes["default"].string,
  title: _propTypes["default"].string
};
ClickToSmsButton.defaultProps = {
  className: undefined,
  onClickToSms: undefined,
  disableLinks: false,
  phoneNumber: undefined,
  title: undefined
};

function DeleteButton(_ref4) {
  var className = _ref4.className,
      title = _ref4.title,
      openDeleteModal = _ref4.openDeleteModal,
      disabled = _ref4.disabled;
  return /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    className: (0, _classnames["default"])(_styles["default"].button, _styles["default"].svgBtn, className),
    onClick: openDeleteModal,
    disabled: disabled,
    dataSign: title
  }, /*#__PURE__*/_react["default"].createElement("span", {
    title: title
  }, /*#__PURE__*/_react["default"].createElement(_DeleteMessageIcon["default"], {
    width: 14,
    height: 17,
    className: (0, _classnames["default"])(_styles["default"].svgFillIcon, disabled ? _styles["default"].disabled : null)
  })));
}

DeleteButton.propTypes = {
  className: _propTypes["default"].string,
  title: _propTypes["default"].string,
  openDeleteModal: _propTypes["default"].func,
  disabled: _propTypes["default"].bool.isRequired
};
DeleteButton.defaultProps = {
  className: undefined,
  title: undefined,
  openDeleteModal: function openDeleteModal() {}
};

function MarkButton(_ref5) {
  var marked = _ref5.marked,
      className = _ref5.className,
      onClick = _ref5.onClick,
      markTitle = _ref5.markTitle,
      unmarkTitle = _ref5.unmarkTitle,
      disabled = _ref5.disabled;
  var Icon = marked ? _Unmark["default"] : _Mark["default"];
  var title = marked ? unmarkTitle : markTitle;
  var classNames = (0, _classnames["default"])(_styles["default"].unmarked, marked ? _styles["default"].svgFillIcon : null, disabled ? _styles["default"].disabled : null);
  return /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    className: (0, _classnames["default"])(_styles["default"].button, _styles["default"].svgBtn, className),
    onClick: onClick,
    disabled: disabled,
    dataSign: "mark"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    title: title
  }, /*#__PURE__*/_react["default"].createElement(Icon, {
    width: 14,
    height: 17,
    title: title,
    className: classNames
  })));
}

MarkButton.propTypes = {
  className: _propTypes["default"].string,
  markTitle: _propTypes["default"].string,
  unmarkTitle: _propTypes["default"].string,
  onClick: _propTypes["default"].func.isRequired,
  marked: _propTypes["default"].bool.isRequired,
  disabled: _propTypes["default"].bool.isRequired
};
MarkButton.defaultProps = {
  className: undefined,
  markTitle: undefined,
  unmarkTitle: undefined
};

function PreviewButton(_ref6) {
  var title = _ref6.title,
      onClick = _ref6.onClick,
      disabled = _ref6.disabled,
      className = _ref6.className;
  return /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    className: (0, _classnames["default"])(_styles["default"].button, _styles["default"].svgBtn, className),
    onClick: onClick,
    disabled: disabled
  }, /*#__PURE__*/_react["default"].createElement("span", {
    title: title
  }, /*#__PURE__*/_react["default"].createElement(_Preview["default"], {
    className: (0, _classnames["default"])(_styles["default"].svgFillIcon, disabled ? _styles["default"].disabled : null)
  })));
}

PreviewButton.propTypes = {
  title: _propTypes["default"].string.isRequired,
  onClick: _propTypes["default"].func.isRequired,
  disabled: _propTypes["default"].bool.isRequired,
  className: _propTypes["default"].string
};
PreviewButton.defaultProps = {
  className: undefined
};

var ActionMenuList = /*#__PURE__*/function (_Component) {
  _inherits(ActionMenuList, _Component);

  var _super = _createSuper(ActionMenuList);

  function ActionMenuList(props) {
    var _this;

    _classCallCheck(this, ActionMenuList);

    _this = _super.call(this, props);

    _this.onCreateEnityModal = function (entityType) {
      _this.props.onCreateEntity(entityType);

      _this.closeEntityModal();
    };

    _this.onCancelEntityModal = function () {
      _this.closeEntityModal();
    };

    _this.openEntityModal = function () {
      _this.setState({
        entityModalVisible: true
      });
    };

    _this.closeEntityModal = function () {
      _this.setState({
        entityModalVisible: false
      });
    };

    _this.onDelete = function () {
      _this.props.onDelete();

      _this.setState({
        disableDelete: true
      });

      _this.onCloseDeleteModal();
    };

    _this.openDeleteModal = function () {
      _this.setState({
        deleteModalVisible: true
      });
    };

    _this.onCloseDeleteModal = function () {
      _this.setState({
        deleteModalVisible: false
      });
    };

    _this.onCancelDelete = function () {
      _this.onCloseDeleteModal();
    };

    _this.preventEventPropogation = function (e) {
      if (e.target !== e.currentTarget) {
        e.stopPropagation();
      }
    };

    _this.onPreview = function () {
      if (_this.props.faxAttachment && _this.props.faxAttachment.uri) {
        _this.props.onPreview(_this.props.faxAttachment.uri);
      }
    };

    _this._onDownloadClick = function (e) {
      var _this$props = _this.props,
          faxAttachment = _this$props.faxAttachment,
          onFaxDownload = _this$props.onFaxDownload,
          disableLinks = _this$props.disableLinks;

      if (disableLinks) {
        e.preventDefault();
      }

      if (onFaxDownload) {
        e.preventDefault();
        onFaxDownload({
          uri: faxAttachment.uri
        });
      }
    };

    _this.state = {
      entityModalVisible: false,
      deleteModalVisible: false,
      disableDelete: false,
      marking: false
    };
    _this.onMark = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var _this$props2, marked, onUnmark, onMark, onClick;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!_this.state.marking) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return");

            case 2:
              _this.setState({
                marking: true
              });

              _this$props2 = _this.props, marked = _this$props2.marked, onUnmark = _this$props2.onUnmark, onMark = _this$props2.onMark;
              onClick = marked ? onUnmark : onMark;
              _context.prev = 5;
              _context.next = 8;
              return onClick();

            case 8:
              _context.next = 12;
              break;

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](5);

            case 12:
              _this.setState({
                marking: false
              });

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[5, 10]]);
    }));
    return _this;
  }

  _createClass(ActionMenuList, [{
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          className = _this$props3.className,
          type = _this$props3.type,
          currentLocale = _this$props3.currentLocale,
          onLog = _this$props3.onLog,
          isLogged = _this$props3.isLogged,
          isLogging = _this$props3.isLogging,
          onViewEntity = _this$props3.onViewEntity,
          onCreateEntity = _this$props3.onCreateEntity,
          createEntityTypes = _this$props3.createEntityTypes,
          hasEntity = _this$props3.hasEntity,
          onClickToDial = _this$props3.onClickToDial,
          onClickToSms = _this$props3.onClickToSms,
          phoneNumber = _this$props3.phoneNumber,
          disableLinks = _this$props3.disableLinks,
          disableCallButton = _this$props3.disableCallButton,
          disableClickToDial = _this$props3.disableClickToDial,
          addLogTitle = _this$props3.addLogTitle,
          editLogTitle = _this$props3.editLogTitle,
          callTitle = _this$props3.callTitle,
          textTitle = _this$props3.textTitle,
          createEntityTitle = _this$props3.createEntityTitle,
          viewEntityTitle = _this$props3.viewEntityTitle,
          onDelete = _this$props3.onDelete,
          deleteTitle = _this$props3.deleteTitle,
          onMark = _this$props3.onMark,
          marked = _this$props3.marked,
          markTitle = _this$props3.markTitle,
          unmarkTitle = _this$props3.unmarkTitle,
          previewTitle = _this$props3.previewTitle,
          downloadTitle = _this$props3.downloadTitle,
          onPreview = _this$props3.onPreview,
          faxAttachment = _this$props3.faxAttachment,
          externalViewEntity = _this$props3.externalViewEntity,
          externalHasEntity = _this$props3.externalHasEntity,
          disableClickToSms = _this$props3.disableClickToSms,
          selectedMatchContactType = _this$props3.selectedMatchContactType;
      var _this$state = this.state,
          deleteModalVisible = _this$state.deleteModalVisible,
          disableDelete = _this$state.disableDelete;
      var logButton = onLog ? /*#__PURE__*/_react["default"].createElement(_LogButton["default"], {
        className: _styles["default"].button,
        onLog: onLog,
        disableLinks: disableLinks,
        isLogged: isLogged,
        isLogging: isLogging,
        currentLocale: currentLocale,
        addTitle: addLogTitle,
        editTitle: editLogTitle
      }) : null;
      var isIvrContact = selectedMatchContactType === _extensionTypes.extensionTypes.ivrMenu;
      var entityButton;

      if (externalViewEntity) {
        if (externalHasEntity) {
          entityButton = /*#__PURE__*/_react["default"].createElement(_EntityButton["default"], {
            className: _styles["default"].button,
            onViewEntity: externalViewEntity,
            hasEntity: externalHasEntity,
            disableLinks: disableLinks,
            viewEntityTitle: viewEntityTitle
          });
        } else if (phoneNumber && onCreateEntity) {
          entityButton = /*#__PURE__*/_react["default"].createElement(_EntityButton["default"], {
            className: _styles["default"].button,
            onCreateEntity: this.openEntityModal,
            hasEntity: externalHasEntity,
            disableLinks: disableLinks,
            createEntityTitle: createEntityTitle
          });
        } else {
          entityButton = null;
        }
      } else if (hasEntity && onViewEntity && !isIvrContact) {
        entityButton = /*#__PURE__*/_react["default"].createElement(_EntityButton["default"], {
          className: _styles["default"].button,
          onViewEntity: onViewEntity,
          hasEntity: hasEntity,
          disableLinks: disableLinks,
          viewEntityTitle: viewEntityTitle
        });
      } else if (!hasEntity && phoneNumber && onCreateEntity) {
        entityButton = /*#__PURE__*/_react["default"].createElement(_EntityButton["default"], {
          className: _styles["default"].button,
          onCreateEntity: this.openEntityModal,
          hasEntity: hasEntity,
          disableLinks: disableLinks,
          createEntityTitle: createEntityTitle
        });
      } else {
        entityButton = null;
      }

      var entityModal = !hasEntity && phoneNumber ? /*#__PURE__*/_react["default"].createElement(_EntityModal["default"], {
        currentLocale: currentLocale,
        entities: createEntityTypes,
        show: this.state.entityModalVisible,
        onCreate: this.onCreateEnityModal,
        onCancel: this.onCancelEntityModal
      }) : null;
      var clickToDialButton = onClickToDial ? /*#__PURE__*/_react["default"].createElement(ClickToDialButton, {
        onClickToDial: onClickToDial,
        phoneNumber: phoneNumber,
        disableLinks: disableLinks,
        disableCallButton: disableLinks || disableCallButton,
        disableClickToDial: disableClickToDial,
        currentLocale: currentLocale,
        title: callTitle
      }) : null;
      var clickToSmsButton = onClickToSms ? /*#__PURE__*/_react["default"].createElement(ClickToSmsButton, {
        onClickToSms: onClickToSms,
        phoneNumber: phoneNumber,
        disableLinks: disableLinks || disableClickToSms,
        currentLocale: currentLocale,
        title: textTitle
      }) : null;
      var deleteButton = onDelete ? /*#__PURE__*/_react["default"].createElement(DeleteButton, {
        onDelete: onDelete,
        currentLocale: currentLocale,
        title: deleteTitle,
        openDeleteModal: this.openDeleteModal,
        disabled: disableDelete || disableLinks
      }) : null;
      var confirmDeleteModal = onDelete ? /*#__PURE__*/_react["default"].createElement(ConfirmDeleteModal, {
        currentLocale: currentLocale,
        show: deleteModalVisible,
        onDelete: this.onDelete,
        onCancel: this.onCancelDelete,
        type: type
      }) : null;
      var markButton = onMark ? /*#__PURE__*/_react["default"].createElement(MarkButton, {
        markTitle: markTitle,
        unmarkTitle: unmarkTitle,
        marked: marked,
        onClick: this.onMark,
        disabled: disableLinks
      }) : null;
      var previewButton = onPreview && faxAttachment && faxAttachment.uri ? /*#__PURE__*/_react["default"].createElement(PreviewButton, {
        title: previewTitle,
        onClick: this.onPreview,
        disabled: disableLinks
      }) : null;
      var downloadButton = faxAttachment && faxAttachment.uri ? /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])(_styles["default"].button, _styles["default"].svgBtn, _styles["default"].svgFillIcon, disableLinks ? _styles["default"].disabled : null)
      }, /*#__PURE__*/_react["default"].createElement("a", {
        target: "_blank",
        download: true,
        title: downloadTitle,
        href: "".concat(faxAttachment.uri, "&contentDisposition=Attachment"),
        onClick: this._onDownloadClick,
        disabled: disableLinks
      }, /*#__PURE__*/_react["default"].createElement(_Download["default"], {
        width: 18,
        height: 18
      }))) : null;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])(_styles["default"].root, className),
        onClick: this.preventEventPropogation
      }, clickToDialButton, clickToSmsButton, previewButton, downloadButton, entityButton, logButton, markButton, deleteButton, entityModal, confirmDeleteModal);
    }
  }]);

  return ActionMenuList;
}(_react.Component);

exports["default"] = ActionMenuList;
ActionMenuList.propTypes = {
  className: _propTypes["default"].string,
  type: _propTypes["default"].string,
  currentLocale: _propTypes["default"].string.isRequired,
  onLog: _propTypes["default"].func,
  isLogged: _propTypes["default"].bool,
  isLogging: _propTypes["default"].bool,
  onViewEntity: _propTypes["default"].func,
  onCreateEntity: _propTypes["default"].func,
  createEntityTypes: _propTypes["default"].array,
  hasEntity: _propTypes["default"].bool,
  onClickToDial: _propTypes["default"].func,
  onClickToSms: _propTypes["default"].func,
  phoneNumber: _propTypes["default"].string,
  disableLinks: _propTypes["default"].bool,
  disableCallButton: _propTypes["default"].bool,
  disableClickToDial: _propTypes["default"].bool,
  addLogTitle: _propTypes["default"].string,
  editLogTitle: _propTypes["default"].string,
  textTitle: _propTypes["default"].string,
  callTitle: _propTypes["default"].string,
  createEntityTitle: _propTypes["default"].string,
  viewEntityTitle: _propTypes["default"].string,
  onDelete: _propTypes["default"].func,
  deleteTitle: _propTypes["default"].string,
  onMark: _propTypes["default"].func,
  onUnmark: _propTypes["default"].func,
  marked: _propTypes["default"].bool,
  markTitle: _propTypes["default"].string,
  unmarkTitle: _propTypes["default"].string,
  previewTitle: _propTypes["default"].string,
  downloadTitle: _propTypes["default"].string,
  onPreview: _propTypes["default"].func,
  faxAttachment: _propTypes["default"].shape({
    uri: _propTypes["default"].string
  }),
  externalViewEntity: _propTypes["default"].func,
  externalHasEntity: _propTypes["default"].bool,
  disableClickToSms: _propTypes["default"].bool,
  onFaxDownload: _propTypes["default"].func,
  selectedMatchContactType: _propTypes["default"].string
};
ActionMenuList.defaultProps = {
  className: undefined,
  type: undefined,
  onLog: undefined,
  isLogged: false,
  isLogging: false,
  onViewEntity: undefined,
  onCreateEntity: undefined,
  createEntityTypes: undefined,
  hasEntity: false,
  onClickToDial: undefined,
  onClickToSms: undefined,
  phoneNumber: undefined,
  disableLinks: false,
  disableCallButton: false,
  disableClickToDial: false,
  addLogTitle: undefined,
  editLogTitle: undefined,
  textTitle: undefined,
  callTitle: undefined,
  createEntityTitle: undefined,
  viewEntityTitle: undefined,
  deleteTitle: undefined,
  onDelete: undefined,
  onMark: undefined,
  onUnmark: undefined,
  marked: false,
  markTitle: undefined,
  unmarkTitle: undefined,
  previewTitle: undefined,
  downloadTitle: undefined,
  onPreview: undefined,
  faxAttachment: undefined,
  externalViewEntity: undefined,
  externalHasEntity: undefined,
  disableClickToSms: false,
  onFaxDownload: undefined,
  selectedMatchContactType: ''
};
//# sourceMappingURL=index.js.map
