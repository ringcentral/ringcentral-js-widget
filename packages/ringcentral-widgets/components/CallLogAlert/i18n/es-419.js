import callLogMessages from 'ringcentral-integration/enums/callLogMessages';
export default {
  [callLogMessages.logCallLogFailed]: "No se pudo cargar el registro de llamadas a causa de un error inesperado. Actualice la página y vuelva a intentarlo.",
  // New version of log failed message
  [callLogMessages.logFailed]: "Lo sentimos, se produjo un error al registrar su llamada."
};

// @key: @#@"[callLogMessages.logCallLogFailed]"@#@ @source: @#@"Failed to load call log form due to unexpected error. Please refresh the page and try again."@#@
// @key: @#@"[callLogMessages.logFailed]"@#@ @source: @#@"Sorry, we've failed to log your call. Please try again later."@#@
