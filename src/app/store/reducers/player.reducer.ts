import { action, on, payload, reducer } from 'ts-action';

export const PlayerPlayingStateChanged = action('[Player] Playing started', payload<{paused: boolean}>());
export const TogglePlayback = action('[Player] Toggle playback');
export const PlayerReady = action('[Player] Playing ready', payload<{ready: boolean}>());

export interface PlayerState {
  readonly paused: boolean;
  readonly ready: boolean;
}

const initialState: PlayerState = {
  paused: null,
  ready: null,
};

// tslint:disable no-shadowed-variable
export const playerReducer = reducer<PlayerState>([
  on(PlayerPlayingStateChanged, (state, { payload }) => ({ ...state, ...payload, })),
  on(PlayerReady, (state, { payload }) => ({ ...state, ...payload, })),
], initialState);
