import { on, reducer } from 'ts-action';
import { ReceiveChannelEpg } from '../actions/epg.actions';
import { EpgEntry } from '../entities/epg-entry';

export interface CurrentChannelState {
  readonly channelId: number;
  readonly epg: EpgEntry[];
}

const initialState: CurrentChannelState = {
  channelId: null,
  epg: [],
};

export const currentDataReducer = reducer<CurrentChannelState>([
  on(ReceiveChannelEpg, (state, { payload }) => ({...state, epg: payload.epg})),
], initialState);
