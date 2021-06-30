import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const permissionsMessages = ObjectMap.prefixKeys(
  ['invalidTier', 'insufficientPrivilege', 'callingDisable'],
  'permissionsMessages',
);
