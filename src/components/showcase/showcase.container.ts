import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { AppState } from '../../store';
import { Channel, ReadonlyChannelsCollection } from '../../entities/channel.model';
import { DispatchProps, Showcase, StoreProps } from './showcase';
import { fetchPlaylist } from '../../actions/playlist.actions';
import { fetchCurrentEpg } from '../../actions/epg.actions';
import { Dispatch } from 'redux';

interface RouterParams {
  channelSlug: string;
}

type OwnProps = RouteComponentProps<RouterParams>;

function getCurrentChannel(channels: ReadonlyChannelsCollection, channelSlug: string): Channel {
  if (!channels.length || !channelSlug) {
    return null;
  }

  const [id] = channelSlug.match(/^[^-]+/);

  if (id) {
    return channels.find((ch) => ch.id === +id);
  }

  return null;
}

function mapStateToProps(state: AppState, ownProps: OwnProps): StoreProps {
  const { channelSlug } = ownProps.match.params;
  return {
    currentKey: state.settings.currentKey,
    currentChannel: getCurrentChannel(state.playlist.channels, channelSlug),
    playlist: state.playlist,
    playlistUrl: state.settings.playlistUrl,
  };
}

function getChannelSlug(channel: Channel) {
  return channel.id;
}

function mapDispatchToProps(dispatch: Dispatch<AppState>, ownProps: OwnProps): DispatchProps {
  return {
    onFetchData: async (playlistUrl: string) => {
      const action = await dispatch(fetchPlaylist(playlistUrl));
      await dispatch(fetchCurrentEpg(action.playlist.urlEpg + '/channel_now'));
    },

    onChangeChannel: (channel: Channel) => {
      ownProps.history.push('/' + getChannelSlug(channel));
    },
  };
}

export const ShowCaseContainer = connect<StoreProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Showcase);
