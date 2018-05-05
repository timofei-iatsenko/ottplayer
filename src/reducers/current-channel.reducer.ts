import { EpgActions, ReceiveChannelEpg } from '../actions/epg.actions';
import { EpgEntry } from '../entities/epg-entry';

export interface CurrentChannelState {
  readonly channelId: number;
  readonly epg: EpgEntry[];
}

const initialState: CurrentChannelState = {
  channelId: null,
  epg: [],
};

export function currentDataReducer(state: CurrentChannelState = initialState, action: typeof EpgActions) {
  switch (action.type) {
    case ReceiveChannelEpg.type:
     return {...state, epg: action.payload.epg};
    default:
      return state;
  }
}
