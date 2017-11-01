import React, { ComponentType, PureComponent } from 'react';
import { Channel, ReadonlyChannelsCollection } from '../../entities/channel.model';
import { match as Match } from 'react-router';
import { store } from '../../store';
import { History } from 'history';

interface InjectedProps extends Partial<NeedsProps> {
  onChangeChannel?: (channel: Channel) => void;
  currentChannel?: Readonly<Channel>;
}

interface NeedsProps {
  history: History;
  match: Match<{
    channelSlug: string;
  }>;
}

export const withChannelNavigation = (WrappedComponent: ComponentType<InjectedProps>) => {
  return class extends PureComponent<NeedsProps> {
    private getCurrentChannel(channels: ReadonlyChannelsCollection, channelSlug: string): Channel {
      if (!channels.length || !channelSlug) {
        return null;
      }

      const [id] = channelSlug.match(/^[^-]+/);

      if (id) {
        return channels.find((ch) => ch.id === +id);
      }

      return null;
    }

    private getChannelSlug(channel: Channel) {
      return channel.id;
    }

    public render() {
      const props = {
        currentChannel: this.getCurrentChannel(store.getState().playlist.channels, this.props.match.params.channelSlug),
        onChangeChannel: (channel: Channel) => this.props.history.push('/' + this.getChannelSlug(channel)),
        ...this.props,
      };

      return <WrappedComponent {...props} />;
    }
  };
};
