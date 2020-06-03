"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UTWhenCallTransfering = exports.UTTransferCallButtonDisabled = exports.UTSetStayOnCall = exports.UTSetStayOnCallCases = exports.UTUserClickCallRecipient = exports.UTUserClickCallRecipientCases = exports.UTCheckBackButton = exports.UTCheckTransferCallRender = exports.UTCheckTransferCallRenderCases = void 0;

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.find");

var _react = _interopRequireDefault(require("react"));

var _rcui = require("@ringcentral-integration/rcui");

var _enzyme = require("enzyme");

var _TransferCallPanel = require("./TransferCallPanel");

var _transferTypes = require("../../enums/transferTypes");

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var currentLocale = 'en-US';
var defaultTransferOptions = [{
  type: _transferTypes.transferTypes.phoneBook,
  label: _i18n["default"].getString(_transferTypes.transferTypes.phoneBook, currentLocale),
  router: "/activityCallLog/123456789/transferCall/phoneBook",
  textFields: [{
    label: _i18n["default"].getString('callRecipientName', currentLocale),
    placeholder: _i18n["default"].getString('callRecipientNamePlaceholder', currentLocale),
    value: '',
    disabled: false
  }, {
    label: _i18n["default"].getString('callRecipientNumber', currentLocale),
    placeholder: _i18n["default"].getString('callRecipientNumberPlaceholder', currentLocale),
    value: '',
    disabled: true
  }]
}, {
  type: _transferTypes.transferTypes.manualEntry,
  label: _i18n["default"].getString(_transferTypes.transferTypes.manualEntry, currentLocale),
  router: "/activityCallLog/123456789/transferCall/manualEntry",
  textFields: [{
    label: _i18n["default"].getString('phoneNumber', currentLocale),
    placeholder: _i18n["default"].getString('enterThePhoneNumberPlaceholder', currentLocale),
    value: '',
    disabled: false
  }]
}, {
  type: _transferTypes.transferTypes.internal,
  label: _i18n["default"].getString(_transferTypes.transferTypes.internal, currentLocale),
  router: "/activityCallLog/123456789/transferCall/internal",
  textFields: [{
    label: _i18n["default"].getString('callRecipientName', currentLocale),
    placeholder: _i18n["default"].getString('callRecipientNamePlaceholder', currentLocale),
    value: '',
    disabled: false
  }]
}];
var defaultTextFields = defaultTransferOptions[0].textFields;

function setup(_ref) {
  var _ref$currentLocale = _ref.currentLocale,
      currentLocale = _ref$currentLocale === void 0 ? 'en-US' : _ref$currentLocale,
      _ref$goBack = _ref.goBack,
      goBack = _ref$goBack === void 0 ? function () {} : _ref$goBack,
      _ref$clickCallRecipie = _ref.clickCallRecipient,
      clickCallRecipient = _ref$clickCallRecipie === void 0 ? function () {} : _ref$clickCallRecipie,
      _ref$transferring = _ref.transferring,
      transferring = _ref$transferring === void 0 ? false : _ref$transferring,
      _ref$clickTransferTyp = _ref.clickTransferTypeFiled,
      clickTransferTypeFiled = _ref$clickTransferTyp === void 0 ? function () {} : _ref$clickTransferTyp,
      _ref$setStayOnCall = _ref.setStayOnCall,
      setStayOnCall = _ref$setStayOnCall === void 0 ? function () {} : _ref$setStayOnCall,
      _ref$isStayOnCall = _ref.isStayOnCall,
      isStayOnCall = _ref$isStayOnCall === void 0 ? false : _ref$isStayOnCall,
      _ref$transferOptions = _ref.transferOptions,
      transferOptions = _ref$transferOptions === void 0 ? defaultTransferOptions : _ref$transferOptions,
      _ref$selectedTransfer = _ref.selectedTransferType,
      selectedTransferType = _ref$selectedTransfer === void 0 ? _transferTypes.transferTypes.phoneBook : _ref$selectedTransfer,
      _ref$textFields = _ref.textFields,
      textFields = _ref$textFields === void 0 ? defaultTextFields : _ref$textFields,
      _ref$transferCallDisa = _ref.transferCallDisabled,
      transferCallDisabled = _ref$transferCallDisa === void 0 ? false : _ref$transferCallDisa,
      _ref$transferCall = _ref.transferCall,
      transferCall = _ref$transferCall === void 0 ? function () {} : _ref$transferCall,
      _ref$setCancelTemplat = _ref.setCancelTemplate,
      setCancelTemplate = _ref$setCancelTemplat === void 0 ? function () {} : _ref$setCancelTemplat,
      _ref$cancelTransfer = _ref.cancelTransfer,
      cancelTransfer = _ref$cancelTransfer === void 0 ? function () {} : _ref$cancelTransfer,
      _ref$cancelTransferPa = _ref.cancelTransferPage,
      cancelTransferPage = _ref$cancelTransferPa === void 0 ? function () {} : _ref$cancelTransferPa;
  return (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_rcui.RcThemeProvider, null, /*#__PURE__*/_react["default"].createElement(_TransferCallPanel.TransferCallPanel, {
    currentLocale: currentLocale,
    goBack: goBack,
    clickCallRecipient: clickCallRecipient,
    transferring: transferring,
    clickTransferTypeFiled: clickTransferTypeFiled,
    setStayOnCall: setStayOnCall,
    isStayOnCall: isStayOnCall,
    transferOptions: transferOptions,
    selectedTransferType: selectedTransferType,
    textFields: textFields,
    transferCallDisabled: transferCallDisabled,
    transferCall: transferCall,
    setCancelTemplate: setCancelTemplate,
    cancelTransfer: cancelTransfer,
    cancelTransferPage: cancelTransferPage
  })));
}

var getTransferCallButton = function getTransferCallButton(wrapper) {
  return wrapper.find('RcButton[data-sign="transferCall"]').at(0).find('button');
};

var UTCheckTransferCallRenderCases = [{
  title: 'Can display transferType, callRecipient correctly, and can click to change TransferType',
  selectedTransferType: _transferTypes.transferTypes.internal,
  transferOptions: defaultTransferOptions
}, {
  title: 'Can display transferType, callRecipient correctly, and can click to change TransferType',
  selectedTransferType: _transferTypes.transferTypes.phoneBook,
  transferOptions: defaultTransferOptions
}, {
  title: 'Can display transferType, callRecipient correctly, and can click to change TransferType',
  selectedTransferType: _transferTypes.transferTypes.manualEntry,
  transferOptions: defaultTransferOptions
}];
exports.UTCheckTransferCallRenderCases = UTCheckTransferCallRenderCases;

var UTCheckTransferCallRender = function UTCheckTransferCallRender(_ref2) {
  var selectedTransferType = _ref2.selectedTransferType,
      transferOptions = _ref2.transferOptions;
  var clickTransferTypeFiled = jest.fn(function () {});
  var wrapper = setup({
    transferOptions: transferOptions,
    selectedTransferType: selectedTransferType,
    clickTransferTypeFiled: clickTransferTypeFiled
  });

  var _ref3 = transferOptions.find(function (option) {
    return option.type === selectedTransferType;
  }) || {},
      _ref3$textFields = _ref3.textFields,
      textFields = _ref3$textFields === void 0 ? [] : _ref3$textFields;

  textFields.forEach(function (textField, index) {
    expect(wrapper.find("RcTextField[data-sign=\"callRecipient".concat(index, "\"]")).prop('value')).toBe(textField.value);
  });
  var transferTypePickList = wrapper.find('PickList[data-sign="transferType"]');
  expect(transferTypePickList.prop('value')).toBe(selectedTransferType);
  transferTypePickList.find('[role="button"]').simulate('click');
  var menuItems = document.body.querySelectorAll('[role="presentation"] li[role="option"]');
  expect(menuItems).toHaveLength(transferOptions.length);
  document.body.querySelector("li[data-value=\"".concat(selectedTransferType, "\"]")).click();
  expect(clickTransferTypeFiled).toBeCalledWith(selectedTransferType);
  wrapper.unmount();
};

exports.UTCheckTransferCallRender = UTCheckTransferCallRender;

var UTCheckBackButton = function UTCheckBackButton() {
  var goBack = jest.fn(function () {});
  var wrapper = setup({
    goBack: goBack
  });
  wrapper.find('[data-sign="backButton"]').at(0).find('button').simulate('click');
  expect(goBack).toBeCalled();
};

exports.UTCheckBackButton = UTCheckBackButton;
var UTUserClickCallRecipientCases = [{
  title: 'User can click callRecipient field to change callRecipient',
  selectedTransferType: _transferTypes.transferTypes.internal
}, {
  title: 'User can click callRecipient field to change callRecipient',
  selectedTransferType: _transferTypes.transferTypes.phoneBook
}, {
  title: 'User can click callRecipient field to change callRecipient',
  selectedTransferType: _transferTypes.transferTypes.manualEntry
}];
exports.UTUserClickCallRecipientCases = UTUserClickCallRecipientCases;

var UTUserClickCallRecipient = function UTUserClickCallRecipient(_ref4) {
  var selectedTransferType = _ref4.selectedTransferType;
  var clickCallRecipient = jest.fn(function () {});
  var wrapper = setup({
    clickCallRecipient: clickCallRecipient,
    selectedTransferType: selectedTransferType
  });
  var callRecipient = wrapper.find('RcTextField[data-sign="callRecipient0"]');
  callRecipient.find('input').at(0).simulate('click');
  expect(clickCallRecipient).toBeCalledWith(selectedTransferType);
};

exports.UTUserClickCallRecipient = UTUserClickCallRecipient;
var UTSetStayOnCallCases = [{
  title: 'When StayOnCall, click the StayOnCall, setStayOnCall will be called',
  isStayOnCall: true
}, {
  title: 'When not StayOnCall, click the StayOnCall, setStayOnCall will be called',
  isStayOnCall: false
}];
exports.UTSetStayOnCallCases = UTSetStayOnCallCases;

var UTSetStayOnCall = function UTSetStayOnCall(_ref5) {
  var isStayOnCall = _ref5.isStayOnCall;
  var setStayOnCall = jest.fn(function () {});
  var wrapper = setup({
    setStayOnCall: setStayOnCall,
    isStayOnCall: isStayOnCall
  });
  var checkbox = wrapper.find('span[data-sign="stayOnCall"]').at(0).find('input[type="checkbox"]').at(0);
  expect(checkbox.prop('checked')).toBe(isStayOnCall);
  checkbox.simulate('click');
  expect(setStayOnCall).toBeCalledWith(isStayOnCall);
  wrapper.unmount();
};

exports.UTSetStayOnCall = UTSetStayOnCall;

var UTTransferCallButtonDisabled = function UTTransferCallButtonDisabled() {
  var transferCall = jest.fn(function () {});
  var wrapper = setup({
    transferCallDisabled: true,
    transferCall: transferCall
  });
  var transferCallButton = getTransferCallButton(wrapper);
  expect(transferCallButton.prop('disabled')).toBe(true);
  transferCallButton.simulate('click');
  expect(transferCall).not.toBeCalled();
};

exports.UTTransferCallButtonDisabled = UTTransferCallButtonDisabled;

var UTWhenCallTransfering = function UTWhenCallTransfering() {
  var transferring = true;
  var wrapper = setup({
    transferring: transferring
  });
  expect(getTransferCallButton(wrapper).find('RcCircularProgress').length).toBe(1);
};

exports.UTWhenCallTransfering = UTWhenCallTransfering;
//# sourceMappingURL=TransferCallPanel.ut.js.map
