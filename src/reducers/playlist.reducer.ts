import { RECEIVE_PLAYLIST } from '../actions/playlist.actions';
import { Playlist } from '../entities/playlist.model';

export function playlistReducer(state: Playlist = null, action: any) {
  switch (action.type) {
    case RECEIVE_PLAYLIST:
     return action.playlist;
    default:
      return state;
  }
}
