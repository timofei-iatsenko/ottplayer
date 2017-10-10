import { RECEIVE_CURRENT_EPG } from '../actions/epg.actions';
import { EpgDictionary } from '../entities/epg-entry';

export function epgReducer(state: EpgDictionary = {}, action: any) {
  switch (action.type) {
    case RECEIVE_CURRENT_EPG:
     return action.epg;
    default:
      return state;
  }
}
