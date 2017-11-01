import { EpgDictionary, EpgEntry } from '../entities/epg-entry';

export enum EpgActions {
  REQUEST_CURRENT_EPG = 'REQUEST_CURRENT_EPG',
  RECEIVE_CURRENT_EPG = 'RECEIVE_CURRENT_EPG',
  FAILED_LOAD_CURRENT_EPG = 'FAILED_LOAD_CURRENT_EPG',
  START_CURRENT_EPG_SYNC = 'START_CURRENT_EPG_SYNC',
  STOP_CURRENT_EPG_SYNC = 'STOP_CURRENT_EPG_SYNC',

  REQUEST_CHANNEL_EPG = 'REQUEST_CHANNEL_EPG',
  RECEIVE_CHANNEL_EPG = 'RECEIVE_CHANNEL_EPG',
  FAILED_LOAD_CHANNEL_EPG = 'FAILED_LOAD_CHANNEL_EPG',
  START_CHANNEL_EPG_SYNC = 'START_CHANNEL_EPG_SYNC',
  STOP_CHANNEL_EPG_SYNC = 'STOP_CHANNEL_EPG_SYNC',
}

export function requestCurrentEpg() {
  return {
    type: EpgActions.REQUEST_CURRENT_EPG,
  };
}

export function failedLoadCurrentEpg(error: string) {
  return {
    type: EpgActions.FAILED_LOAD_CURRENT_EPG,
    error,
  };
}
export function failedLoadChannelEpg(error: string) {
  return {
    type: EpgActions.FAILED_LOAD_CHANNEL_EPG,
    error,
  };
}
export function receiveCurrentEpg(epg: EpgDictionary) {
  return {
    type: EpgActions.RECEIVE_CURRENT_EPG,
    epg,
  };
}

export function requestChannelEpg() {
  return {
    type: EpgActions.REQUEST_CHANNEL_EPG,
  };
}

export function receiveChannelEpg(epg: EpgEntry[]) {
  return {
    type: EpgActions.RECEIVE_CHANNEL_EPG,
    epg,
  };
}

export function startCurrentEpgSync() {
  return {
    type: EpgActions.START_CURRENT_EPG_SYNC,
  };
}
export function startChannelEpgSync(channelId: number) {
  return {
    type: EpgActions.START_CHANNEL_EPG_SYNC,
    channelId,
  };
}
export function stopCurrentEpgSync() {
  return {
    type: EpgActions.STOP_CURRENT_EPG_SYNC,
  };
}

export function stopChannelEpgSync() {
  return {
    type: EpgActions.STOP_CHANNEL_EPG_SYNC,
  };
}
