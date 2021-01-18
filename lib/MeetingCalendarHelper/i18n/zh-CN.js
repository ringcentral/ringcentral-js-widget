"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  inviteMeetingContent: "{accountName}正在邀请您参加 {brandName} 会议。\n\n通过 PC、Mac、iOS、Android 加入：{joinUri}{passwordTpl}\n\n或通过 iPhone 一键加入：\n\t{mobileDialingNumberTpl}\n\n或使用电话：\n\t拨号：{phoneDialingNumberTpl}\n\t会议 ID：{meetingId}\n\t可用的国际号码：{teleconference} ",
  rcvInviteMeetingContent: "{accountName}邀请您参加 {brandName} 会议。\n\n请使用以下链接加入：\n\t{joinUri}{passwordTpl}",
  rcvRCBrandInviteMeetingContent: "{accountName} 邀请您参加 {productName} 会议。\n\n请使用此链接加入：\n\t{joinUri}{passwordTpl}",
  rcvInviteMeetingContentDial: "\n\n在智能手机上点击一下加入仅音频会议：\n\t{smartphones}\n\n或拨打：\n\t拨打：{dialNumber}\n\t访问代码/会议 ID：{pinNumber} ",
  rcvInviteMeetingContentCountryDial: "\n\n在智能手机上点按一下加入仅音频会议：\n\t{smartphones}\n\n或拨打：\n\t{dialNumber}\n\t访问码/会议 ID：{pinNumber} ",
  rcvTeleconference: "\n\n可用的国际号码： {teleconference} ",
  doNotModify: "===== 请勿修改此文本 =====",
  password: "\n\n密码",
  passwordPstn: "\n\n拨入密码:"
}; // @key: @#@"inviteMeetingContent"@#@ @source: @#@"{accountName} is inviting you to a {brandName} meeting.\n\nJoin from PC, Mac, iOS or Android: {joinUri}{passwordTpl}\n\nOr iPhone one-tap:\n\t{mobileDialingNumberTpl}\n\nOr Telephone:\n\tDial: {phoneDialingNumberTpl}\n\tMeeting ID: {meetingId}\n\tInternational numbers available: {teleconference} "@#@
// @key: @#@"rcvInviteMeetingContent"@#@ @source: @#@"{accountName} has invited you to a {brandName} Meeting.\n\nPlease join using this link:\n\t{joinUri}{passwordTpl}"@#@
// @key: @#@"rcvRCBrandInviteMeetingContent"@#@ @source: @#@"{accountName} has invited you to a {productName} meeting.\n\nPlease join using this link:\n\t{joinUri}{passwordTpl}"@#@
// @key: @#@"rcvInviteMeetingContentDial"@#@ @source: @#@"\n\nOne tap to join audio only from a smartphone:\n\t{smartphones}\n\nOr dial:\n\tDial: {dialNumber}\n\tAccess Code / Meeting ID: {pinNumber} "@#@
// @key: @#@"rcvInviteMeetingContentCountryDial"@#@ @source: @#@"\n\nOne tap to join audio only from a smartphone:\n\t{smartphones}\n\nOr dial:\n\t{dialNumber}\n\tAccess Code / Meeting ID: {pinNumber} "@#@
// @key: @#@"rcvTeleconference"@#@ @source: @#@"\n\nInternational numbers available: {teleconference} "@#@
// @key: @#@"doNotModify"@#@ @source: @#@"===== Do not modify this text ====="@#@
// @key: @#@"password"@#@ @source: @#@"\n\nPassword"@#@
// @key: @#@"passwordPstn"@#@ @source: @#@"\n\nDial-in password:"@#@

exports["default"] = _default;
//# sourceMappingURL=zh-CN.js.map
