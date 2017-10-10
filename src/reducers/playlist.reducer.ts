import { RECEIVE_PLAYLIST } from '../actions/playlist.actions';

export function playlistReducer(state = '', action: any) {
  switch (action.type) {
    case RECEIVE_PLAYLIST:
     return action.playlist;
    default:
      return state;
  }
}
