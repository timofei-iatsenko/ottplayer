import { SettingsActions } from '../actions/settings.actions';
export interface SettingsState {
  readonly playlistUrl: string;
  readonly currentKey: string;
}

const initialState: SettingsState = {
  playlistUrl: '',
  currentKey: '',
};

export function settingsReducer(state = initialState, action: any) {
  switch (action.type) {
    case SettingsActions.save:
      return { ...action.settings };
    default:
      return state;
  }
}
