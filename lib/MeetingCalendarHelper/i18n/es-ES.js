"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  inviteMeetingContent: "{accountName} le está invitando a una reunión de {brandName}.\n\nÚnase desde un PC, Mac, Linux, iOS o Android: {joinUri}{passwordTpl}\n\nO desde un iPhone con un solo toque:\n\t{mobileDialingNumberTpl}\n\nO desde un teléfono:\n\tMarque: {phoneDialingNumberTpl}\n\tID de reunión: {meetingId}\n\tNúmeros internacionales disponibles: {teleconference} ",
  rcvInviteMeetingContent: "{accountName} le ha invitado a una reunión de {brandName}.\n\nPuede unirse mediante este enlace:\n\t{joinUri}{passwordTpl}",
  rcvRCBrandInviteMeetingContent: "{accountName} le invita a una reunión de {productName}.\n\nPuede unirse mediante este enlace: \n\t{joinUri}{passwordTpl}",
  rcvInviteMeetingContentDial: "\n\nPulse una vez para unirse solo al audio desde un smartphone:\n\t{smartphones}\n\nO marque:\n\tMarcar: {dialNumber}\n\tPIN: {pinNumber}{passwordPstnTpl} ",
  rcvTeleconference: "\n\nNúmeros internacionales disponibles: {teleconference} ",
  doNotModify: "===== No modifique este texto =====",
  password: "\n\nContraseña"
}; // @key: @#@"inviteMeetingContent"@#@ @source: @#@"{accountName} is inviting you to a {brandName} meeting.\n\nJoin from PC, Mac, iOS or Android: {joinUri}{passwordTpl}\n\nOr iPhone one-tap:\n\t{mobileDialingNumberTpl}\n\nOr Telephone:\n\tDial: {phoneDialingNumberTpl}\n\tMeeting ID: {meetingId}\n\tInternational numbers available: {teleconference} "@#@
// @key: @#@"rcvInviteMeetingContent"@#@ @source: @#@"{accountName} has invited you to a {brandName} Meeting.\n\nPlease join using this link:\n\t{joinUri}{passwordTpl}"@#@
// @key: @#@"rcvRCBrandInviteMeetingContent"@#@ @source: @#@"{accountName} has invited you to a {productName} meeting.\n\nPlease join using this link:\n\t{joinUri}{passwordTpl}"@#@
// @key: @#@"rcvInviteMeetingContentDial"@#@ @source: @#@"\n\nOne tap to join audio only from a smartphone:\n\t{smartphones}\n\nOr dial:\n\tDial: {dialNumber}\n\tPIN: {pinNumber}{passwordPstnTpl} "@#@
// @key: @#@"rcvTeleconference"@#@ @source: @#@"\n\nInternational numbers available: {teleconference} "@#@
// @key: @#@"doNotModify"@#@ @source: @#@"===== Do not modify this text ====="@#@
// @key: @#@"password"@#@ @source: @#@"\n\nPassword"@#@

exports["default"] = _default;
//# sourceMappingURL=es-ES.js.map
