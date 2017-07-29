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
    favourites: PropTypes.arrayOf(PropTypes.number).isRequired,
    channels: PropTypes.arrayOf(PropTypes.instanceOf(Channel)).isRequired,
    onChangeChannel: PropTypes.func.isRequired,
  };

  storage = LocalStorageFactory.create('channelsPanelMode');

  state = {
    currentListMode: this.storage.get(ChannelListMode.grouped),
  };

  switchListMode(type) {
    this.setState({ currentListMode: type });
    this.storage.set(type);
  }

  getChannelsList() {
    if (this.state.currentListMode === ChannelListMode.grouped) {
      return (
        <GroupedChannelsList
          channels={this.props.channels} onChangeChannel={this.props.onChangeChannel}/>
      );
    }

    if (this.state.currentListMode === ChannelListMode.favourites
      && this.props.favourites.length === 0) {
      return <NoFavourites/>
    }

    return (
      <ChannelsList
        channels={this.props.channels} onChangeChannel={this.props.onChangeChannel}/>
    );
  }

  render() {
    const header = <ListSwitcher
      onSwitch={this.switchListMode.bind(this)}
      current={this.state.currentListMode}/>;

    return (
      <SidePanel header={header} body={this.getChannelsList()}/>
    );
  }
}
