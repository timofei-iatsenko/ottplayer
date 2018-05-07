import { on, reducer } from 'ts-action';
import { EpgEntry } from '../../entities/epg-entry';
import { ReceiveEpg } from '../actions/epg.actions';

export type EpgDictionary = { readonly [chid: number]: EpgEntry[] };

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
  on(ReceiveEpg, (state, { payload }) => (
    {
      ...state,
      entries: payload.epg,
      lastUpdate: payload.finishTime,
    }
  )),
], initialState);
