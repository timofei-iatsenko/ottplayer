import { ReadonlyChannelsCollection } from '../entities/channel.model';

export const RECEIVE_CHANNELS = 'RECEIVE_CHANNELS';

export function receiveChannels(channels: ReadonlyChannelsCollection) {
  return {
    type: RECEIVE_CHANNELS,
    channels,
  };
}
