import { Settings } from '../entities/settings.model';

export const CHANGE_SETTINGS = 'CHANGE_SETTINGS';

export function changeSettings(settings: Settings) {
  return {
    type: CHANGE_SETTINGS,
    settings,
  };
}
