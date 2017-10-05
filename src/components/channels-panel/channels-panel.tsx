import React, { Component } from 'react';

import { SidePanel } from '../side-panel/side-panel';
import { Channel } from '../../entities/channel.model';
import { GroupedChannelsList } from '../channels/grouped-channels-list/grouped-channels-list';
import { ChannelsList } from '../channels/channels-list/channels-list';
import { ListSwitcher } from '../list-switcher/list-switcher';
import { ChannelListMode } from '../list-switcher/channel-list-modes';
import { NoFavourites } from '../no-favourites/no-favourites';
import { LocalStorageFactory } from '../../libs/storage';
import { EpgEntry } from '../../entities/epg-entry';
import autobind from 'autobind-decorator';

interface ChannelsPanelProps {
  favourites: number[];
  channels: Channel[];
  onChangeChannel: (channel: Channel) => void;
  current?: Channel;
  currentEpg?: {[chid: number]: EpgEntry};
}

export class ChannelsPanel extends Component<ChannelsPanelProps> {
  private modeStorage = LocalStorageFactory.create<ChannelListMode>('channelsPanelMode');
  private scrollbarController: any;

  public state = {
    currentListMode: this.modeStorage.get(ChannelListMode.grouped),
  };

  @autobind
  private switchListMode(type: ChannelListMode) {
    this.setState({ currentListMode: type });
    this.modeStorage.set(type);
  }

  private getFavouritesChannels() {
    return this.props.channels.filter((channel) => this.props.favourites.includes(channel.id));
  }

  private getChannelsListElement() {
    const props = {
      channels: this.props.channels,
      current: this.props.current,
      currentEpg: this.props.currentEpg,
      onChangeChannel: this.props.onChangeChannel,
      scrollbarController: this.scrollbarController,
    };

    if (this.state.currentListMode === ChannelListMode.grouped) {
      return <GroupedChannelsList {...props} />;
    }

    if (this.state.currentListMode === ChannelListMode.favourites) {
      if (this.props.favourites.length === 0) {
        return <NoFavourites/>;
      }

      return <ChannelsList {...props} channels={this.getFavouritesChannels()}/>;
    }

    return <ChannelsList {...props} />;
  }

  public render() {
    const header = <ListSwitcher
      onSwitch={this.switchListMode}
      current={this.state.currentListMode}/>;

    return (
      <SidePanel provideScrollbarCtrl={(ctrl) => this.scrollbarController = ctrl}
                 header={header}
                 body={this.getChannelsListElement()}/>
    );
  }
}
