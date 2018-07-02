import React, { PureComponent } from 'react';
import { Channel, ReadonlyChannelsCollection } from '../../../entities/channel.model';
import { ChannelDetail } from '../channel-detail/channel-detail';
import styles from './channels-list.scss';
import Scrollbars from 'react-custom-scrollbars';
import { ChannelLink } from '../../channel-link/channel-link';

interface ChannelsListProps {
  channels: ReadonlyChannelsCollection;
  selectedChannelId: number;
  visibleIds: number[];
}

export class ChannelsList extends PureComponent<ChannelsListProps> {
  private activeElementRef: HTMLElement;
  private scroll: Scrollbars;

  private isActive(chanel: Channel): boolean {
    return chanel.id === this.props.selectedChannelId;
  }

  private isVisible(chanel: Channel): boolean {
    return this.props.visibleIds.includes(chanel.id);
  }

  private isInitiallyScrolled = false;

  private scrollToActiveChannel() {
    if (!this.isInitiallyScrolled && this.scroll && this.activeElementRef) {
      this.isInitiallyScrolled = true;

      const values = this.scroll.getValues();

      const topPoint = values.scrollTop;
      const bottomPoint = values.clientHeight + values.scrollTop;
      const elementTop = this.activeElementRef.offsetTop;

      if (topPoint < elementTop && bottomPoint < elementTop) {
        this.scroll.scrollTop(elementTop);
      }
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
            <ChannelLink
              channel={channel}
              key={channel.id}
              className={this.getStyles(channel)}
            >
              <div
                className={styles.itemWrapper}
                ref={(ref) => this.isActive(channel) && (this.activeElementRef = ref)}
              >
                <div className={styles.icon}>
                  <img src={channel.logo} alt=''/>
                </div>
                <ChannelDetail channel={channel}/>
              </div>
            </ChannelLink>)}
        </div>
      </Scrollbars>
    );
  }
}
