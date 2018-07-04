import { on, reducer } from 'ts-action';
import { EpgEntry, EpgDictionary } from '../../entities/epg-entry';
import { EpgLoaded } from '../actions/epg.actions';
import { AppState } from '../index';

export const selectChannelEpg = (state: AppState, channelId: number): EpgEntry[] => {
  if (!channelId || !state.epg.entries[channelId]) {
    return [];
  }
  return state.epg.entries[channelId];
};

export const channelEpgSelector = (channelId: number) => (state: AppState): EpgEntry[] => {
  if (!channelId || !state.epg.entries[channelId]) {
    return [];
  }
  return state.epg.entries[channelId];
};

export interface EpgState {
  lastUpdate: number;
  entries: EpgDictionary;
}

const initialState: EpgState = {
  lastUpdate: null,
  entries: {},
};

export function epgInAir(entry: EpgEntry) {
  const currentTime = Date.now() / 1000;
  return entry.startTime <= currentTime && entry.endTime >= currentTime;
}

export const epgReducer = reducer<EpgState>([
  on(EpgLoaded, (state, { payload }) => (
    {
      ...state,
      lastUpdate: payload.finishTime,
    }
  )),
], initialState);
