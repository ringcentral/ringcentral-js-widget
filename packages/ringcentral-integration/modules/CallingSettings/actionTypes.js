import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';
import { moduleActionTypes } from '../../enums/moduleActionTypes';

export const actionTypes = ObjectMap.prefixKeys(
  [...ObjectMap.keys(moduleActionTypes), 'setData', 'updateFromNumber'],
  'callingSettings',
);

export default actionTypes;
