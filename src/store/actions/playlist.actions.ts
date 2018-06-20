import { action, payload } from 'ts-action';
import { Playlist } from '../../entities/playlist.model';

export const RequestPlaylist = action('[Playlist] Request', payload<{playlistUrl: string}>());
export const ReceivePlaylist = action('[Playlist] Receive', payload<{playlist: Playlist}>());
