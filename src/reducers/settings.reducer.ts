import { RECEIVE_CHANNELS } from '../actions/channels.actions';
import { Settings } from '../entities/settings.model';

const initialState = {
  playlistUrl: '/api/playlist?url=myott.tv',
  currentKey: '00XE8DMEI7',
};

export function settingsReducer(state: Settings = initialState, action: any) {
  switch (action.type) {
    case RECEIVE_CHANNELS:
     return action.channels;
    default:
      return state;
  }
}
