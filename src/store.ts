import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { EpgDictionary } from './entities/epg-entry';
import { Playlist } from './entities/playlist.model';
import { playlistReducer } from './reducers/playlist.reducer';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { favouritesReducer, FavouritesState } from './reducers/favourites.reducer';
import { settingsReducer, SettingsState } from './reducers/settings.reducer';
import { epgReducer } from './reducers/epg.reducer';
import { uiPreferencesReducer, UiPreferencesState } from './reducers/ui-preferences.reducer';
import { CurrentChannelState, currentDataReducer } from './reducers/current-channel.reducer';
import { rootSaga } from './sagas';
import { LocalStorageFactory } from './libs/storage';

export interface AppState {
  readonly playlist: Playlist;
  readonly favourites: FavouritesState;

  readonly settings: SettingsState;
  readonly currentEpg: EpgDictionary;
  readonly uiPreferences: UiPreferencesState;
  readonly currentChannel: CurrentChannelState;
}

const ottApp = combineReducers<AppState>({
  playlist: playlistReducer,
  favourites: favouritesReducer,
  settings: settingsReducer,
  currentEpg: epgReducer,
  uiPreferences: uiPreferencesReducer,
  currentChannel: currentDataReducer,
});

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const favouritesStorage = LocalStorageFactory.create<ReadonlyArray<number>>('favourites');
const settingsStorage = LocalStorageFactory.create<SettingsState>('settings');
const uiPreferencesStorage = LocalStorageFactory.create<UiPreferencesState>('ui-preferences');

const preloadState = {
  favourites: {
    savedChannels: favouritesStorage.get(),
  },
  uiPreferences: uiPreferencesStorage.get(),
  settings: settingsStorage.get(),
};

export const store = createStore<AppState>(ottApp,
  preloadState as AppState,
  composeEnhancers(applyMiddleware(
    thunkMiddleware,
    sagaMiddleware,
  )),
);

sagaMiddleware.run(rootSaga);

store.subscribe(() => {
  const state = store.getState();
  favouritesStorage.set(state.favourites.savedChannels);
  settingsStorage.set(state.settings);
  uiPreferencesStorage.set(state.uiPreferences);
});
