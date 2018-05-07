import React, { PureComponent, ReactFragment } from 'react';
import { Channel, ReadonlyChannelsCollection } from '../../../entities/channel.model';
import { ChannelDetail } from '../channel-detail/channel-detail';
import styles from './channels-list.scss';

interface ChannelsListProps {
  onChangeChannel?: (channel: Channel) => void;
  channels: ReadonlyChannelsCollection;
  current?: Channel;
  control?: (channel: Channel) => ReactFragment;
  scrollbarController?: any;
}

export class ChannelsList extends PureComponent<ChannelsListProps> {
  private activeElementRef: HTMLElement;

  private isActive(chanel: Channel) {
    return chanel === this.props.current;
  }

  private isInitiallyScrolled = false;

  private scrollToActiveChannel() {
    if (!this.isInitiallyScrolled && this.props.scrollbarController && this.activeElementRef) {
      this.isInitiallyScrolled = true;

      setTimeout(() => {
        const values = this.props.scrollbarController.getValues();

        const topPoint = values.scrollTop;
        const bottomPoint = values.clientHeight + values.scrollTop;
        const elementTop = this.activeElementRef.offsetTop;

        if (topPoint < elementTop && bottomPoint < elementTop) {
          this.props.scrollbarController.scrollTop(elementTop);
        }
      });
    }
  }

  public componentDidMount() {
    this.scrollToActiveChannel();
  }

  public componentDidUpdate() {
    this.scrollToActiveChannel();
  }

  public render() {
    return (
      <div className={styles.channelsList}>
        {this.props.channels.map((channel) =>
          <div className={this.isActive(channel) ? styles.itemActive : styles.item}
               ref={(ref) => this.isActive(channel) && (this.activeElementRef = ref)}
               onClick={() => this.props.onChangeChannel(channel)}
               key={channel.id}>
            <div className={styles.icon}>
              {this.props.control && this.props.control(channel)}
              <img src={channel.logo} alt=''/>
            </div>
            <ChannelDetail channel={channel} />
          </div>,
        )}
      </div>
    );
  }
}
