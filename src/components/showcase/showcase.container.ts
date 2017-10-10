import { RouteComponentProps } from 'react-router';
import { connect, Dispatch } from 'react-redux';
import { AppState } from '../../store';
import { Channel, ReadonlyChannelsCollection } from '../../entities/channel.model';
import { Showcase } from './showcase';

interface RouterParams {
  channelSlug: string;
}

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

function mapStateToProps(state: AppState, ownProps: RouteComponentProps<RouterParams>) {
  const { channelSlug } = ownProps.match.params;
  return {
    currentKey: state.settings.currentKey,
    currentChannel: getCurrentChannel(state.channels, channelSlug),
    playlist: state.playlist,
    channels: state.channels,
    favourites: state.favourites,
    currentEpg: state.currentEpg,
  };
}

function getChannelSlug(channel: Channel) {
  return channel.id;
}

function mapDispatchToProps(_dispatch: Dispatch<void>, ownProps: RouteComponentProps<RouterParams>) {
  return {
    onChangeChannel: (channel: Channel) => {
      ownProps.history.push('/' + getChannelSlug(channel));
    },
  };
}

export const ShowCaseContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Showcase);
