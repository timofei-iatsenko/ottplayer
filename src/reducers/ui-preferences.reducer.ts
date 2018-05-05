import { SetChannelsListMode, UiActions } from '../actions/ui-preferences.actions';
import { ChannelListMode } from '../components/list-switcher/channel-list-modes';

export interface UiPreferencesState {
  readonly channelListMode: ChannelListMode;
}

const initialState: UiPreferencesState = {
  channelListMode: ChannelListMode.grouped,
};

export function uiPreferencesReducer(state = initialState, action: typeof UiActions): UiPreferencesState {
  switch (action.type) {
    case SetChannelsListMode.type:
      return { ...state, channelListMode: action.payload.mode };
    default:
      return state;
  }
}
