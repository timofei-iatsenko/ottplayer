import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { SidePanel } from '../side-panel/side-panel';
import { SelectableChannelsList } from '../channels/selectable-channels-list/selectable-channels-list';
import { Channel } from '../../entities/channel.model';
import { GroupedChannelsList } from '../channels/grouped-channels-list/grouped-channels-list';
import { ChannelsList } from '../channels/channels-list/channels-list';
import { ListSwitcher } from '../list-switcher/list-switcher';
import { ChannelListMode } from '../list-switcher/channel-list-modes';

export class ChannelsPanel extends Component {
  static propTypes = {
    channels: PropTypes.arrayOf(PropTypes.instanceOf(Channel)).isRequired,
    onChangeChannel: PropTypes.func.isRequired,
  };

  state = {
    selectedChannels: [],
    currentChannelListType: ChannelListMode.grouped,
  };

  switchChannelListType(type) {
    this.setState({ currentChannelListType: type });
  }

  getChannelsList() {
    if (this.state.currentChannelListType === ChannelListMode.grouped) {
      return (
        <GroupedChannelsList
          channels={this.props.channels} onChangeChannel={this.props.onChangeChannel}/>
      );
    }

    return (
      <ChannelsList
        channels={this.props.channels} onChangeChannel={this.props.onChangeChannel}/>
    );
  }

  render() {
    const header = <ListSwitcher
      onSwitch={this.switchChannelListType.bind(this)}
      current={this.state.currentChannelListType}/>;

    return (
      <SidePanel header={header} body={this.getChannelsList()}/>
    );
  }
}
