import { on, reducer } from 'ts-action';
import { SetChannelsListMode } from '../actions/ui-preferences.actions';
import { ChannelListMode } from '../../components/list-switcher/channel-list-modes';

export interface UiPreferencesState {
  readonly channelListMode: ChannelListMode;
}

const initialState: UiPreferencesState = {
  channelListMode: ChannelListMode.grouped,
};

export const uiPreferencesReducer = reducer<UiPreferencesState>([
  on(SetChannelsListMode, (state, { payload }) => ({ ...state, channelListMode: payload.mode })),
], initialState);
