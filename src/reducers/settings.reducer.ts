import { ChangeSettings, SettingsActions } from '../actions/settings.actions';
export interface SettingsState {
  readonly playlistUrl: string;
  readonly currentKey: string;
}

const initialState: SettingsState = {
  playlistUrl: '',
  currentKey: '',
};

export function settingsReducer(state = initialState, action: typeof SettingsActions) {
  switch (action.type) {
    case ChangeSettings.type:
      return { ...action.payload.settings };
    default:
      return state;
  }
}
