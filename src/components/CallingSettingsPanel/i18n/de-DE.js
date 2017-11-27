import callingOptions from 'ringcentral-integration/modules/CallingSettings/callingOptions';

export default {
  title: 'Anrufen',
  [callingOptions.softphone]: '{brand} für Desktop',
  [callingOptions.myphone]: 'Meinem {brand}-Telefon',
  [callingOptions.otherphone]: 'Anderem Telefon',
  [callingOptions.customphone]: 'Benutzerdefiniertem Telefon',
  makeCallsWith: 'Anrufe ausführen mit',
  ringoutHint: 'Zunächst am Standort anklingeln, dann Verbindung zum Anrufempfänger herstellen',
  myLocationLabel: 'Mein Standort',
  press1ToStartCallLabel: 'Vor dem Verbinden des Anrufs zum Wählen von "1" auffordern',
  [callingOptions.browser]: 'Browser',
  save: 'Speichern',
  [`${callingOptions.browser}Tooltip`]: 'Verwenden Sie diese Option, um Anrufe über das Mikrofon und die Lautsprecher Ihres Computers zu tätigen und entgegenzunehmen.',
  [`${callingOptions.softphone}Tooltip`]: 'Verwenden Sie diese Option, um Anrufe über die {brand} für Desktop-App zu tätigen und entgegenzunehmen.',
  [`${callingOptions.myphone}Tooltip`]: 'Verwenden Sie diese Option, um Anrufe über Ihr {brand}-Telefon zu tätigen und entgegenzunehmen.',
  [`${callingOptions.myphone}Tooltip1`]: 'Wenn Sie einen Anruf tätigen, klingelt zuerst Ihr {brand}-Telefon und dann das Telefon des Anrufempfängers.',
  [`${callingOptions.otherphone}Tooltip`]: 'Verwenden Sie diese Option, um Anrufe über Ihre anderen Telefone wie Festnetztelefone oder Mobiltelefone, die Sie der {brand}-Erweiterung hinzugefügt haben, zu tätigen.',
  [`${callingOptions.otherphone}Tooltip1`]: 'Wenn Sie einen Anruf tätigen, klingelt zuerst dieses Telefon und dann das Telefon des Anrufempfängers.',
  [`${callingOptions.customphone}Tooltip`]: 'Verwenden Sie diese Option, um Anrufe über ein Telefon Ihrer Wahl zu tätigen, indem Sie eine gültige Telefonnummer in das Feld unten eingeben.',
  [`${callingOptions.customphone}Tooltip1`]: 'Wenn Sie einen Anruf tätigen, klingelt zuerst dieses Telefon und dann das Telefon des Anrufempfängers.',
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
