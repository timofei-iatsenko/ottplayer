import { Settings } from '../entities/settings.model';

const initialState = {
  playlistUrl: 'myott.tv',
  currentKey: '00XE8DMEI7',
};

export function settingsReducer(state: Settings = initialState, action: any) {
  switch (action.type) {
    default:
      return state;
  }
}
