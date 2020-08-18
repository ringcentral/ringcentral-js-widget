"use strict";

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.array.find");

var _react = _interopRequireDefault(require("react"));

var _rcui = require("@ringcentral-integration/rcui");

var _enzyme = require("enzyme");

var _SessionConfigPanel = require("./SessionConfigPanel");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var wrapper;
var currentLocale = 'en-US';
var defaultSkillProfileList = [{
  profileId: '1001',
  profileName: 'Work',
  isDefault: '1',
  profileDesc: 'like to work'
}, {
  profileId: '1002',
  profileName: 'eat',
  isDefault: '1',
  profileDesc: 'fat man'
}, {
  profileId: '1003',
  profileName: 'play',
  isDefault: '1',
  profileDesc: 'like to work'
}];
var defaultLoginTypeList = [{
  label: 'externalPhone',
  id: '101'
}, {
  label: 'externalPhone2',
  id: '102'
}];

function setup(_ref) {
  var _ref$selectedSkillPro = _ref.selectedSkillProfileId,
      selectedSkillProfileId = _ref$selectedSkillPro === void 0 ? '1002' : _ref$selectedSkillPro,
      _ref$skillProfileList = _ref.skillProfileList,
      skillProfileList = _ref$skillProfileList === void 0 ? defaultSkillProfileList : _ref$skillProfileList,
      _ref$setSkillProfileI = _ref.setSkillProfileId,
      setSkillProfileId = _ref$setSkillProfileI === void 0 ? function () {} : _ref$setSkillProfileI,
      _ref$loginTypeList = _ref.loginTypeList,
      loginTypeList = _ref$loginTypeList === void 0 ? defaultLoginTypeList : _ref$loginTypeList,
      _ref$loginType = _ref.loginType,
      loginType = _ref$loginType === void 0 ? '102' : _ref$loginType,
      _ref$setLoginType = _ref.setLoginType,
      setLoginType = _ref$setLoginType === void 0 ? function () {} : _ref$setLoginType,
      _ref$extensionNumber = _ref.extensionNumber,
      extensionNumber = _ref$extensionNumber === void 0 ? '' : _ref$extensionNumber,
      _ref$setExtensionNumb = _ref.setExtensionNumber,
      setExtensionNumber = _ref$setExtensionNumb === void 0 ? function () {} : _ref$setExtensionNumb,
      _ref$setConfigure = _ref.setConfigure,
      setConfigure = _ref$setConfigure === void 0 ? function () {
    return null;
  } : _ref$setConfigure,
      _ref$inboundQueuesFie = _ref.inboundQueuesFieldText,
      inboundQueuesFieldText = _ref$inboundQueuesFie === void 0 ? '' : _ref$inboundQueuesFie,
      _ref$isLoading = _ref.isLoading,
      isLoading = _ref$isLoading === void 0 ? false : _ref$isLoading,
      _ref$isExtensionNumbe = _ref.isExtensionNumber,
      isExtensionNumber = _ref$isExtensionNumbe === void 0 ? false : _ref$isExtensionNumbe,
      _ref$resetFormGroup = _ref.resetFormGroup,
      resetFormGroup = _ref$resetFormGroup === void 0 ? function () {} : _ref$resetFormGroup,
      searchOption = _ref.searchOption,
      _ref$inboundQueues = _ref.inboundQueues,
      inboundQueues = _ref$inboundQueues === void 0 ? [] : _ref$inboundQueues,
      submitInboundQueues = _ref.submitInboundQueues,
      _ref$getAssignedInbou = _ref.getAssignedInboundQueues,
      getAssignedInboundQueues = _ref$getAssignedInbou === void 0 ? function () {
    return [];
  } : _ref$getAssignedInbou,
      _ref$isAllAssign = _ref.isAllAssign,
      isAllAssign = _ref$isAllAssign === void 0 ? function () {
    return true;
  } : _ref$isAllAssign,
      _ref$isSeveralAssign = _ref.isSeveralAssign,
      isSeveralAssign = _ref$isSeveralAssign === void 0 ? function () {
    return false;
  } : _ref$isSeveralAssign,
      checkBoxOnChange = _ref.checkBoxOnChange,
      allCheckBoxOnChange = _ref.allCheckBoxOnChange;
  return (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_rcui.RcThemeProvider, null, /*#__PURE__*/_react["default"].createElement(_SessionConfigPanel.SessionConfigPanel, {
    currentLocale: currentLocale,
    selectedSkillProfileId: selectedSkillProfileId,
    skillProfileList: skillProfileList,
    setSkillProfileId: setSkillProfileId,
    loginTypeList: loginTypeList,
    loginType: loginType,
    setLoginType: setLoginType,
    extensionNumber: extensionNumber,
    setExtensionNumber: setExtensionNumber,
    setConfigure: setConfigure,
    inboundQueuesFieldText: inboundQueuesFieldText,
    isExtensionNumber: isExtensionNumber,
    isLoading: isLoading // takingCall={takingCall}
    // setTakingCall={setTakingCall}
    // autoAnswer={autoAnswer}
    // setAutoAnswer={setAutoAnswer}
    ,
    searchOption: searchOption,
    inboundQueues: inboundQueues,
    submitInboundQueues: submitInboundQueues,
    getAssignedInboundQueues: getAssignedInboundQueues,
    isAllAssign: isAllAssign,
    isSeveralAssign: isSeveralAssign,
    checkBoxOnChange: checkBoxOnChange,
    allCheckBoxOnChange: allCheckBoxOnChange,
    resetFormGroup: resetFormGroup
  })));
}

var getConfigureButton = function getConfigureButton() {
  return wrapper.find('RcButton[data-sign="setConfigure"]').at(0).find('button');
};

afterEach( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          wrapper.unmount();

        case 1:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));
describe('<SessionConfigPanel />', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          it('When user click setConfigure Button, setConfigure is to be called', function () {
            var setConfigure = jest.fn();
            wrapper = setup({
              setConfigure: setConfigure
            });
            var configureButton = getConfigureButton();
            configureButton.simulate('click');
            expect(setConfigure).toBeCalled();
          });
          it('When loading, setConfigure Button is in loading state, and setConfigure cannot be fired', function () {
            var setConfigure = jest.fn();
            var isLoading = true;
            wrapper = setup({
              setConfigure: setConfigure,
              isLoading: isLoading
            });
            var configureButton = getConfigureButton();
            expect(configureButton.find('RcCircularProgress')).toHaveLength(1);
            expect(configureButton.prop('disabled')).toBe(isLoading);
            configureButton.simulate('click');
            expect(setConfigure).not.toBeCalled();
          });

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2);
})));
//# sourceMappingURL=SessionConfigPanel.spec.js.map
