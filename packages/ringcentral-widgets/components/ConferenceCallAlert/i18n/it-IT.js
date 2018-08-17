import conferenceCallErrors from 'ringcentral-integration/modules/ConferenceCall/conferenceCallErrors';

export default {
  [conferenceCallErrors.bringInFailed]: "Impossibile unire le chiamate a causa di errori imprevisti. Riprova più tardi.",
  [conferenceCallErrors.makeConferenceFailed]: "Impossibile unire le chiamate a causa di errori imprevisti. Riprova più tardi.",
  [conferenceCallErrors.terminateConferenceFailed]: "Impossibile chiudere la conferenza a causa di errori imprevisti. Riprova più tardi.",
  [conferenceCallErrors.removeFromConferenceFailed]: "Impossibile rimuovere il partecipante a causa di errori imprevisti. Riprova più tardi."
};

// @key: @#@"[conferenceCallErrors.bringInFailed]"@#@ @source: @#@"Failed to merge the calls due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.makeConferenceFailed]"@#@ @source: @#@"Failed to merge the calls due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.terminateConferenceFailed]"@#@ @source: @#@"Failed to hangup the conference due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.removeFromConferenceFailed]"@#@ @source: @#@"Failed to remove the participant due to unexpected errors. Please try again later."@#@
