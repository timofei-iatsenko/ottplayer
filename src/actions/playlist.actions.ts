import { action, payload, union } from 'ts-action';
import { Playlist } from '../entities/playlist.model';

export const RequestPlaylist = action('[Playlist] Request', payload<{playlistUrl: string}>());
export const ReceivePlaylist = action('[Playlist] Receive', payload<{playlist: Playlist}>());

export const PlaylistActions = union({
  RequestPlaylist,
  ReceivePlaylist,
});
