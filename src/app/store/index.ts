import { castingReducer, CastingState } from './reducers/casting.reducer';
import { epgReducer, EpgState } from './reducers/epg.reducer';
import { channelsReducer, ChannelsState } from './reducers/channels.reducer';
import { settingsReducer, SettingsState } from './reducers/settings.reducer';
import { UiState, uiReducer } from './reducers/ui.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { InjectionToken } from '@angular/core';
import { playerReducer, PlayerState } from '@store/reducers/player.reducer';

export const REDUCER_TOKEN = new InjectionToken<ActionReducerMap<AppState>>('Registered Reducers');

export interface AppState {
  readonly settings: SettingsState;

  readonly channels: ChannelsState;
  readonly epg: EpgState;
  readonly ui: UiState;
  readonly casting: CastingState;
  readonly player: PlayerState;
}

export const rootReducer: ActionReducerMap<AppState> = {
  settings: settingsReducer,
  channels: channelsReducer,
  epg: epgReducer,
  ui: uiReducer,
  casting: castingReducer,
  player: playerReducer,
};
