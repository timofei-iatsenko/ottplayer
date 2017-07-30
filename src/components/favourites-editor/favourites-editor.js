import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SidePanel } from '../side-panel/side-panel';
import { SaveBar } from './save-bar/save-bar';
import { SelectableChannelsList } from '../channels/selectable-channels-list/selectable-channels-list';
import { Channel } from '../../entities/channel.model';

export class FavouritesEditor extends Component {
  static propTypes = {
    channels: PropTypes.arrayOf(PropTypes.instanceOf(Channel)).isRequired,
    favourites: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChangeChannel: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
  };

  state = {
    selectedChannels: this.props.favourites,
  };

  handleSelectionChange(selection) {
    this.setState({ selectedChannels: selection });
  }

  render() {
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
