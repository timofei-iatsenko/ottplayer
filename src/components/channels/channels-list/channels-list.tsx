import React, { PureComponent } from 'react';
import { Channel, ReadonlyChannelsCollection } from '../../../entities/channel.model';
import { ChannelDetail } from '../channel-detail/channel-detail';
import styles from './channels-list.scss';
import Scrollbars from 'react-custom-scrollbars';

interface ChannelsListProps {
  onChangeChannel?: (channel: Channel) => void;
  channels: ReadonlyChannelsCollection;
  current?: Channel;
  visibleIds: number[];
}

export class ChannelsList extends PureComponent<ChannelsListProps> {
  private activeElementRef: HTMLElement;
  private scroll: Scrollbars;

  private isActive(chanel: Channel): boolean {
    return chanel === this.props.current;
  }

  private isVisible(chanel: Channel): boolean {
    return this.props.visibleIds.includes(chanel.id);
  }

  private isInitiallyScrolled = false;

  private scrollToActiveChannel() {
    if (!this.isInitiallyScrolled && this.scroll && this.activeElementRef) {
      this.isInitiallyScrolled = true;

      setTimeout(() => {
        const values = this.scroll.getValues();

        const topPoint = values.scrollTop;
        const bottomPoint = values.clientHeight + values.scrollTop;
        const elementTop = this.activeElementRef.offsetTop;

        if (topPoint < elementTop && bottomPoint < elementTop) {
          this.scroll.scrollTop(elementTop);
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

  private getStyles(channel: Channel): string {
    if (!this.isVisible(channel)) {
      return styles.hiddenItem;
    }
    return this.isActive(channel) ? styles.itemActive : styles.item;
  }

  public render() {
    return (
      <Scrollbars autoHide ref={(ref) => this.scroll = ref}>
        <div className={styles.channelsList}>
          {this.props.channels.map((channel) =>
            <div className={this.getStyles(channel)}
                 ref={(ref) => this.isActive(channel) && (this.activeElementRef = ref)}
                 onClick={() => this.props.onChangeChannel(channel)}
                 key={channel.id}>
              <div className={styles.icon}>
                <img src={channel.logo} alt=''/>
              </div>
              <ChannelDetail channel={channel}/>
            </div>,
          )}
        </div>
      </Scrollbars>
    );
  }
}
