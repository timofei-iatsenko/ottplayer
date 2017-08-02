import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Channel } from '../../../entities/channel.model';
import styles from './channels-list.scss';
import barStyles from './progress-bar.scss';
import { EpgEntry } from '../../../entities/epg-entry';

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

  formatTime(ts) {
    const date = new Date(ts * 1000);
    return `${date.getHours()}:${date.getMinutes()},`
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

      {epg && <div className={barStyles.host}>
        <div className={barStyles.startTime}>{this.formatTime(epg.time)}</div>
        <div className={barStyles.bar}>
          <div className={barStyles.barInner} style={{ width: '25%' }}></div>
        </div>
        <div className={barStyles.endTime}>{this.formatTime(epg.timeTo)}</div>
      </div>}
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
