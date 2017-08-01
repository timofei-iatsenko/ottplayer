import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { SidePanel } from '../side-panel/side-panel';
import { Channel } from '../../entities/channel.model';
import { GroupedChannelsList } from '../channels/grouped-channels-list/grouped-channels-list';
import { ChannelsList } from '../channels/channels-list/channels-list';
import { ListSwitcher } from '../list-switcher/list-switcher';
import { ChannelListMode } from '../list-switcher/channel-list-modes';
import { NoFavourites } from '../no-favourites/no-favourites';
import { LocalStorageFactory } from '../../libs/storage';

export class ChannelsPanel extends Component {
  static propTypes = {
    favourites: PropTypes.arrayOf(PropTypes.string).isRequired,
    channels: PropTypes.arrayOf(PropTypes.instanceOf(Channel)).isRequired,
    onChangeChannel: PropTypes.func.isRequired,
    current: PropTypes.instanceOf(Channel),
  };

  modeStorage = LocalStorageFactory.create('channelsPanelMode');

  state = {
    currentListMode: this.modeStorage.get(ChannelListMode.grouped),
  };

  switchListMode(type) {
    this.setState({ currentListMode: type });
    this.modeStorage.set(type);
  }


  getFavouritesChannels() {
    return this.props.channels.filter((channel) => this.props.favourites.includes(channel.id))
  }

  getChannelsListElement() {
    const props = {
      channels: this.props.channels,
      current: this.props.current,
      onChangeChannel: this.props.onChangeChannel,
      scrollbarController: this.scrollbarController,
    };

    if (this.state.currentListMode === ChannelListMode.grouped) {
      return <GroupedChannelsList {...props} />;
    }

    if (this.state.currentListMode === ChannelListMode.favourites) {
      if (this.props.favourites.length === 0) {
        return <NoFavourites/>
      }

      return <ChannelsList {...props} channels={this.getFavouritesChannels()}/>;
    }

    return <ChannelsList {...props} />;
  }

  render() {
    const header = <ListSwitcher
      onSwitch={this.switchListMode.bind(this)}
      current={this.state.currentListMode}/>;

    return (
      <SidePanel provideScrollbarCtrl={(ctrl) => this.scrollbarController = ctrl}
                 header={header}
                 body={this.getChannelsListElement()}/>
    );
  }
}
