import React, { ComponentType, PureComponent } from 'react';
import { Channel, ReadonlyChannelsCollection } from '../../entities/channel.model';
import { match as Match } from 'react-router';
import { AppState } from '../../store';
import { History } from 'history';
import { connect } from 'react-redux';

interface InjectedProps extends Partial<NeedsProps> {
  onChangeChannel?: (channel: Channel) => void;
  currentChannel?: Readonly<Channel>;
}

interface NeedsProps {
  history: History;
  match: Match<{
    channelSlug: string;
  }>;
  channels: ReadonlyChannelsCollection;
}

export const withChannelNavigation = (WrappedComponent: ComponentType<InjectedProps>) => {
  class WithChannelNavigation extends PureComponent<NeedsProps> {
    public static displayName = `WithChannelNavigation(${getDisplayName(WrappedComponent)})`;

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
        currentChannel: this.getCurrentChannel(this.props.channels, this.props.match.params.channelSlug),
        onChangeChannel: (channel: Channel) => this.props.history.push('/' + this.getChannelSlug(channel)),
        ...this.props,
      };

      return <WrappedComponent {...props} />;
    }
  }

  function mapStateToProps(state: AppState): Partial<NeedsProps> {
    return {
      channels: state.channels.channels,
    };
  }
  return connect(mapStateToProps)(WithChannelNavigation);
};

function getDisplayName(WrappedComponent: ComponentType) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
