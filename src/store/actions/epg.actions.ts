import { action, payload } from 'ts-action';
import { EpgDictionary } from '../../entities/epg-entry';

export const ReceiveEpg = action('[EPG] Receive epg', payload<{epg: EpgDictionary, finishTime: number}>());

export const FailedLoadEpg = action('[EPG] Failed load channel', payload<{error: string}>());

export const StartEpgSync = action('[EPG] Start sync channel');
export const StopEpgSync = action('[EPG] Stop sync channel');
