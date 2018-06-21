import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { initializeCastApi } from '../casting/initialize-casting-api';
import { LocalStorageFactory } from '../libs/storage';
import { castingReducer, CastingState } from './reducers/casting.reducer';
import { epgReducer, EpgState } from './reducers/epg.reducer';
import { channelsReducer, ChannelsState, initialState as initialChannelsState } from './reducers/channels.reducer';
import { settingsReducer, SettingsState } from './reducers/settings.reducer';
import { rootSaga } from './sagas';

export interface AppState {
  readonly channels: ChannelsState;

  readonly settings: SettingsState;
  readonly epg: EpgState;
  readonly casting: CastingState;
}

const ottApp = combineReducers<AppState>({
  channels: channelsReducer,
  settings: settingsReducer,
  epg: epgReducer,
  casting: castingReducer,
});

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const favouritesStorage = LocalStorageFactory.create<number[]>('favourites');
const settingsStorage = LocalStorageFactory.create<SettingsState>('settings');
const epgLastUpdateStorage = LocalStorageFactory.create<EpgState['lastUpdate']>('epgLastUpdate');

const preloadState: Partial<AppState> = {
  settings: settingsStorage.get(),
  epg: {
    entries: {},
    lastUpdate: epgLastUpdateStorage.get(),
  },
  channels: {
    ...initialChannelsState,
    favourites: favouritesStorage.get([]),
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
  favouritesStorage.set(state.channels.favourites);
  settingsStorage.set(state.settings);
  epgLastUpdateStorage.set(state.epg.lastUpdate);
});

initializeCastApi(store);
