import { on, reducer } from 'ts-action';
import { ReceivePlaylist } from '../actions/playlist.actions';
import { Playlist } from '../../entities/playlist.model';
import { extractGroups } from '../lib/extract-groups';
import { createGroup } from '../lib/create-group';
import { SaveFavourites } from '../actions/favourites.actions';

export enum PredefinedGroup {
  all = 'all',
  favourites = 'favourites',
}

export interface ChannelsState extends Playlist {
  selectedGroup: string;
  groups: Group[];
  favourites: number[];
}

export interface Group {
  name: string;
  channels: number[];
}

export const initialState: ChannelsState = {
  urlEpg: null,
  urlLogo: null,
  channels: [],
  groups: [],
  selectedGroup: 'all',
  favourites: [],
};

export const channelsReducer = reducer<ChannelsState>([
  on(SaveFavourites, (state, { payload }) => {
    const groups = state.groups.map((group) => {
      if (group.name === PredefinedGroup.favourites) {
        return { ...group, channels: payload.favourites };
      }
      return group;
    });

    return {...state, favourites: payload.favourites, groups};
  }),
  on(ReceivePlaylist, (state, { payload }) => {
    const newGroups = extractGroups(payload.playlist.channels);
    const groupAll = createGroup(PredefinedGroup.all, payload.playlist.channels.map((ch) => ch.id));
    const favourites = createGroup(PredefinedGroup.favourites, state.favourites);
    return { ...state, ...payload.playlist, groups: [groupAll, favourites, ...newGroups] };
  }),
], initialState);
