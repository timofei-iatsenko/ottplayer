import { RECEIVE_PLAYLIST } from '../actions/playlist.actions';
import { Playlist } from '../entities/playlist.model';

const initialPlaylist: Playlist = {
  urlEpg: null,
  urlLogo: null,
  channels: [],
};

export function playlistReducer(state: Playlist = initialPlaylist, action: any) {
  switch (action.type) {
    case RECEIVE_PLAYLIST:
     return action.playlist;
    default:
      return state;
  }
}
