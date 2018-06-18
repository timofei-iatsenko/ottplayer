import { action, payload } from 'ts-action';
import { EpgEntry } from '../../entities/epg-entry';

export const ReceiveEpg = action('[EPG] Receive epg', payload<{epg: EpgEntry[], finishTime: number}>());

export const FailedLoadEpg = action('[EPG] Failed load channel', payload<{error: string}>());

export const GetEpg = action('[EPG] Get epg');

export const StopEpgSync = action('[EPG] Stop sync channel');
