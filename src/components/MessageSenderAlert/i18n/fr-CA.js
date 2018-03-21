import messageSenderMessages from 'ringcentral-integration/modules/MessageSender/messageSenderMessages';

export default {
  [messageSenderMessages.sendSuccess]: 'Envoi réussi.',
  [messageSenderMessages.sendError]: 'Une erreur est survenue lors de l\'envoi du message.',
  [messageSenderMessages.numberValidateError]: 'Erreur de validation du numéro de téléphone.',
  [messageSenderMessages.textEmpty]: 'Veuillez entrer le texte à envoyer.',
  [messageSenderMessages.noPermission]: 'Vous n\'êtes pas autorisé à envoyer des messages.',
  [messageSenderMessages.senderEmpty]: 'Vous devez sélectionner un numéro parmi les numéros de téléphone pour envoyer',
  [messageSenderMessages.recipientsEmpty]: 'Veuillez entrer un numéro de destinataire valide.',
  [messageSenderMessages.textTooLong]: 'Le texte est trop long, limite\xA0: 1\xA0000',
  [messageSenderMessages.noAreaCode]: 'Veuillez configurer {areaCodeLink} pour utiliser des numéros de téléphone locaux à 7\xA0chiffres.',
  [messageSenderMessages.connectFailed]: 'Échec de la connexion. Veuillez réessayer plus tard.',
  [messageSenderMessages.internalError]: 'Connexion impossible en raison d\'erreurs internes. Veuillez réessayer plus tard.',
  [messageSenderMessages.notAnExtension]: 'Le numéro de poste n\'existe pas.',
  [messageSenderMessages.networkError]: 'Connexion impossible en raison de problèmes de réseau. Veuillez réessayer plus tard.',
  [messageSenderMessages.notSmsToExtension]: 'Impossible d\'envoyer au numéro de poste avec le numéro de téléphone principal. Si vous souhaitez envoyer à un numéro de poste, veuillez simplement saisir ce numéro.',
  [messageSenderMessages.senderNumberInvalids]: 'Vous ne possédez pas un numéro de téléphone valide à partir duquel envoyer des textos. Veuillez communiquer avec votre administrateur de compte.',
  [messageSenderMessages.internationalSMSNotSupported]: 'L\'envoi de textos vers un numéro de téléphone international n\'est pas pris en charge.',
  areaCode: 'indicatif régional',
  [messageSenderMessages.senderNumberInvalid]: 'Un numéro de téléphone valide est requis pour envoyer des textos aux destinataires en dehors de votre entreprise. Veuillez communiquer avec votre administrateur pour ajouter un numéro direct à votre compte.',
};

// @key: @#@"[messageSenderMessages.sendSuccess]"@#@ @source: @#@"Send Success."@#@
// @key: @#@"[messageSenderMessages.sendError]"@#@ @source: @#@"Something wrong happened when send message."@#@
// @key: @#@"[messageSenderMessages.numberValidateError]"@#@ @source: @#@"Phone Number Validate Error."@#@
// @key: @#@"[messageSenderMessages.textEmpty]"@#@ @source: @#@"Please enter the text to be sent."@#@
// @key: @#@"[messageSenderMessages.noPermission]"@#@ @source: @#@"You have no permission to send message."@#@
// @key: @#@"[messageSenderMessages.senderEmpty]"@#@ @source: @#@"You must select a number from your phone numbers to send"@#@
// @key: @#@"[messageSenderMessages.noToNumber]"@#@ @source: @#@"Invalid phone number."@#@
// @key: @#@"[messageSenderMessages.recipientsEmpty]"@#@ @source: @#@"Please enter a valid receiver number."@#@
// @key: @#@"[messageSenderMessages.textTooLong]"@#@ @source: @#@"Text is too long, 1000 Limited"@#@
// @key: @#@"[messageSenderMessages.recipientNumberInvalids]"@#@ @source: @#@"Recipient number is invalids"@#@
// @key: @#@"[messageSenderMessages.noAreaCode]"@#@ @source: @#@"Please set {areaCodeLink} to use 7-digit local phone numbers."@#@
// @key: @#@"[messageSenderMessages.specialNumber]"@#@ @source: @#@"Dialing emergency or special service numbers is not supported."@#@
// @key: @#@"[messageSenderMessages.connectFailed]"@#@ @source: @#@"Connection failed. Please try again later."@#@
// @key: @#@"[messageSenderMessages.internalError]"@#@ @source: @#@"Cannot connect due to internal errors. Please try again later."@#@
// @key: @#@"[messageSenderMessages.notAnExtension]"@#@ @source: @#@"The extension number does not exist."@#@
// @key: @#@"[messageSenderMessages.networkError]"@#@ @source: @#@"Cannot connect due to network issues. Please try again later."@#@
// @key: @#@"[messageSenderMessages.senderNumberInvalid]"@#@ @source: @#@"A valid Phone Number is required to send text message to recipients outside of your company. Please contact your Administrator to add a direct number to your account."@#@
// @key: @#@"[messageSenderMessages.notSmsToExtension]"@#@ @source: @#@"Cannot send To a extension number with main phone number. If you want to sent to a extension Number, please just enter extension Number."@#@
// @key: @#@"[messageSenderMessages.internationalSMSNotSupported]"@#@ @source: @#@"Sending SMS to international phone number is not supported."@#@
// @key: @#@"areaCode"@#@ @source: @#@"area code"@#@
