import { ChannelListMode } from '../components/list-switcher/channel-list-modes';

export const SET_CHANNELS_LIST_MODE = 'SET_CHANNELS_LIST_MODE';

export function setChannelsListMode(mode: ChannelListMode) {
  return {
    type: SET_CHANNELS_LIST_MODE,
    mode,
  };
}
