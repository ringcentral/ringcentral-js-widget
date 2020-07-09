import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const callLoggerTriggerTypes = ObjectMap.fromObject({
  manual: 'manual',
  presenceUpdate: 'presenceUpdate',
  callLogSync: 'callLogSync',
} as const);

export default callLoggerTriggerTypes;
