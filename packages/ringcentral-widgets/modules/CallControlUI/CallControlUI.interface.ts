import { ReactNode } from 'react';
import { Brand } from '@ringcentral-integration/commons/modules/BrandV2';
import { CallingSettings } from '@ringcentral-integration/commons/modules/CallingSettingsV2';
import { CallMonitor } from '@ringcentral-integration/commons/modules/CallMonitorV2';
import { ConferenceCall } from '@ringcentral-integration/commons/modules/ConferenceCallV2';
import { ContactMatcher } from '@ringcentral-integration/commons/modules/ContactMatcherV2';
import { ContactSearch } from '@ringcentral-integration/commons/modules/ContactSearchV2';
import { ExtensionInfo } from '@ringcentral-integration/commons/modules/ExtensionInfoV2';
import { ForwardingNumber } from '@ringcentral-integration/commons/modules/ForwardingNumberV2';
import { Locale } from '@ringcentral-integration/commons/modules/LocaleV2';
import { RegionSettings } from '@ringcentral-integration/commons/modules/RegionSettingsV2';
import { Webphone } from '@ringcentral-integration/commons/modules/WebphoneV2';
import callDirections from '../../../ringcentral-integration/enums/callDirections';
import calleeTypes from '../../../ringcentral-integration/enums/calleeTypes';
import { NormalizedSession } from '../../../ringcentral-integration/interfaces/Webphone.interface';
import { ConnectivityManager } from '../ConnectivityManager';
import { RouterInteraction } from '../RouterInteraction';

export interface CallControlUIOptions {}

export interface CallControlComponentProps {
  params?: {
    sessionId?: string;
  };
  showCallQueueName?: boolean;
  showPark?: boolean;
  getAvatarUrl?: () => string;
  onBackButtonClick?: () => any;
  phoneTypeRenderer?: () => ReactNode;
  phoneSourceNameRenderer?: () => ReactNode;
  children?: ReactNode;
}

export interface Deps {
  webphone: Webphone;
  locale: Locale;
  contactMatcher: ContactMatcher;
  regionSettings: RegionSettings;
  brand: Brand;
  contactSearch: ContactSearch;
  callingSettings: CallingSettings;
  connectivityManager: ConnectivityManager;
  forwardingNumber: ForwardingNumber;
  callMonitor: CallMonitor;
  extensionInfo: ExtensionInfo;
  conferenceCall?: ConferenceCall;
  routerInteraction?: RouterInteraction;
  callControlUIOptions: CallControlUIOptions;
}
export function getLastCallInfoFromWebphoneSession(
  webphoneSession: NormalizedSession,
) {
  const sessionNumber =
    webphoneSession.direction === callDirections.outbound
      ? webphoneSession.to
      : webphoneSession.from;
  const sessionStatus = webphoneSession.callStatus;
  const matchedContact = webphoneSession.contactMatch;
  const calleeType = matchedContact
    ? calleeTypes.contacts
    : calleeTypes.unknown;
  return {
    calleeType,
    avatarUrl: matchedContact && matchedContact.profileImageUrl,
    name: matchedContact && matchedContact.name,
    status: sessionStatus,
    phoneNumber: sessionNumber,
  };
}
