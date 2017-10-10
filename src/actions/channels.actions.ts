import { Channel } from '../entities/channel.model';

export const RECEIVE_CHANNELS = 'RECEIVE_CHANNELS';

export function receiveChannels(channels: Channel[]) {
  return {
    type: RECEIVE_CHANNELS,
    channels,
  };
}
