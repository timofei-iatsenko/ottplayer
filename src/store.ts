import { applyMiddleware, combineReducers, createStore } from 'redux';
import { ReadonlyChannelsCollection } from './entities/channel.model';
import { EpgDictionary } from './entities/epg-entry';
import { Playlist } from './entities/playlist.model';
import { playlistReducer } from './reducers/playlist.reducer';
import thunkMiddleware from 'redux-thunk';
import { favouritesReducer } from './reducers/favourites.reducer';
import { channelsReducer } from './reducers/channels.reducer';
import { Settings } from './entities/settings.model';
import { settingsReducer } from './reducers/settings.reducer';
import { epgReducer } from './reducers/epg.reducer';
import { uiPreferencesReducer, UiPreferencesState } from './reducers/ui-preferences.reducer';

export interface AppState {
  readonly playlist: Readonly<Playlist>;
  readonly favourites: ReadonlyArray<number>;
  readonly channels: ReadonlyChannelsCollection;

  readonly settings: Readonly<Settings>;
  readonly currentEpg: Readonly<EpgDictionary>;
  readonly uiPreferences: Readonly<UiPreferencesState>;

}

const ottApp = combineReducers<AppState>({
  playlist: playlistReducer,
  favourites: favouritesReducer,
  channels: channelsReducer,
  settings: settingsReducer,
  currentEpg: epgReducer,
  uiPreferences: uiPreferencesReducer,
});

export const store = createStore<AppState>(ottApp,
  applyMiddleware(
    thunkMiddleware,
  ),
);
