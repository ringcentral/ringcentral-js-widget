import { connect } from 'react-redux';
import formatNumber from 'ringcentral-integration/lib/formatNumber';
import callingModes from 'ringcentral-integration/modules/CallingSettings/callingModes';
import { withPhone } from '../../lib/phoneContext';

import ActiveCallsPanel from '../../components/ActiveCallsPanel';

function mapToProps(_, {
  phone: {
    brand,
    callLogger,
    callMonitor,
    locale,
    regionSettings,
    rolesAndPermissions,
    conferenceCall,
    callingSettings,
  },
  showContactDisplayPlaceholder = false,
  useV2,
}) {
  const isWebRTC = callingSettings.callingMode === callingModes.webphone;

  return {
    currentLocale: locale.currentLocale,
    activeRingCalls: callMonitor.activeRingCalls,
    activeOnHoldCalls: callMonitor.activeOnHoldCalls,
    activeCurrentCalls: callMonitor.activeCurrentCalls,
    otherDeviceCalls: callMonitor.otherDeviceCalls,
    areaCode: regionSettings.areaCode,
    countryCode: regionSettings.countryCode,
    outboundSmsPermission: !!(
      rolesAndPermissions.permissions &&
      rolesAndPermissions.permissions.OutboundSMS
    ),
    internalSmsPermission: !!(
      rolesAndPermissions.permissions &&
      rolesAndPermissions.permissions.InternalSMS
    ),
    showSpinner: !!(conferenceCall && conferenceCall.isMerging),
    brand: brand.fullName,
    showContactDisplayPlaceholder,
    autoLog: !!(callLogger && callLogger.autoLog),
    isWebRTC,
    conferenceCallParties: conferenceCall ? conferenceCall.partyProfiles : null,
    useV2,
  };
}

function mapToFunctions(_, {
  phone: {
    callLogger,
    composeText,
    contactMatcher,
    contactSearch,
    regionSettings,
    routerInteraction,
    webphone,
    callingSettings,
    conferenceCall,
  },
  composeTextRoute = '/composeText',
  callCtrlRoute = '/calls/active',
  onCreateContact,
  onLogCall,
  isLoggedContact,
  onCallsEmpty,
  onViewContact,
  showViewContact = true,
  getAvatarUrl,
  useV2,
}) {
  return {
    formatPhone(phoneNumber) {
      return formatNumber({
        phoneNumber,
        areaCode: regionSettings.areaCode,
        countryCode: regionSettings.countryCode,
      });
    },
    async webphoneAnswer(...args) {
      return (webphone && webphone.answer(...args));
    },
    async webphoneToVoicemail(...args) {
      return (webphone && webphone.toVoiceMail(...args));
    },
    async webphoneReject(...args) {
      return (webphone && webphone.reject(...args));
    },
    async webphoneHangup(...args) {
      const sessionId = args && args[0];
      const mergingPair = conferenceCall && conferenceCall.mergingPair;
      if (mergingPair &&
          (Object.values(mergingPair).indexOf(sessionId) !== -1)
      ) {
        // close merging pair to close the merge call.
        conferenceCall.closeMergingPair();
      }

      return (webphone && webphone.hangup(...args));
    },
    async webphoneResume(...args) {
      if (!webphone) {
        return;
      }

      const sessionId = args && args[0];
      const mergingPair = conferenceCall && conferenceCall.mergingPair;
      if (mergingPair && sessionId !== mergingPair.toSessionId) {
        // close merging pair to close the merge call.
        conferenceCall.closeMergingPair();
      }

      await webphone.resume(...args);
      if (routerInteraction.currentPath !== callCtrlRoute && !useV2) {
        routerInteraction.push(callCtrlRoute);
      }
    },
    async webphoneHold(...args) {
      return (webphone && webphone.hold(...args));
    },
    onViewContact: showViewContact ?
      (onViewContact || (({ contact }) => {
        const { id, type } = contact;
        routerInteraction.push(`/contacts/${type}/${id}?direct=true`);
      })) : null,
    onClickToSms: composeText ?
      async (contact, isDummyContact = false) => {
        if (routerInteraction) {
          routerInteraction.push(composeTextRoute);
        }
        composeText.clean();
        if (contact.name && contact.phoneNumber && isDummyContact) {
          composeText.updateTypingToNumber(contact.name);
          contactSearch.search({ searchString: contact.name });
        } else {
          composeText.addToRecipients(contact);
        }
      } :
      undefined,
    onCreateContact: onCreateContact ?
      async ({ phoneNumber, name, entityType }) => {
        const hasMatchNumber = await contactMatcher.hasMatchNumber({
          phoneNumber,
          ignoreCache: true
        });
        if (!hasMatchNumber) {
          await onCreateContact({ phoneNumber, name, entityType });
          await contactMatcher.forceMatchNumber({ phoneNumber });
        }
      } :
      undefined,
    isLoggedContact,
    onLogCall: onLogCall ||
      (callLogger && (async ({ call, contact, redirect = true }) => {
        await callLogger.logCall({
          call,
          contact,
          redirect,
        });
      })),
    onCallsEmpty: onCallsEmpty || (() => {
      const isWebRTC = callingSettings.callingMode === callingModes.webphone;

      if (isWebRTC && !webphone.sessions.length) {
        routerInteraction.push('/dialer');
      }
    }),
    isSessionAConferenceCall(sessionId) {
      return !!(
        conferenceCall
        && conferenceCall.isConferenceSession(sessionId)
      );
    },
    onCallItemClick(call) {
      if (call.webphoneSession && call.webphoneSession.id) {
        routerInteraction.push(`${callCtrlRoute}/${call.webphoneSession.id}`);
      }
    },
    getAvatarUrl,
    updateSessionMatchedContact: (sessionId, contact) => (
      webphone.updateSessionMatchedContact(sessionId, contact)
    ),
  };
}

const ActiveCallsPage = withPhone(connect(
  mapToProps,
  mapToFunctions,
)(ActiveCallsPanel));

export {
  mapToProps,
  mapToFunctions,
  ActiveCallsPage as default,
};
