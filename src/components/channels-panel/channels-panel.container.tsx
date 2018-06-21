import { connect, MapDispatchToPropsParam, MapStateToPropsParam } from 'react-redux';
import { SetChannelsListMode } from '../../store/actions/ui-preferences.actions';
import { ReadonlyChannelsCollection } from '../../entities/channel.model';
import { AppState } from '../../store';
import { withChannelNavigation } from '../hoc/with-channel-navigation';
import { ChannelListMode } from '../list-switcher/channel-list-modes';
import { ChannelsPanelComponent, DispatchProps, OwnProps, StateProps } from './channels-panel';

function getFavouritesChannels(channels: ReadonlyChannelsCollection, favourites: ReadonlyArray<number>): ReadonlyChannelsCollection {
  return channels.filter((channel) => favourites.includes(channel.id));
}

const mapStateToProps: MapStateToPropsParam<StateProps, OwnProps, AppState> = (state: AppState) => {
  return {
    favourites: getFavouritesChannels(state.channels.channels, state.channels.favourites),
    channels: state.channels.channels,
    currentEpg: state.epg,
    listMode: state.uiPreferences.channelListMode,
  };
};

const mapDispatchToProps: MapDispatchToPropsParam<DispatchProps, OwnProps> = (dispatch) => {
  return {
    onChangeListMode: (mode: ChannelListMode) => {
      dispatch(new SetChannelsListMode({ mode }));
    },
  };
};

export const ChannelsPanel = withChannelNavigation(connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(ChannelsPanelComponent));
