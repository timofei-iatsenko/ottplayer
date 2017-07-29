import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Channel } from '../../../entities/channel.model';
import without from 'lodash/without';
import styles from './selectable-channels-list.scss';
import { ChannelsList } from '../channels-list/channels-list';


export class SelectableChannelsList extends Component {
  static propTypes = {
    onChangeChannel: PropTypes.func.isRequired,
    onSelectionChange: PropTypes.func.isRequired,
    selected: PropTypes.arrayOf(PropTypes.number).isRequired,
    channels: PropTypes.arrayOf(PropTypes.instanceOf(Channel)).isRequired,
  };

  /**
   * @param {Channel} channel
   */
  handleCheckBoxChange(channel) {
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

  isSelected(channel) {
    return this.props.selected.indexOf(channel.id) !== -1;
  }

  getControl() {
    return (channel) => (
      <div onClick={(e) => e.stopPropagation()} className={styles.checkbox}>
        <input defaultChecked={this.isSelected(channel)} type="checkbox" id={`channel${channel.id}`}
               onChange={() => this.handleCheckBoxChange(channel)}/>
        <label htmlFor={`channel${channel.id}`}>Select</label>
      </div>
    );
  }

  render() {
    return (
      <ChannelsList {...this.props} control={this.getControl()} />
    );
  }
}
