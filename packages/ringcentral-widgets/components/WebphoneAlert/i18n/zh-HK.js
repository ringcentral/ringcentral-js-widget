import webphoneErrors from 'ringcentral-integration/modules/Webphone/webphoneErrors';

export default {
  [webphoneErrors.connectFailed]: "與網路電話伺服器的連線失敗。",
  [webphoneErrors.connected]: "網路電話已註冊。",
  [webphoneErrors.browserNotSupported]: "僅支援在 Chrome 上使用瀏覽器撥號。",
  [webphoneErrors.webphoneCountOverLimit]: "可註冊最多 5 支網路電話。",
  [webphoneErrors.notOutboundCallWithoutDL]: "您的分機目前不允許使用瀏覽器進行撥出通話，請聯絡您的帳戶代表進行升級。",
  [webphoneErrors.getSipProvisionError]: "您沒有傳送訊息的權限。",
  [webphoneErrors.toVoiceMailError]: "因為發生內部錯誤，無法將通話傳送到語音信箱",
  [webphoneErrors.muteError]: "目前無法靜音。",
  [webphoneErrors.holdError]: "目前無法保留。",
  [webphoneErrors.flipError]: "無法轉接通話。請稍後再試一次。",
  [webphoneErrors.recordError]: "目前無法對通話進行錄音。錯誤代碼：{errorCode}",
  [webphoneErrors.recordDisabled]: "抱歉，您的帳戶並不具進行通話錄音的功能。請聯絡您的帳戶管理員。",
  [webphoneErrors.transferError]: "無法轉接通話。請稍後再試一次。",
  webphoneUnavailable: "{error}。我們正在重新連線至伺服器。若錯誤持續存在，請將這個錯誤回報至 {brandName} 支援部門。",
  errorCode: "內部錯誤代碼：{errorCode}",
  occurs: "發生內部錯誤"
};

// @key: @#@"[webphoneErrors.connectFailed]"@#@ @source: @#@"Connect with web phone server failed."@#@
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
