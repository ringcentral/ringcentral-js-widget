import callingOptions from 'ringcentral-integration/modules/CallingSettings/callingOptions';

export default {
  title: 'Appel',
  [callingOptions.softphone]: '{brand} pour ordinateur de bureau',
  [callingOptions.myphone]: 'Mon téléphone {brand}',
  [callingOptions.otherphone]: 'Autre téléphone',
  [callingOptions.customphone]: 'Téléphone habituel',
  makeCallsWith: 'Passer mes appels sortants avec',
  ringoutHint: 'Appeler d\'abord à mon emplacement, puis connecter le destinataire.',
  myLocationLabel: 'Mon emplacement',
  press1ToStartCallLabel: 'Me demander de composer le\xA01 avant d\'établir la connexion',
  [callingOptions.browser]: 'Navigateur',
  save: 'Enregistrer',
  [`${callingOptions.browser}Tooltip`]: 'Utilisez cette option pour passer et recevoir des appels en utilisant le microphone et le haut-parleur de votre ordinateur.',
  [`${callingOptions.softphone}Tooltip`]: 'Utilisez cette option pour passer et recevoir des appels à l\'aide de votre application de bureau {brand}.',
  [`${callingOptions.myphone}Tooltip`]: 'Utilisez cette option pour passer des appels à l\'aide de votre téléphone {brand}.',
  [`${callingOptions.myphone}Tooltip1`]: 'Pour l\'appel que vous passez, votre téléphone {brand} sonne d\'abord, suivi du groupe que vous avez appelé.',
  [`${callingOptions.otherphone}Tooltip`]: 'Utilisez cette option pour passer des appels à l\'aide de vos autres téléphones, tels que les téléphones personnels ou mobiles que vous avez ajoutés dans votre extension {brand}.',
  [`${callingOptions.otherphone}Tooltip1`]: 'Pour l\'appel que vous passez, ce téléphone sonne d\'abord, suivi du groupe que vous avez appelé.',
  [`${callingOptions.customphone}Tooltip`]: 'Utilisez cette option pour passer des appels à l\'aide du téléphone de votre choix en saisissant un numéro de téléphone correct dans le champ situé ci-dessous.',
  [`${callingOptions.customphone}Tooltip1`]: 'Pour l\'appel que vous passez, ce téléphone sonne d\'abord, suivi du groupe que vous avez appelé.',
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
