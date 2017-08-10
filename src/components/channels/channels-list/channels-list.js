import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Channel } from '../../../entities/channel.model';
import styles from './channels-list.scss';
import { EpgEntry } from '../../../entities/epg-entry';
import { ProgressBar } from '../../progress-bar/progress-bar';

export class ChannelsList extends Component {
  static propTypes = {
    onChangeChannel: PropTypes.func,
    channels: PropTypes.arrayOf(PropTypes.instanceOf(Channel)).isRequired,
    current: PropTypes.instanceOf(Channel),
    control: PropTypes.func,
    scrollbarController: PropTypes.object,
    currentEpg: PropTypes.objectOf(PropTypes.instanceOf(EpgEntry)),
  };

  isActive(chanel) {
    return chanel === this.props.current;
  }

  isInitiallyScrolled = false;

  scrollToActiveChannel() {
    if (!this.isInitiallyScrolled && this.props.scrollbarController && this.activeElementRef) {
      this.isInitiallyScrolled = true;
      setTimeout(() => {
        this.props.scrollbarController.scrollTop(this.activeElementRef.offsetTop);
      });
    }
  }

  componentDidMount() {
    this.scrollToActiveChannel();
  }

  componentDidUpdate() {
    this.scrollToActiveChannel();
  }

  /**
   * @param chId
   * @returns {EpgEntry}
   */
  getCurrentEpg(chId) {
    return (this.props.currentEpg && this.props.currentEpg[chId]);
  }

  /**
   *
   * @param {Channel} channel
   */
  getDetailsComponent(channel) {
    const epg = this.getCurrentEpg(channel.id);

    return (<div className={styles.details}>
      <h5 title={channel.name} className={styles.name}>{channel.name}</h5>
      {epg && <div title={epg.name} className={styles.currentProgram}>{epg.name}</div>}
      {epg && <ProgressBar startTime={epg.startTime} endTime={epg.endTime}/>}
    </div>);
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
                 ref={(ref) => this.isActive(channel) && (this.activeElementRef = ref)}
                 onClick={() => this.props.onChangeChannel(channel)} key={channel.id}>
              <div className={styles.icon}>
                {this.props.control && this.props.control(channel)}
                <img src={channel.logo} alt=""/>
              </div>
              {this.getDetailsComponent(channel)}
            </div>
        )}
      </div>
    );
  }
}
