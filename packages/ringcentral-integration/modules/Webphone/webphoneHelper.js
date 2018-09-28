import recordStatus from './recordStatus';
import sessionStatus from './sessionStatus';
import { camelize } from '../../lib/di/utils/utils';
import callDirections from '../../enums/callDirections';

export function isBrowserSupport() {
  const isChrome = !!(navigator.userAgent.match(/Chrom(e|ium)/));
  if (!isChrome) {
    return false;
  }
  const chromeVersion =
    parseInt(navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)[2], 10);
  if (chromeVersion >= 51) {
    return true;
  }
  return false;
}

export function extractHeadersData(session, headers) {
  if (
    headers
    && headers['P-Rc-Api-Ids']
    && headers['P-Rc-Api-Ids'][0]
    && headers['P-Rc-Api-Ids'][0].raw
  ) {
    /**
     * interface PartyData {
     *  "partyId": String,
     *  "sessionId": String
     * }
     *
     * INFO: partyId is ID of the participant in current Session. Mostly it represents User on the call,
     * it could be active participant (talking right now) or already disconnected User,
     * e.g. who made a transfer to another person.
     * To identify the User who owns the party you need to find owner.extensionId within party.
     */
    const data = headers['P-Rc-Api-Ids'][0].raw
      .split(';')
      .map(sub => sub.split('='))
      .reduce((accum, [key, value]) => {
        accum[camelize(key)] = value;
        return accum;
      }, {});

    if (Object.keys(data).length) {
      session.__rc_partyData = data;
    }
  }

  if (
    headers
    && headers['Call-ID']
    && headers['Call-ID'][0]
    && headers['Call-ID'][0].raw
  ) {
    session.__rc_callId = headers['Call-ID'][0].raw;
  }
}

export function normalizeSession(session) {
  return {
    id: session.id,
    callId: session.__rc_callId,
    direction: session.__rc_direction,
    callStatus: session.__rc_callStatus,
    to: session.request.to.uri.user,
    toUserName: session.request.to.displayName,
    from: session.request.from.uri.user,
    fromNumber: session.__rc_fromNumber,
    fromUserName: session.request.from.displayName,
    startTime: session.startTime && (new Date(session.startTime)).getTime(),
    creationTime: session.__rc_creationTime,
    isOnHold: !!session.isOnHold().local,
    isOnMute: !!session.__rc_isOnMute,
    isOnFlip: !!session.__rc_isOnFlip,
    isOnTransfer: !!session.__rc_isOnTransfer,
    isToVoicemail: !!session.__rc_isToVoicemail,
    isForwarded: !!session.__rc_isForwarded,
    isReplied: !!session.__rc_isReplied,
    recordStatus: session.__rc_recordStatus || recordStatus.idle,
    contactMatch: session.__rc_contactMatch,
    minimized: !!session.__rc_minimized,
    partyData: session.__rc_partyData || null,
    lastActiveTime: session.__rc_lastActiveTime,
    cached: false,
    removed: false,
  };
}

export function isRing(session) {
  return !!(
    session &&
    session.direction === callDirections.inbound &&
    session.callStatus === sessionStatus.connecting
  );
}

export function isOnHold(session) {
  return !!(session && session.callStatus === sessionStatus.onHold);
}

export function sortByCreationTimeDesc(l, r) {
  return r.startTime - l.startTime;
}

export function sortByLastActiveTimeDesc(l, r) {
  if (!l || !r) {
    return 0;
  }
  if (r.lastActiveTime !== l.lastActiveTime) {
    return r.lastActiveTime - l.lastActiveTime;
  }
  return sortByCreationTimeDesc(l, r);
}

/**
 * HACK: this function is not very reliable, only use it before the merging complete.
 */
export function isConferenceSession(session) {
  return session && session.to &&
    session.to.indexOf('conf_') === 0;
}

export function isRecording(session) {
  return !!(
    session &&
    (
      session.recordStatus === recordStatus.pending ||
      session.recordStatus === recordStatus.recording
    )
  );
}
