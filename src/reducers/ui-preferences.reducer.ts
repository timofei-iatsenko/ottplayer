import { LocalStorageFactory } from '../libs/storage';
import { ChannelListMode } from '../components/list-switcher/channel-list-modes';
import { SET_CHANNELS_LIST_MODE } from '../actions/ui-preferences.actions';

const initialState = {
  channelListMode: ChannelListMode.grouped,
};

export type UiPreferencesState = typeof initialState;

const storage = LocalStorageFactory.create<UiPreferencesState>('ui-preferences');

export function uiPreferencesReducer(state: UiPreferencesState = storage.get(initialState), action: any) {
  switch (action.type) {
    case SET_CHANNELS_LIST_MODE:
      return savePersistent({ ...state, channelListMode: action.mode });
    default:
      return state;
  }
}

function savePersistent(state: UiPreferencesState): UiPreferencesState {
  storage.set(state);
  return state;
}
