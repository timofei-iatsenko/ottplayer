import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Channel } from '../../../entities/channel.model';
import styles from './channels-list.scss';

export class ChannelsList extends Component {
  static propTypes = {
    onChangeChannel: PropTypes.func,
    channels: PropTypes.arrayOf(PropTypes.instanceOf(Channel)).isRequired,
    current: PropTypes.instanceOf(Channel),
    control: PropTypes.func,
  };

  isActive(chanel) {
    return chanel === this.props.current;
  }

  render() {
    return (
      <div className={styles.channelsList}>
        {this.props.channels.map(
          /**
           * @param {Channel} channel
           */
          (channel) =>
          <div className={this.isActive(channel) ? styles.itemActive : styles.item}
                  onClick={() => this.props.onChangeChannel(channel)} key={channel.id}>
            {this.props.control && this.props.control(channel)}
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
