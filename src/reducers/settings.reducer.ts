import { SettingsActions } from '../actions/settings.actions';
export interface SettingsState {
  playlistUrl: string;
  currentKey: string;
}

const initialState: SettingsState = {
  playlistUrl: 'myott.tv',
  currentKey: '00XE8DMEI7',
};

export function settingsReducer(state = initialState, action: any) {
  switch (action.type) {
    case SettingsActions.save:
      return { ...action.settings };
    default:
      return state;
  }
}
