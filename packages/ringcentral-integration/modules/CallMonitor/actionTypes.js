import Enum from '../../lib/Enum';
import moduleActionTypes from '../../enums/moduleActionTypes';

export default new Enum([
  ...Object.keys(moduleActionTypes),
  'setData',
  // user action track
  'callItemClickTrack',
  'allCallsClickHoldTrack',
  'allCallsClickHangupTrack',
  'callControlClickAddTrack',
  'simplifiedControlClickMergeTrack',
  'callControlClickMergeTrack',
  'confirmMergeClickCloseTrack',
  'confirmMergeClickMergeTrack',
  'callsOnHoldClickAddTrack',
  'callsOnHoldClickMergeTrack',
  'callsOnHoldClickHangupTrack',
  'callControlClickParticipantAreaClickTrack',
], 'callMonitorAcionTypes');
