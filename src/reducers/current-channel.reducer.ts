import { EpgActions } from '../actions/epg.actions';
import { EpgEntry } from '../entities/epg-entry';

export interface CurrentChannelState {
  channelId: number;
  epg: EpgEntry[];
}

const initialState: CurrentChannelState = {
  channelId: null,
  epg: [],
};

export function currentDataReducer(state: CurrentChannelState = initialState, action: any) {
  switch (action.type) {
    case EpgActions.RECEIVE_CHANNEL_EPG:
     return {...state, epg: action.epg};
    default:
      return state;
  }
}
