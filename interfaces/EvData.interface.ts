import { SalesforceEntityType } from 'ringcentral-widgets/components/CallLogPanel';

import {
  EvAddSessionNotification,
  EvBaseCall,
  EvEndedCall,
} from '../lib/EvClient/interfaces';

export type EvCallData = EvBaseCall & {
  contactMatches?: EvContactMatcheItem[];
  matchedContacts?: any;
  endedCall?: EvEndedCall;
  session?: EvAddSessionNotification;
  isHold?: boolean;
  agentName?: string;
  /** transform queueDts from time zone date to timeStamp */
  timestamp: number;
  gate: EvEvRequeueCallGate;
  /** temporary code for test screen pop sf object when inbound call */
  recordId: string;
  /** temporary code for test screen pop sf object when inbound call */
  caseId: string;
  /** temporary code for test screen pop sf object when inbound call */
  objectValue: string;
  /** temporary code for test screen pop sf object when inbound call */
  objectType: string;
};

export interface EvContactMatcheItem {
  id: string;
  type: SalesforceEntityType;
  name: string;
}

export interface EvEvRequeueCallGate {
  gateId: string;
  gateGroupId: string;
}
