import { action, payload } from 'ts-action';
import { SettingsState } from '../reducers/settings.reducer';

export const ChangeSettings = action('[Settings] Change', payload<{settings: SettingsState}>());
