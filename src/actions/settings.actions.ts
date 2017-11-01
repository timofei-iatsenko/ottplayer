import { SettingsState } from '../reducers/settings.reducer';
export enum SettingsActions {
  save = '[Settings] Save',
}

export function changeSettings(settings: SettingsState) {
  return {
    type: SettingsActions.save,
    settings,
  };
}
