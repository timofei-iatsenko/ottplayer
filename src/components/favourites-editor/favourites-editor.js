import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SidePanel } from '../side-panel/side-panel';
import { SaveBar } from '../save-bar/save-bar';
import { SelectableChannelsList } from '../channels/selectable-channels-list/selectable-channels-list';
import { Channel } from '../../entities/channel.model';
import { LocalStorageFactory } from '../../libs/storage';

export class FavouritesEditor extends Component {
  static propTypes = {
    channels: PropTypes.arrayOf(PropTypes.instanceOf(Channel)).isRequired,
    onChangeChannel: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  state = {
    selectedChannels: [],
  };

  constructor() {
    super();
    this.storage = LocalStorageFactory.create('favourites');
  }

  saveFavourites() {
    this.storage.set(this.state.selectedChannels);
    this.props.onCancel();
  }

  handleSelectionChange(selection) {
    this.setState({ selectedChannels: selection });
  }

  render() {
    const header = <SaveBar
      saveDisabled={this.state.selectedChannels.length === 0}
      onSave={this.saveFavourites.bind(this)}
      onCancel={this.props.onCancel}/>;

    const body = <SelectableChannelsList
      channels={this.props.channels}
      onChangeChannel={this.props.onChangeChannel}
      onSelectionChange={this.handleSelectionChange.bind(this)} />;


    return (
      <SidePanel header={header} body={body}/>
    );
  }
}
