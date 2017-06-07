import callingSettingsMessages from
  'ringcentral-integration/modules/CallingSettings/callingSettingsMessages';

export default {
  [callingSettingsMessages.saveSuccess]: 'Impostazioni salvate correttamente.',
  [callingSettingsMessages.saveSuccessWithSoftphone]: 'Impostazioni salvate correttamente. Assicurati che {brand} per il desktop sia installato nel computer.',
  [callingSettingsMessages.firstLogin]: 'Nella sezione Chiamata specifica come desideri effettuare la chiamata.\n    Se lo desideri, rendici nota la tua posizione specificando il paese e il prefisso (se disponibile) nella sezione Regione, in modo da poter effettuare chiamate locali con l\'app.',
  [callingSettingsMessages.firstLoginOther]: 'Nella sezione Chiamata specifica come desideri effettuare la chiamata.',
  [callingSettingsMessages.permissionChanged]: 'Le tue autorizzazioni sono state modificate di recente. Vai a {link} per verificare le opzioni di chiamata.',
  [callingSettingsMessages.phoneNumberChanged]: 'Le informazioni sul numero di telefono sono state modificate di recente. Vai a {link} per verificare le opzioni di chiamata.',
  link: 'Impostazioni > Chiamata',
  [callingSettingsMessages.webphonePermissionRemoved]: 'Le tue autorizzazioni sono state modificate e non consentono di effettuare chiamate con il browser. Per maggiori dettagli contatta l\'amministratore del tuo account.',
  [callingSettingsMessages.emergencyCallingNotAvailable]: 'Le chiamate a servizi di emergenza o speciali non sono supportate. In caso di emergenza, usa la linea fissa convenzionale o un telefono wireless per chiamare un servizio di emergenza.',
};
