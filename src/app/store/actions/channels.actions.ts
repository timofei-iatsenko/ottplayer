import { action, payload } from 'ts-action';
import { Playlist } from '../../entities/playlist.model';
import { Channel } from '../../entities/channel.model';

export const RequestPlaylist = action('[Channels] Request playlist');
export const ReceivePlaylist = action('[Channels] Receive playlist', payload<{playlist: Playlist}>());

export const SetActiveGroup = action('[Channels] Set active group', payload<{name: string}>());
export const SetChannelSlug = action('[Channels] Set active channel slug', payload<{slug: string}>());

export const NavigateToChannel = action('[Channels] Navigate to channel', payload<{channel: Channel}>());
