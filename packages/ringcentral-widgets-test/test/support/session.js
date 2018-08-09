class MediaHandler {
  constructor() {
    this._events = {};
  }

  on(event, cb) {
    this._events[event] = cb;
  }

  trigger(event, ...args) {
    this._events[event](...args);
  }
}

export default class Session {
  constructor({
    id, direction, to, fromNumber, _header_callId
  }) {
    this.id = id;
    this._header_callId = _header_callId; // call id
    this.to = to;
    this.direction = direction;
    this.callStatus = 'webphone-session-connecting';
    this.request = { to: { uri: { } }, from: { uri: { } } };
    this.creationTime = 1532076632960;
    this.isToVoicemail = true;
    this.data = {};
    this.fromNumber = fromNumber;
    this.startTime = new Date();
    this.isOnMute = undefined;
    this.isOnFlip = undefined;
    this.isOnTransfer = undefined;
    this.isForwarded = undefined;
    this.isReplied = undefined;
    this.recordStatus = undefined;
    this.minimized = undefined;
    this.lastHoldingTime = undefined;
    this._events = {};
    this.mediaHandler = new MediaHandler();
  }

  on(event, cb) {
    this._events[event] = cb;
  }

  isOnHold() {
    return {
      local: this.callStatus === 'webphone-session-onHold'
    };
  }

  trigger(event, ...args) {
    this._events[event](...args);
  }

  // Change Session Id
  accept(...args) {
    this.trigger('accepted', args);
    this.callStatus = 'webphone-session-connected';
  }

  reject() {
    console.info('session rejected');
    this.trigger('rejected');
  }

  toVoicemail() {
    console.info('session toVoicemail');
    this.trigger('rejected');
  }

  terminate() {
    this.trigger('terminated');
  }

  mute() {
    this.trigger('muted');
  }

  unmute() {
    this.trigger('unmuted');
  }

  hold() {
    this.trigger('hold');
    this.callStatus = 'webphone-session-onHold';
  }

  unhold() {
    this.trigger('unhold');
    this.callStatus = 'webphone-session-connected';
  }
}

export const inboundSession = new Session({
  id: '111',
  direction: 'Inbound'
});
