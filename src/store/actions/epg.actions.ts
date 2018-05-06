import { action, payload, union } from 'ts-action';
import { EpgDictionary, EpgEntry } from '../../entities/epg-entry';

export const RequestCurrentEpg = action('[EPG] Request current');
export const ReceiveCurrentEpg = action('[EPG] Receive Current', payload<{epg: EpgDictionary}>());
export const FailedLoadCurrentEpg = action('[EPG] Failed load current', payload<{error: string}>());

export const RequestChannelEpg = action('[EPG] Request channel');
export const ReceiveChannelEpg = action('[EPG] Receive channel', payload<{epg: EpgEntry[]}>());
export const FailedLoadChannelEpg = action('[EPG] Failed load channel', payload<{error: string}>());

export const StartCurrentEpgSync = action('[EPG] Start sync current');
export const StopCurrentEpgSync = action('[EPG] Stop sync current');

export const StartChannelEpgSync = action('[EPG] Start sync channel', payload<{channelId: number}>());
export const StopChannelEpgSync = action('[EPG] Stop sync channel');

export const EpgActions = union({
  RequestCurrentEpg,
  FailedLoadCurrentEpg,
  ReceiveCurrentEpg,
  RequestChannelEpg,
  ReceiveChannelEpg,
  StartCurrentEpgSync,
  StartChannelEpgSync,
  StopCurrentEpgSync,
  StopChannelEpgSync,
});
