import React, { PureComponent } from 'react';

import { SidePanel } from '../side-panel/side-panel';
import { Channel, ReadonlyChannelsCollection } from '../../entities/channel.model';
import { GroupedChannelsList } from '../channels/grouped-channels-list/grouped-channels-list';
import { ChannelsList } from '../channels/channels-list/channels-list';
import { ListSwitcher } from '../list-switcher/list-switcher';
import { ChannelListMode } from '../list-switcher/channel-list-modes';
import { NoFavourites } from '../no-favourites/no-favourites';
import { EpgDictionary } from '../../entities/epg-entry';

export interface OwnProps {
  onChangeChannel: (channel: Channel) => void;
  current: Channel;
}

export interface StateProps {
  favourites: ReadonlyChannelsCollection;
  channels: ReadonlyChannelsCollection;
  currentEpg: EpgDictionary;
  listMode: ChannelListMode;
}

export interface DispatchProps {
  onChangeListMode: (mode: ChannelListMode) => void;
}

type Props = OwnProps & StateProps & DispatchProps;

export class ChannelsPanelComponent extends PureComponent<Props> {
  private scrollbarController: any;

  get listMode() {
    return this.props.listMode;
  }

  private getChannelsListElement() {
    const props = {
      channels: this.props.channels,
      current: this.props.current,
      currentEpg: this.props.currentEpg,
      onChangeChannel: this.props.onChangeChannel,
      scrollbarController: this.scrollbarController,
    };

    if (this.listMode === ChannelListMode.grouped) {
      return <GroupedChannelsList {...props} />;
    }

    if (this.listMode === ChannelListMode.favourites) {
      if (this.props.favourites.length === 0) {
        return <NoFavourites/>;
      }

      return <ChannelsList {...props} channels={this.props.favourites}/>;
    }

    return <ChannelsList {...props} />;
  }

  public render() {
    const header = <ListSwitcher
      onSwitch={this.props.onChangeListMode}
      current={this.props.listMode}/>;

    return (
      <SidePanel provideScrollbarCtrl={(ctrl) => this.scrollbarController = ctrl}
                 header={header}
                 body={this.getChannelsListElement()}/>
    );
  }
}
