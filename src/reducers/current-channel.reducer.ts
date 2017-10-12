import { EpgActions } from '../actions/epg.actions';
import { EpgEntry } from '../entities/epg-entry';

export interface CurrentDataStore {
  channelId: number;
  epg: EpgEntry[];
}

const initialState: CurrentDataStore = {
  channelId: null,
  epg: [],
};

export function currentDataReducer(state: CurrentDataStore = initialState, action: any) {
  switch (action.type) {
    case EpgActions.RECEIVE_CHANNEL_EPG:
     return {...state, epg: action.epg};
    default:
      return state;
  }
}
