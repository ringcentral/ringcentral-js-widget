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
