import { on, reducer } from 'ts-action';
import { ReceivePlaylist, SetActiveGroup, SetChannelSlug } from '../actions/channels.actions';
import { Playlist } from '../../entities/playlist.model';
import { extractGroups } from '../lib/extract-groups';
import { createGroup } from '../lib/create-group';
import { SaveFavourites } from '../actions/favourites.actions';
import { AppState } from '../index';
import { LocalStorageFactory } from '../../libs/storage';

export const selectChannel = (state: AppState, chid: number) => {
  if (!state.channels.channels.length || !chid) {
    return null;
  }

  return state.channels.channels.find((ch) => ch.id === chid);
};

export const selectCurrentChannel = (state: AppState) => {
  return selectChannel(state, state.channels.selectedChannelId);
};

export const selectStreamUrl = (state: AppState) => {
  const channel = selectCurrentChannel(state);
  return ((channel && channel.stream) || '')
    .replace('{KEY}', state.settings.currentKey);
};

function getIdFromSlug(slug: string): number {
  if (!slug) {
    return null;
  }
  const [id] = slug.match(/^[^-]+/);
  return +id;
}

export enum PredefinedGroup {
  all = 'all',
  favourites = 'favourites',
}

export interface ChannelsState extends Playlist {
  selectedGroup: string;
  selectedChannelId: number;
  groups: Group[];
  favourites: number[];
}

export interface Group {
  name: string;
  channels: number[];
}

export const savedGroupStorage = LocalStorageFactory.create<string>('selectedGroup');

export const initialState: ChannelsState = {
  urlEpg: null,
  urlLogo: null,
  channels: [],
  groups: [createGroup(PredefinedGroup.all, [])],
  selectedGroup: savedGroupStorage.get(PredefinedGroup.all),
  selectedChannelId: null,
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

    return { ...state, favourites: payload.favourites, groups };
  }),
  on(SetActiveGroup, (state, { payload }) => {
    return { ...state, selectedGroup: payload.name };
  }),
  on(SetChannelSlug, (state, { payload }) => {
    return {
      ...state,
      selectedChannelId: getIdFromSlug(payload.slug),
    };
  }),
  on(ReceivePlaylist, (state, { payload }) => {
    const channels = payload.playlist.channels;
    const newGroups = extractGroups(channels);
    const groupAll = createGroup(PredefinedGroup.all, channels.map((ch) => ch.id));
    const favourites = createGroup(PredefinedGroup.favourites, state.favourites);
    return {
      ...state,
      ...payload.playlist,
      groups: [groupAll, favourites, ...newGroups],
    };
  }),
], initialState);
