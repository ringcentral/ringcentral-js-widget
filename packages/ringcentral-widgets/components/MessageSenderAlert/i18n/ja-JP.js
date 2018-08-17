import messageSenderMessages from 'ringcentral-integration/modules/MessageSender/messageSenderMessages';

export default {
  [messageSenderMessages.sendSuccess]: "送信が成功しました。",
  [messageSenderMessages.sendError]: "メッセージの送信時に問題が発生しました。",
  [messageSenderMessages.numberValidateError]: "電話番号の検証エラー。",
  [messageSenderMessages.textEmpty]: "送信するテキストを入力してください。",
  [messageSenderMessages.noPermission]: "メッセージを送信するためのアクセス許可がありません。",
  [messageSenderMessages.senderEmpty]: "お使いの電話番号から送信用の電話番号を選択してください。",
  [messageSenderMessages.noToNumber]: "有効な電話番号を入力してください。",
  [messageSenderMessages.recipientsEmpty]: "有効な受信者番号を入力してください。",
  [messageSenderMessages.textTooLong]: "テキストが長すぎます。上限は1,000文字です",
  [messageSenderMessages.multipartTextTooLong]: "テキストが長すぎます。上限は5,000文字です",
  [messageSenderMessages.recipientNumberInvalids]: "有効な電話番号を入力してください。",
  [messageSenderMessages.noAreaCode]: "7桁の国内電話番号を使用するには、{areaCodeLink}を設定してください。",
  [messageSenderMessages.specialNumber]: "緊急サービスまたは特別なサービスの番号へのテキストの送信はサポートされていません。",
  [messageSenderMessages.connectFailed]: "接続に失敗しました。後でもう一度やり直してください。",
  [messageSenderMessages.internalError]: "内部エラーにより、接続できません。後でもう一度やり直してください。",
  [messageSenderMessages.notAnExtension]: "この内線番号は存在しません。",
  [messageSenderMessages.networkError]: "ネットワークの問題により、接続できません。後でもう一度やり直してください。",
  [messageSenderMessages.senderNumberInvalid]: "社外の受信者にテキストメッセージを送信するには、有効な電話番号が必要です。管理者に連絡して、ダイレクトナンバーをアカウントに追加してください。",
  [messageSenderMessages.notSmsToExtension]: "代表電話番号が付いた内線番号に送信することはできません。内線番号に送信する場合は、内線番号だけを入力してください。",
  [messageSenderMessages.internationalSMSNotSupported]: "国際電話番号へのSMS送信はサポートされていません。",
  [messageSenderMessages.noInternalSMSPermission]: "メッセージを送信するためのアクセス許可がありません。アップグレードについて{brand}アカウント管理者にお問い合わせください。",
  [messageSenderMessages.noSMSPermission]: "組織外部の受信者にメッセージを送信するためのアクセス許可がありません。",
  areaCode: "市外局番",
  [messageSenderMessages.sending]: "メッセージを送信しています…完了するまで数分かかる場合があります。"
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
