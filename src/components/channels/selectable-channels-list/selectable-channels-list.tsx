import React, { PureComponent } from 'react';
import { Channel, ReadonlyChannelsCollection } from '../../../entities/channel.model';
import styles from './selectable-channels-list.scss';
import { ChannelsList } from '../channels-list/channels-list';

interface SelectableChannelsListProps {
  onChangeChannel: (channel: Channel) => void;
  onSelectionChange: (selected: ReadonlyArray<number>) => void;
  selected: ReadonlyArray<number>;
  channels: ReadonlyChannelsCollection;
}

export class SelectableChannelsList extends PureComponent<SelectableChannelsListProps> {
  private handleCheckBoxChange(channel: Channel) {
    let selected;

    if (this.isSelected(channel)) {
      selected = this.props.selected.filter((id) => id !== channel.id);
    } else {
      selected = [...this.props.selected, channel.id];
    }

    this.props.onSelectionChange(selected);
  }

  private isSelected(channel: Channel) {
    return this.props.selected.includes(channel.id);
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
      <ChannelsList {...this.props} control={this.getControl()}/>
    );
  }
}
