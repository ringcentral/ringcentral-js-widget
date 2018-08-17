import messageSenderMessages from 'ringcentral-integration/modules/MessageSender/messageSenderMessages';

export default {
  [messageSenderMessages.sendSuccess]: "傳送成功。",
  [messageSenderMessages.sendError]: "傳送訊息時發生錯誤。",
  [messageSenderMessages.numberValidateError]: "電話號碼驗證錯誤。",
  [messageSenderMessages.textEmpty]: "請輸入要傳送的簡訊文字。",
  [messageSenderMessages.noPermission]: "您沒有傳送訊息的權限。",
  [messageSenderMessages.senderEmpty]: "您必須從電話號碼中選擇一個號碼以進行傳送",
  [messageSenderMessages.noToNumber]: "請輸入有效的電話號碼。",
  [messageSenderMessages.recipientsEmpty]: "請輸入有效的接收者號碼。",
  [messageSenderMessages.textTooLong]: "文字過長，限 1000 個",
  [messageSenderMessages.multipartTextTooLong]: "文字過長，限 5000 個",
  [messageSenderMessages.recipientNumberInvalids]: "請輸入有效的電話號碼。",
  [messageSenderMessages.noAreaCode]: "請設定讓 {areaCodeLink} 使用 7 位數的本地電話號碼。",
  [messageSenderMessages.specialNumber]: "不支援傳送文字簡訊至緊急/特別服務號碼。",
  [messageSenderMessages.connectFailed]: "連線失敗。請稍後再試一次。",
  [messageSenderMessages.internalError]: "因為內部錯誤導致無法連線。請稍後再試一次。",
  [messageSenderMessages.notAnExtension]: "分機號碼不存在。",
  [messageSenderMessages.networkError]: "因為網路問題導致無法連線。請稍後再試一次。",
  [messageSenderMessages.senderNumberInvalid]: "需要用到有效的電話號碼，才能將文字訊息傳送至您公司外的收件者，請聯絡您的管理員，為您的帳戶加入直撥號碼。",
  [messageSenderMessages.notSmsToExtension]: "無法使用主要電話號碼傳送至分機號碼。若您希望傳送至分機號碼，請僅輸入分機號碼。",
  [messageSenderMessages.internationalSMSNotSupported]: "不支援對國際電話號碼傳送簡訊。",
  [messageSenderMessages.noInternalSMSPermission]: "您沒有寄送訊息的權限。請聯絡您的 {brand} 帳戶管理員進行升級。",
  [messageSenderMessages.noSMSPermission]: "您沒有向組織以外之收件者寄送訊息的權限。",
  areaCode: "區碼",
  [messageSenderMessages.sending]: "訊息傳送中…可能需要一些時間來完成。"
};

// @key: @#@"[messageSenderMessages.sendSuccess]"@#@ @source: @#@"Send Success."@#@
// @key: @#@"[messageSenderMessages.sendError]"@#@ @source: @#@"Something wrong happened when send message."@#@
// @key: @#@"[messageSenderMessages.numberValidateError]"@#@ @source: @#@"Phone Number Validate Error."@#@
// @key: @#@"[messageSenderMessages.textEmpty]"@#@ @source: @#@"Please enter the text to be sent."@#@
// @key: @#@"[messageSenderMessages.noPermission]"@#@ @source: @#@"You have no permission to send message."@#@
// @key: @#@"[messageSenderMessages.senderEmpty]"@#@ @source: @#@"You must select a number from your phone numbers to send"@#@
// @key: @#@"[messageSenderMessages.noToNumber]"@#@ @source: @#@"Please enter a valid phone number."@#@
// @key: @#@"[messageSenderMessages.recipientsEmpty]"@#@ @source: @#@"Please enter a valid receiver number."@#@
// @key: @#@"[messageSenderMessages.textTooLong]"@#@ @source: @#@"Text is too long, 1000 Limited"@#@
// @key: @#@"[messageSenderMessages.multipartTextTooLong]"@#@ @source: @#@"Text is too long, 5000 Limited"@#@
// @key: @#@"[messageSenderMessages.recipientNumberInvalids]"@#@ @source: @#@"Please enter a valid phone number."@#@
// @key: @#@"[messageSenderMessages.noAreaCode]"@#@ @source: @#@"Please set {areaCodeLink} to use 7-digit local phone numbers."@#@
// @key: @#@"[messageSenderMessages.specialNumber]"@#@ @source: @#@"Sending text to emergency/special service numbers is not supported."@#@
// @key: @#@"[messageSenderMessages.connectFailed]"@#@ @source: @#@"Connection failed. Please try again later."@#@
// @key: @#@"[messageSenderMessages.internalError]"@#@ @source: @#@"Cannot connect due to internal errors. Please try again later."@#@
// @key: @#@"[messageSenderMessages.notAnExtension]"@#@ @source: @#@"The extension number does not exist."@#@
// @key: @#@"[messageSenderMessages.networkError]"@#@ @source: @#@"Cannot connect due to network issues. Please try again later."@#@
// @key: @#@"[messageSenderMessages.senderNumberInvalid]"@#@ @source: @#@"A valid Phone Number is required to send text message to recipients outside of your company, Please contact your Administrator to add a direct number to your account."@#@
// @key: @#@"[messageSenderMessages.notSmsToExtension]"@#@ @source: @#@"Cannot send To a extension number with main phone number. If you want to sent to a extension Number, please just enter extension Number."@#@
// @key: @#@"[messageSenderMessages.internationalSMSNotSupported]"@#@ @source: @#@"Sending SMS to international phone number is not supported."@#@
// @key: @#@"[messageSenderMessages.noInternalSMSPermission]"@#@ @source: @#@"You don't have permission to send messages. Please contact your {brand} account administrator for upgrade."@#@
// @key: @#@"[messageSenderMessages.noSMSPermission]"@#@ @source: @#@"You don't have permission to send messages to recipients outside of your organization."@#@
// @key: @#@"areaCode"@#@ @source: @#@"area code"@#@
// @key: @#@"[messageSenderMessages.sending]"@#@ @source: @#@"Message being sent…It may take a couple of minutes to complete."@#@
