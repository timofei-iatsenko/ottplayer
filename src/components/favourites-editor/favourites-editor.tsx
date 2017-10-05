import React, { Component } from 'react';
import { SidePanel } from '../side-panel/side-panel';
import { SaveBar } from './save-bar/save-bar';
import { SelectableChannelsList } from '../channels/selectable-channels-list/selectable-channels-list';
import { Channel } from '../../entities/channel.model';

interface FavouritesEditorProps {
  channels: Channel[];
  favourites: number[];
  onChangeChannel: (channel: Channel) => void;
  onCancel: () => void;
  onSave: (selection: number[]) => void;
}

export class FavouritesEditor extends Component<FavouritesEditorProps> {
  public state = {
    selectedChannels: this.props.favourites,
  };

  private handleSelectionChange(selection: number[]) {
    this.setState({ selectedChannels: selection });
  }

  public render() {
    const header = <SaveBar
      saveDisabled={this.state.selectedChannels.length === 0}
      onSave={() => this.props.onSave(this.state.selectedChannels)}
      onCancel={this.props.onCancel}/>;

    const body = <SelectableChannelsList
      channels={this.props.channels}
      selected={this.state.selectedChannels}
      onChangeChannel={this.props.onChangeChannel}
      onSelectionChange={this.handleSelectionChange.bind(this)} />;

    return (
      <SidePanel header={header} body={body}/>
    );
  }
}
