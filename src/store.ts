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

export interface AppState {
  readonly playlist: Readonly<Playlist>;
  readonly favourites: FavouritesState;

  readonly settings: Readonly<SettingsState>;
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

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore<AppState>(ottApp,
  composeEnhancers(applyMiddleware(
    thunkMiddleware,
    sagaMiddleware,
  )),
);

sagaMiddleware.run(rootSaga);
