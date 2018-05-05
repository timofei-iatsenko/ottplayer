import { on, reducer } from 'ts-action';
import { ReceivePlaylist } from '../actions/playlist.actions';
import { Playlist } from '../entities/playlist.model';

const initialPlaylist: Playlist = {
  urlEpg: null,
  urlLogo: null,
  channels: [],
};

export const playlistReducer = reducer<Playlist>([
  on(ReceivePlaylist, (_state, { payload }) => payload.playlist),
], initialPlaylist);
