import callingOptions from 'ringcentral-integration/modules/CallingSettings/callingOptions';

export default {
  title: '通話',
  save: '保存',
  [callingOptions.softphone]: '{brand} for Desktop',
  [callingOptions.myphone]: '自分の{brand}電話',
  [callingOptions.otherphone]: 'その他の電話',
  [callingOptions.customphone]: 'カスタム電話',
  [callingOptions.browser]: 'ブラウザー',
  makeCallsWith: '通話発信に使用する電話',
  ringoutHint: '最初に自分の場所で自身を呼び出した後\u3001通話相手に接続する',
  myLocationLabel: '自分の場所',
  press1ToStartCallLabel: '通話接続前に\u300C1\u300Dをダイヤルするように指示するメッセージを受け取る',
  [`${callingOptions.browser}Tooltip`]: '通話の発着信にコンピューターのマイクロフォンとスピーカーを使用するには\u3001このオプションを使用します\u3002',
  [`${callingOptions.softphone}Tooltip`]: '通話の発着信に{brand} for Desktopアプリを使用するには\u3001このオプションを使用します\u3002',
  [`${callingOptions.myphone}Tooltip`]: '{brand}電話を使用して電話をかけるには\u3001このオプションを使用します\u3002',
  [`${callingOptions.myphone}Tooltip1`]: '電話をかけた場合\u3001最初に自分の{brand}電話が鳴ってから\u3001通話相手の電話が鳴ります\u3002',
  [`${callingOptions.otherphone}Tooltip`]: '{brand}の内線に追加した自宅電話や携帯電話など\u3001他の電話を使用して電話をかけるには\u3001このオプションを使用します\u3002',
  [`${callingOptions.otherphone}Tooltip1`]: '電話をかけた場合\u3001最初にこの電話が鳴ってから\u3001通話相手の電話が鳴ります\u3002',
  [`${callingOptions.customphone}Tooltip`]: '以下のフィールドに有効な電話番号を入力することで任意の電話を使用して電話をかけるには\u3001このオプションを使用します\u3002',
  [`${callingOptions.customphone}Tooltip1`]: '電話をかけた場合\u3001最初にこの電話が鳴ってから\u3001通話相手の電話が鳴ります\u3002',
};

// @key: @#@"title"@#@ @source: @#@"Calling"@#@
// @key: @#@"[callingOptions.softphone]"@#@ @source: @#@"{brand} for Desktop"@#@
// @key: @#@"[callingOptions.myphone]"@#@ @source: @#@"My {brand} Phone"@#@
// @key: @#@"[callingOptions.otherphone]"@#@ @source: @#@"Other Phone"@#@
// @key: @#@"[callingOptions.customphone]"@#@ @source: @#@"Custom Phone"@#@
// @key: @#@"[callingOptions.browser]"@#@ @source: @#@"Browser"@#@
// @key: @#@"makeCallsWith"@#@ @source: @#@"Make my calls with"@#@
// @key: @#@"ringoutHint"@#@ @source: @#@"Ring me at my location first, then connect the called party"@#@
// @key: @#@"myLocationLabel"@#@ @source: @#@"My Location"@#@
// @key: @#@"press1ToStartCallLabel"@#@ @source: @#@"Prompt me to dial 1 before connecting the call"@#@
// @key: @#@"[`${callingOptions.browser}Tooltip`]"@#@ @source: @#@"Use this option to make and receive calls using your computer’s microphone and speaker."@#@
// @key: @#@"[`${callingOptions.softphone}Tooltip`]"@#@ @source: @#@"Use this option to make and receive calls using your {brand} for Desktop app."@#@
// @key: @#@"[`${callingOptions.myphone}Tooltip`]"@#@ @source: @#@"Use this option to make calls using your {brand} phone."@#@
// @key: @#@"[`${callingOptions.myphone}Tooltip1`]"@#@ @source: @#@"For the call you make, your {brand} phone will ring first then the party you called."@#@
// @key: @#@"[`${callingOptions.otherphone}Tooltip`]"@#@ @source: @#@"Use this option to make calls using your other phones such as home or cell phones that you have added in your {brand} Extension."@#@
// @key: @#@"[`${callingOptions.otherphone}Tooltip1`]"@#@ @source: @#@"For the call you make, this phone will ring first then the party you called."@#@
// @key: @#@"[`${callingOptions.customphone}Tooltip`]"@#@ @source: @#@"Use this option to make calls using any phone of your choice by entering a valid phone number in the field below."@#@
// @key: @#@"[`${callingOptions.customphone}Tooltip1`]"@#@ @source: @#@"For the call you make, this phone will ring first then the party you called."@#@
