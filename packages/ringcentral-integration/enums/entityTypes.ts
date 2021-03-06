import {
  ObjectMap,
  ObjectMapValue,
} from '@ringcentral-integration/core/lib/ObjectMap';

export const entityTypes = ObjectMap.fromKeys([
  'account',
  'contact',
  'lead',
  'opportunity',
  'systemUser',
]);

export type EntityType = ObjectMapValue<typeof entityTypes>;
export type EntityTypes = Record<EntityType, string>;
