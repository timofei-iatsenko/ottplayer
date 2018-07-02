import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { initializeCastApi } from '../casting/initialize-casting-api';
import { LocalStorageFactory } from '../libs/storage';
import { castingReducer, CastingState } from './reducers/casting.reducer';
import { epgReducer, EpgState } from './reducers/epg.reducer';
import { channelsReducer, ChannelsState, initialState as initialChannelsState } from './reducers/channels.reducer';
import { settingsReducer, SettingsState } from './reducers/settings.reducer';
import { rootSaga } from './sagas';
import { UiState, uiReducer } from './reducers/ui.reducer';

export interface AppState {
  readonly channels: ChannelsState;

  readonly settings: SettingsState;
  readonly epg: EpgState;
  readonly ui: UiState;
  readonly casting: CastingState;
}

const ottApp = combineReducers<AppState>({
  channels: channelsReducer,
  settings: settingsReducer,
  epg: epgReducer,
  ui: uiReducer,
  casting: castingReducer,
});

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const favouritesStorage = LocalStorageFactory.create<number[]>('favourites');
const settingsStorage = LocalStorageFactory.create<SettingsState>('settings');
const epgLastUpdateStorage = LocalStorageFactory.create<EpgState['lastUpdate']>('epgLastUpdate');
const selectedGroup = LocalStorageFactory.create<ChannelsState['selectedGroup']>('selectedGroup');

const preloadState: Partial<AppState> = {
  settings: settingsStorage.get(),
  epg: {
    entries: {},
    lastUpdate: epgLastUpdateStorage.get(),
  },
  channels: {
    ...initialChannelsState,
    selectedGroup: selectedGroup.get(initialChannelsState.selectedGroup),
    favourites: favouritesStorage.get(initialChannelsState.favourites),
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
  selectedGroup.set(state.channels.selectedGroup);
});

initializeCastApi(store);
