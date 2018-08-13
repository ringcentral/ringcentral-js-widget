import webphoneErrors from 'ringcentral-integration/modules/Webphone/webphoneErrors';

export default {
  [webphoneErrors.connected]: "Das Webtelefon wurde registriert.",
  [webphoneErrors.browserNotSupported]: "Das Tätigen von Anrufen über den Browser wird nur in Chrome unterstützt.",
  [webphoneErrors.webphoneCountOverLimit]: "Maximal fünf Webtelefone können registriert werden.",
  [webphoneErrors.notOutboundCallWithoutDL]: "Ihre Durchwahl ist aktuell nicht dazu berechtigt, ausgehende Anrufe über den Browser zu tätigen. Wenden Sie sich bitte an Ihren Kontoadministrator, um ein Upgrade zu erhalten.",
  [webphoneErrors.getSipProvisionError]: "Sie verfügen über keine Berechtigung zum Senden von Nachrichten.",
  [webphoneErrors.toVoiceMailError]: "Der Anruf konnte wegen eines internen Fehlers nicht an die Voicemail geleitet werden.",
  [webphoneErrors.muteError]: "Der Anruf kann im Moment nicht stummgeschaltet werden.",
  [webphoneErrors.holdError]: "Der Anruf kann im Moment nicht gehalten werden.",
  [webphoneErrors.flipError]: "Der Anruf kann nicht umgelegt werden. Versuchen Sie es später erneut.",
  [webphoneErrors.recordError]: "Sie können den Anruf gegenwärtig nicht aufzeichnen. Fehlercode: {errorCode}",
  [webphoneErrors.recordDisabled]: "Ihr Konto verfügt über keine Funktion zum Aufzeichnen von Anrufen. Wenden Sie sich an Ihren Kontoadministrator.",
  [webphoneErrors.transferError]: "Der Anruf kann nicht weitergeleitet werden. Versuchen Sie es später erneut.",
  webphoneUnavailable: "{error}. Wir stellen erneut eine Verbindung zum Server her. Sollte der Fehler weiterhin bestehen, melden Sie ihn an den {brandName}-Support.",
  errorCode: "Interner Fehlercode: {errorCode}",
  occurs: "Ein interner Fehler tritt auf."
};

// @key: @#@"[webphoneErrors.connected]"@#@ @source: @#@"Web phone registered."@#@
// @key: @#@"[webphoneErrors.browserNotSupported]"@#@ @source: @#@"Calling with browser is only supported on Chrome."@#@
// @key: @#@"[webphoneErrors.webphoneCountOverLimit]"@#@ @source: @#@"A maximum of 5 web phones could be registered."@#@
// @key: @#@"[webphoneErrors.notOutboundCallWithoutDL]"@#@ @source: @#@"Your extension is not allowed to make outbound calls with browser currently, please contact your account representative for an upgrade."@#@
// @key: @#@"[webphoneErrors.getSipProvisionError]"@#@ @source: @#@"You have no permission to send message."@#@
// @key: @#@"[webphoneErrors.toVoiceMailError]"@#@ @source: @#@"Cannot send call to voicemail due to internal error"@#@
// @key: @#@"[webphoneErrors.muteError]"@#@ @source: @#@"Call cannot be muted at the moment."@#@
// @key: @#@"[webphoneErrors.holdError]"@#@ @source: @#@"Call cannot be hold at the moment."@#@
// @key: @#@"[webphoneErrors.flipError]"@#@ @source: @#@"Cannot flip the call. Please try again later."@#@
// @key: @#@"[webphoneErrors.recordError]"@#@ @source: @#@"You cannot record the call at the moment. Error code: {errorCode}"@#@
// @key: @#@"[webphoneErrors.recordDisabled]"@#@ @source: @#@"Sorry, your account does not have the feature to record a call. Please contact your account administrator."@#@
// @key: @#@"[webphoneErrors.transferError]"@#@ @source: @#@"Cannot transfer the call. Please try again later."@#@
// @key: @#@"webphoneUnavailable"@#@ @source: @#@"{error}. We are reconnecting to server. If the error persists, please report this error to {brandName} Support."@#@
// @key: @#@"errorCode"@#@ @source: @#@"Internal error code: {errorCode}"@#@
// @key: @#@"occurs"@#@ @source: @#@"Internal error occurs"@#@
