import { on, reducer } from 'ts-action';
import { ChangeSettings } from '../actions/settings.actions';
import { LocalStorageFactory } from '../../libs/storage';

export interface SettingsState {
  readonly playlistUrl: string;
  readonly currentKey: string;
}

export const settingsStorage = LocalStorageFactory.create<SettingsState>('settings');

const initialState = settingsStorage.get({
  playlistUrl: '',
  currentKey: '',
});

export const settingsReducer = reducer<SettingsState>([
  on(ChangeSettings, (_state, { payload }) => ({ ...payload.settings })),
], initialState);
