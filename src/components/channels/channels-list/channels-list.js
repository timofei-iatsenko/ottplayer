import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Channel } from '../../../entities/channel.model';
import styles from './channels-list.scss';
import barStyles from './progress-bar.scss';

export class ChannelsList extends Component {
  static propTypes = {
    onChangeChannel: PropTypes.func,
    channels: PropTypes.arrayOf(PropTypes.instanceOf(Channel)).isRequired,
    current: PropTypes.instanceOf(Channel),
    control: PropTypes.func,
    scrollbarController: PropTypes.object,
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
              <div className={styles.details}>
                <h5 className={styles.name}>{channel.name}</h5>
                <div className={styles.currentProgram}>Охотник за головами (16+)</div>

                <div className={barStyles.host}>
                  <div className={barStyles.startTime}>17.50</div>
                  <div className={barStyles.bar}>
                    <div className={barStyles.barInner} style={{ width: '25%' }}></div>
                  </div>
                  <div className={barStyles.endTime}>19.30</div>
                </div>
              </div>
            </div>
        )}
      </div>
    );
  }
}
