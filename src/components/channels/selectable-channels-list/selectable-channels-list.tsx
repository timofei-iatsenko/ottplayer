import React, { Component } from 'react';
import { Channel, ReadonlyChannelsCollection } from '../../../entities/channel.model';
import without from 'lodash/without';
import styles from './selectable-channels-list.scss';
import { ChannelsList } from '../channels-list/channels-list';

interface SelectableChannelsListProps {
  onChangeChannel: (channel: Channel) => void;
  onSelectionChange: (selected: number[]) => void;
  selected: number[];
  channels: ReadonlyChannelsCollection;
}

export class SelectableChannelsList extends Component<SelectableChannelsListProps> {
  private handleCheckBoxChange(channel: Channel) {
    let selected;

    if (this.isSelected(channel)) {
      selected = without(this.props.selected, channel.id);
    } else {
      selected = this.props.selected.slice(0);
      selected.push(channel.id);
    }

    this.setState({ selected });
    this.props.onSelectionChange(selected);
  }

  private isSelected(channel: Channel) {
    return this.props.selected.indexOf(channel.id) !== -1;
  }

  private getControl() {
    return (channel: Channel) => (
      <div onClick={(e) => e.stopPropagation()} className={styles.checkbox}>
        <input defaultChecked={this.isSelected(channel)} type='checkbox' id={`channel${channel.id}`}
               onChange={() => this.handleCheckBoxChange(channel)}/>
        <label htmlFor={`channel${channel.id}`}>Select</label>
      </div>
    );
  }

  public render() {
    return (
      <ChannelsList {...this.props} control={this.getControl()} />
    );
  }
}
