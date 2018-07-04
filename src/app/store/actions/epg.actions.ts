import { action, payload } from 'ts-action';

export const EpgLoaded = action('[EPG] Receive epg', payload<{finishTime: number}>());

export const FailedLoadEpg = action('[EPG] Failed load channel', payload<{error: string}>());

export const GetEpg = action('[EPG] Get epg');

export const StopEpgSync = action('[EPG] Stop sync channel');
