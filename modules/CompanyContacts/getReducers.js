"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDataReducer = getDataReducer;
exports.getShowDisabledReducer = getShowDisabledReducer;
exports.getShowNotActivatedReducer = getShowNotActivatedReducer;
exports.getExtensionTypeFiltersReducer = getExtensionTypeFiltersReducer;
exports.getTimestampReducer = getTimestampReducer;

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.is-array");

var _ramda = require("ramda");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function getDataReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var _ref = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref.type,
        data = _ref.data,
        contact = _ref.contact;

    switch (type) {
      case types.fetchSuccess:
        return data;

      case types.upsert:
        return [].concat(_toConsumableArray((0, _ramda.reject)(function (item) {
          return item.id === contact.id;
        }, state)), [contact]);

      case types.delete:
        return (0, _ramda.reject)(function (item) {
          return item.id === contact.id;
        }, state);

      case types.resetSuccess:
        return [];

      default:
        return state;
    }
  };
}

function getShowDisabledReducer(types) {
  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultValue;

    var _ref2 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref2.type,
        showDisabled = _ref2.showDisabled;

    switch (type) {
      case types.setShowDisabled:
        return showDisabled;

      default:
        return state;
    }
  };
}

function getShowNotActivatedReducer(types) {
  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultValue;

    var _ref3 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref3.type,
        showNotActivated = _ref3.showNotActivated;

    switch (type) {
      case types.setShowNotActivated:
        return showNotActivated;

      default:
        return state;
    }
  };
}

function getExtensionTypeFiltersReducer(types) {
  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _toConsumableArray(defaultValue);

    var _ref4 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref4.type,
        typeFilters = _ref4.typeFilters;

    switch (type) {
      case types.setExtensionTypeFilters:
        return typeFilters;

      default:
        return state;
    }
  };
}

function getTimestampReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var _ref5 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref5.type,
        timestamp = _ref5.timestamp;

    switch (type) {
      case types.fetchSuccess:
      case types.upsert:
      case types.delete:
        return timestamp;

      case types.resetSuccess:
        return null;

      default:
        return state;
    }
  };
}
//# sourceMappingURL=getReducers.js.map
