import { PlaylistActions, ReceivePlaylist } from '../actions/playlist.actions';
import { Playlist } from '../entities/playlist.model';

const initialPlaylist: Playlist = {
  urlEpg: null,
  urlLogo: null,
  channels: [],
};

export function playlistReducer(state: Playlist = initialPlaylist, action: typeof PlaylistActions) {
  switch (action.type) {
    case ReceivePlaylist.type:
     return action.payload.playlist;
    default:
      return state;
  }
}
