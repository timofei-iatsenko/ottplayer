import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { initializeCastApi } from '../casting/initialize-casting-api';
import { Playlist } from '../entities/playlist.model';
import { LocalStorageFactory } from '../libs/storage';
import { castingReducer, CastingState } from './reducers/casting.reducer';
import { epgReducer, EpgState } from './reducers/epg.reducer';
import { favouritesReducer, FavouritesState } from './reducers/favourites.reducer';
import { playlistReducer } from './reducers/playlist.reducer';
import { settingsReducer, SettingsState } from './reducers/settings.reducer';
import { uiPreferencesReducer, UiPreferencesState } from './reducers/ui-preferences.reducer';
import { rootSaga } from './sagas';

export interface AppState {
  readonly playlist: Playlist;
  readonly favourites: FavouritesState;

  readonly settings: SettingsState;
  readonly epg: EpgState;
  readonly uiPreferences: UiPreferencesState;
  readonly casting: CastingState;
}

const ottApp = combineReducers<AppState>({
  playlist: playlistReducer,
  favourites: favouritesReducer,
  settings: settingsReducer,
  epg: epgReducer,
  uiPreferences: uiPreferencesReducer,
  casting: castingReducer,
});

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const favouritesStorage = LocalStorageFactory.create<ReadonlyArray<number>>('favourites');
const settingsStorage = LocalStorageFactory.create<SettingsState>('settings');
const uiPreferencesStorage = LocalStorageFactory.create<UiPreferencesState>('ui-preferences');
const epgLastUpdateStorage = LocalStorageFactory.create<EpgState['lastUpdate']>('epgLastUpdate');

const preloadState: Partial<AppState> = {
  favourites: favouritesStorage.get(),
  uiPreferences: uiPreferencesStorage.get(),
  settings: settingsStorage.get(),
  epg: {
    entries: {},
    lastUpdate: epgLastUpdateStorage.get(),
  },
};

export const store = createStore(ottApp,
  preloadState as AppState,
  composeEnhancers(applyMiddleware(
    sagaMiddleware,
  )),
);

sagaMiddleware.run(rootSaga);

store.subscribe(() => {
  const state = store.getState();
  favouritesStorage.set(state.favourites);
  settingsStorage.set(state.settings);
  uiPreferencesStorage.set(state.uiPreferences);
  epgLastUpdateStorage.set(state.epg.lastUpdate);
});

initializeCastApi(store);
