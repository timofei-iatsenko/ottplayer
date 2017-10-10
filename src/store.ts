import { applyMiddleware, combineReducers, createStore } from 'redux';
import { ChannelsCollection } from './entities/channel.model';
import { EpgDictionary } from './entities/epg-entry';
import { Playlist } from './entities/playlist.model';
import { playlistReducer } from './reducers/playlist.reducer';
import thunkMiddleware from 'redux-thunk';
import { favouritesReducer } from './reducers/favourites.reducer';
import { channelsReducer } from './reducers/channels.reducer';
import { Settings } from './entities/settings.model';
import { settingsReducer } from './reducers/settings.reducer';

export interface AppState {
  readonly playlist: Readonly<Playlist>;
  readonly favourites: ReadonlyArray<number>;
  readonly channels: ChannelsCollection;

  readonly settings: Readonly<Settings>;
  // readonly currentEpg: Readonly<EpgDictionary>;

}

const ottApp = combineReducers<AppState>({
  playlist: playlistReducer,
  favourites: favouritesReducer,
  channels: channelsReducer,
  settings: settingsReducer,
});

export const store = createStore<AppState>(ottApp,
  applyMiddleware(
    thunkMiddleware,
  ),
);
