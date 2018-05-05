import { EpgActions, ReceiveCurrentEpg } from '../actions/epg.actions';
import { EpgDictionary } from '../entities/epg-entry';

export function epgReducer(state: EpgDictionary = {}, action: typeof EpgActions) {
  switch (action.type) {
    case ReceiveCurrentEpg.type:
     return action.payload.epg;
    default:
      return state;
  }
}
