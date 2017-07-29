import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Channel } from '../../entities/channel.model';
import without from 'lodash/without';
import selectableStyles from './selectable-channels-list.scss';
import channelListStyles from './../channels-list/channels-list.scss';

const styles = {};
Object.assign(styles, selectableStyles, channelListStyles);


export class SelectableChannelsList extends Component {
  static propTypes = {
    onChangeChannel: PropTypes.func.isRequired,
    onSelectionChange: PropTypes.func.isRequired,
    channels: PropTypes.arrayOf(PropTypes.instanceOf(Channel)).isRequired,
  };

  state = {
    selected: []
  };

  /**
   * @param {Channel} channel
   */
  handleCheckBoxChange(channel) {
    let selected;

    if (this.isSelected(channel)) {
      selected = without(this.state.selected, channel.id);
    } else {
      selected = this.state.selected.slice(0);
      selected.push(channel.id);
    }

    this.setState({ selected });
    this.props.onSelectionChange(selected);
  }

  isSelected(channel) {
    return this.state.selected.indexOf(channel.id) !== -1;
  }

  render() {
    return (
      <div className={styles.channelsList}>
        {this.props.channels.map(
          /**
           * @param {Channel} channel
           */
          (channel) =>
          <div className={styles.item} onClick={() => this.props.onChangeChannel(channel)} key={channel.id}>
            <div onClick={(e) => e.stopPropagation()} className={styles.checkbox}>
              <input defaultChecked={this.isSelected(channel)} type="checkbox" id={`channel${channel.id}`}
                     onChange={() => this.handleCheckBoxChange(channel)}/>
              <label htmlFor={`channel${channel.id}`}>Select</label>
            </div>
            <div className={styles.icon}><img src={channel.logo} alt=""/></div>
            <div className={styles.details}>
              <h5 className={styles.name}>{channel.name}</h5>
              <div className={styles.currentProgram}></div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
