import { on, reducer } from 'ts-action';
import { ChangeSettings } from '../actions/settings.actions';
export interface SettingsState {
  readonly playlistUrl: string;
  readonly currentKey: string;
}

const initialState: SettingsState = {
  playlistUrl: '',
  currentKey: '',
};

export const settingsReducer = reducer<SettingsState>([
  on(ChangeSettings, (_state, { payload }) => ({ ...payload.settings })),
], initialState);
