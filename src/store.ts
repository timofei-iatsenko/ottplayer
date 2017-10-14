import { applyMiddleware, combineReducers, createStore } from 'redux';
import { EpgDictionary } from './entities/epg-entry';
import { Playlist } from './entities/playlist.model';
import { playlistReducer } from './reducers/playlist.reducer';
import thunkMiddleware from 'redux-thunk';
import { favouritesReducer } from './reducers/favourites.reducer';
import { Settings } from './entities/settings.model';
import { settingsReducer } from './reducers/settings.reducer';
import { epgReducer } from './reducers/epg.reducer';
import { uiPreferencesReducer, UiPreferencesState } from './reducers/ui-preferences.reducer';
import { currentDataReducer, CurrentChannelState } from './reducers/current-channel.reducer';

export interface AppState {
  readonly playlist: Readonly<Playlist>;
  readonly favourites: ReadonlyArray<number>;

  readonly settings: Readonly<Settings>;
  readonly currentEpg: Readonly<EpgDictionary>;
  readonly uiPreferences: Readonly<UiPreferencesState>;
  readonly currentChannel: Readonly<CurrentChannelState>;
}

const ottApp = combineReducers<AppState>({
  playlist: playlistReducer,
  favourites: favouritesReducer,
  settings: settingsReducer,
  currentEpg: epgReducer,
  uiPreferences: uiPreferencesReducer,
  currentChannel: currentDataReducer,
});

export const store = createStore<AppState>(ottApp,
  applyMiddleware(
    thunkMiddleware,
  ),
);
