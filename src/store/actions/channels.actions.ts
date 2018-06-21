import { action, payload } from 'ts-action';
import { Playlist } from '../../entities/playlist.model';

export const RequestPlaylist = action('[Channels] Request playlist', payload<{playlistUrl: string}>());
export const ReceivePlaylist = action('[Channels] Receive playlist', payload<{playlist: Playlist}>());

export const SetActiveGroup = action('[Channels] Set active group', payload<{name: string}>());
