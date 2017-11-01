import React, { PureComponent, ReactFragment } from 'react';
import { Channel, ReadonlyChannelsCollection } from '../../../entities/channel.model';
import styles from './channels-list.scss';
import { EpgEntry } from '../../../entities/epg-entry';
import { ProgressBar } from '../../progress-bar/progress-bar';

interface ChannelsListProps {
  onChangeChannel?: (channel: Channel) => void;
  channels: ReadonlyChannelsCollection;
  current?: Channel;
  control?: (channel: Channel) => ReactFragment;
  scrollbarController?: any;
  currentEpg?: { [chid: number]: EpgEntry };
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

  private getCurrentEpg(chId: number): EpgEntry {
    return (this.props.currentEpg && this.props.currentEpg[chId]);
  }

  private getDetailsComponent(channel: Channel): ReactFragment {
    const epg = this.getCurrentEpg(channel.id);

    return (<div className={styles.details}>
      <h5 title={channel.name} className={styles.name}>{channel.name}</h5>
      {epg && <div title={epg.name} className={styles.currentProgram}>{epg.name}</div>}
      {epg && <ProgressBar startTime={epg.startTime} endTime={epg.endTime}/>}
    </div>);
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
            {this.getDetailsComponent(channel)}
          </div>,
        )}
      </div>
    );
  }
}
