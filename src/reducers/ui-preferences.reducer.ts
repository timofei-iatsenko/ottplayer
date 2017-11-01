import { ChannelListMode } from '../components/list-switcher/channel-list-modes';
import { SET_CHANNELS_LIST_MODE } from '../actions/ui-preferences.actions';

export interface UiPreferencesState {
  readonly channelListMode: ChannelListMode;
}

const initialState: UiPreferencesState = {
  channelListMode: ChannelListMode.grouped,
};

export function uiPreferencesReducer(state = initialState, action: any): UiPreferencesState {
  switch (action.type) {
    case SET_CHANNELS_LIST_MODE:
      return { ...state, channelListMode: action.mode };
    default:
      return state;
  }
}
