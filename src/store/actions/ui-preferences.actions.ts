import { ChannelListMode } from '../../components/list-switcher/channel-list-modes';
import { action, payload, union } from 'ts-action';

export const SetChannelsListMode = action('[UI] Set channel list mode', payload<{mode: ChannelListMode}>());

export const UiActions = union({
  SetChannelsListMode,
});
