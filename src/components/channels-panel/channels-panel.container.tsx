import { ReadonlyChannelsCollection } from '../../entities/channel.model';
import { ChannelListMode } from '../list-switcher/channel-list-modes';
import { connect, MapDispatchToPropsParam, MapStateToPropsParam } from 'react-redux';
import { AppState } from '../../store';
import { setChannelsListMode } from '../../actions/ui-preferences.actions';
import { ChannelsPanelComponent, DispatchProps, OwnProps, StateProps } from './channels-panel';
import { withChannelNavigation } from '../hoc/with-channel-navigation';

function getFavouritesChannels(channels: ReadonlyChannelsCollection, favourites: ReadonlyArray<number>): ReadonlyChannelsCollection {
  return channels.filter((channel) => favourites.includes(channel.id));
}

const mapStateToProps: MapStateToPropsParam<StateProps, OwnProps> = (state: AppState) => {
  return {
    favourites: getFavouritesChannels(state.playlist.channels, state.favourites),
    channels: state.playlist.channels,
    currentEpg: state.currentEpg,
    listMode: state.uiPreferences.channelListMode,
  };
};

const mapDispatchToProps: MapDispatchToPropsParam<DispatchProps, OwnProps> = (dispatch) => {
  return {
    onChangeListMode: (mode: ChannelListMode) => {
      dispatch(setChannelsListMode(mode));
    },
  };
};

export const ChannelsPanel = withChannelNavigation(connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(ChannelsPanelComponent));
