import {
  Direction,
  Party,
  PartyStatusCode,
  SessionData,
} from 'ringcentral-call-control/lib/Session';
import { Session } from 'ringcentral-call/lib/Session';
import { WebPhoneSession } from 'ringcentral-web-phone/lib/session';
import { RouterInteraction } from '../../../ringcentral-widgets/modules/RouterInteraction';
import { TelephonyStatus } from '../../enums/telephonyStatus';
import { RingCentralClient } from '../../lib/RingCentralClient';
import AccountInfo from '../AccountInfo';
import Alert from '../Alert';
import AudioSettings from '../AudioSettings';
import Auth from '../Auth';
import AvailabilityMonitor from '../AvailabilityMonitor';
import { Brand } from '../BrandV2';
import ConnectivityMonitor from '../ConnectivityMonitor';
import ExtensionInfo from '../ExtensionInfo';
import NumberValidate from '../NumberValidate';
import { Presence } from '../PresenceV2';
import RegionSettings from '../RegionSettings';
import Storage from '../Storage';
import Subscription from '../Subscription';
import TabManager from '../TabManager';
import Webphone from '../Webphone';

export interface ActiveCallControlOptions {
  polling?: boolean;
  enableCache?: boolean;
  ttl?: number;
  timeToRetry?: number;
  permissionCheck?: boolean;
  enableAutoSwitchFeature?: boolean;
}

export interface Deps {
  prefix: string;
  accountInfo: AccountInfo;
  alert: Alert;
  audioSettings: AudioSettings;
  auth: Auth;
  availabilityMonitor?: AvailabilityMonitor;
  brand: Brand;
  client: RingCentralClient;
  connectivityMonitor: ConnectivityMonitor;
  extensionInfo: ExtensionInfo;
  numberValidate: NumberValidate;
  presence: Presence;
  regionSettings: RegionSettings;
  routerInteraction: RouterInteraction;
  storage?: Storage;
  subscription: Subscription;
  tabManager?: TabManager;
  webphone?: Webphone;
  activeCallControlOptions?: ActiveCallControlOptions;
}

export interface ModuleMakeCallParams {
  fromNumber?: string;
  toNumber: string;
  homeCountryId?: string;
  extendedControls?: object;
}

export interface ActiveSession {
  telephonySessionId: string;
  partyId: string;
  direction: Direction;
  from: string;
  fromNumber: string;
  fromUserName: string;
  to: string;
  toNumber: string;
  toUserName: string;
  id: string;
  sessionId: string;
  callStatus: TelephonyStatus;
  startTime: number;
  creationTime: string;
  isOnMute: boolean;
  isForwarded: boolean;
  isOnFlip: boolean;
  isOnHold: boolean;
  isOnTransfer: boolean;
  isReplied: boolean;
  isToVoicemail: boolean;
  lastHoldingTime: number;
  minimized: boolean;
  recordStatus: string;
  removed: boolean;
  isReject: boolean;
}

export interface ActiveCallControlSessionData extends SessionData {
  party: Party;
  webphoneSessionConnected: boolean;
  telephonySessionId: string;
  telephonySession?: any;
  sessionId: string;
  activeCallId: string;
  status: PartyStatusCode;
  direction: any;
  otherParties: any;
  recordings: any;
  from: any;
  to: any;
  startTime: number;
  webphoneSession: any;
  webphoneSessionId: string;
}

export { Session, WebPhoneSession };
