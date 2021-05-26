"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLogId = getLogId;
exports.conversationLogIdentityFunction = conversationLogIdentityFunction;

function getLogId(_ref) {
  var conversationId = _ref.conversationId,
      date = _ref.date;
  return "".concat(conversationId, "/").concat(date);
}

function conversationLogIdentityFunction(conversation) {
  return conversation.conversationLogId;
}
//# sourceMappingURL=conversationLoggerHelper.js.map