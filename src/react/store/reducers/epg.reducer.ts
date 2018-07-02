import { on, reducer } from 'ts-action';
import { EpgEntry, EpgDictionary } from '../../entities/epg-entry';
import { ReceiveEpg } from '../actions/epg.actions';
import { AppState } from '../index';

export const selectChannelEpg = (state: AppState, channelId: number): EpgEntry[] => {
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

function toDictionary(entries: EpgEntry[]): EpgDictionary {
  return entries.reduce((acc, entry) => {
    if (!acc[entry.chId]) {
      acc[entry.chId] = [entry];
    } else {
      acc[entry.chId].push(entry);
    }

    return acc;
  }, {} as EpgDictionary);
}

export const epgReducer = reducer<EpgState>([
  on(ReceiveEpg, (state, { payload }) => (
    {
      ...state,
      entries: toDictionary(payload.epg),
      lastUpdate: payload.finishTime,
    }
  )),
], initialState);
