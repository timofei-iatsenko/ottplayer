import React, { PureComponent } from 'react';
import PlayIcon from 'react-icons/lib/md/play-arrow';
import StopIcon from 'react-icons/lib/md/stop';
import styles from './player-control-bar.scss';
import { connect } from 'react-redux';
import { AppState } from '../../store';
import { Channel } from '../../entities/channel.model';
import { selectChannelEpg, epgInAir } from '../../store/reducers/epg.reducer';
import { EpgEntry } from '../../entities/epg-entry';
import { selectCurrentChannel } from '../../store/reducers/channels.reducer';
import CastConnectedIcon from 'react-icons/lib/md/cast-connected';
import { ProgressBar } from '../progress-bar/progress-bar';
import { Time } from '../formatters/time';

interface Props {
  currentChannel: Channel;
  epg: EpgEntry[];
}

export class PlayerControlBarComponent extends PureComponent<Props> {
  private get isCasting() {
    return true;
  }

  public render() {
    const epg = this.props.epg.find(epgInAir) || ({} as EpgEntry);

    if (!this.props.currentChannel) {
      return null;
    }

    return (
      <div className={styles.host}>
        {this.isCasting && <div className={styles.icon}>
          <img src={this.props.currentChannel.logo}></img>
          <div className={styles.castOverlay}>
            <CastConnectedIcon/>
          </div>
        </div>}

        <div className={styles.wrap}>
          <div className={styles.progress}>
            <ProgressBar startTime={epg.startTime} endTime={epg.endTime}/>
            {epg.startTime && <span className={styles.startTime}><Time>{epg.startTime}</Time></span>}
            {epg.endTime && <span className={styles.endTime}><Time>{epg.endTime}</Time></span>}
          </div>

          <div className={styles.programInfo}>
            <div className={styles.programName}>
              {epg.name}
            </div>

            <div className={styles.channelName}>
              {this.props.currentChannel.name}
            </div>
          </div>

          <div className={styles.buttons}>
            <button className={styles.playPauseBtn}><PlayIcon/></button>
            <button className={styles.stopBtn}><StopIcon/></button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: AppState): Partial<Props> {
  return {
    currentChannel: selectCurrentChannel(state),
    epg: selectChannelEpg(state, state.channels.selectedChannelId),
  };
}

export const PlayerControlBar = connect(
  mapStateToProps,
)(PlayerControlBarComponent);
