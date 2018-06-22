import React, { PureComponent } from 'react';
import { VideoPlayer } from '../video-player/video-player';
import styles from './player-area.scss';
import { Channel } from '../../entities/channel.model';
import { ChannelEpg } from '../channel-epg/channel-epg.container';
import { AppState } from '../../store';
import { connect } from 'react-redux';
import { selectCurrentChannel } from '../../store/reducers/channels.reducer';
import Scrollbars from 'react-custom-scrollbars';
import ArrowLeft from 'react-icons/lib/md/chevron-left';
import autobind from 'autobind-decorator';
import { EpgEntry } from '../../entities/epg-entry';
import { epgInAir, selectChannelEpg } from '../../store/reducers/epg.reducer';
import { ProgressBar } from '../progress-bar/progress-bar';
import { Time } from '../formatters/time';
import { Duration } from '../formatters/duration';

interface Props {
  currentChannel: Readonly<Channel>;
  currentKey: string;
  castingSessionState: cast.framework.SessionState;
  epg: EpgEntry[];
}

class PlayerAreaComponent extends PureComponent<Props> {
  public getStreamUrl(channel: Channel) {
    return ((channel && channel.stream) || '')
      .replace('{KEY}', this.props.currentKey);
  }

  public componentWillReceiveProps(nextProps: Props) {
    this.setMediaToCast(nextProps.castingSessionState, nextProps.currentChannel);
  }

  private setMediaToCast(sessionState: string, channel: Channel) {
    if (!this.isCastingEnabled(sessionState) || !channel) {
      return;
    }

    // todo, extract to side effects
    const media: any = chrome.cast.media;
    const castSession = cast.framework.CastContext.getInstance().getCurrentSession();

    const mediaInfo = new media.MediaInfo(this.getStreamUrl(channel), 'application/x-mpegURL');
    const request = new media.LoadRequest(mediaInfo);

    mediaInfo.metadata = new media.GenericMediaMetadata();
    mediaInfo.metadata.title = channel.name;

    castSession.loadMedia(request);
  }

  private isCastingEnabled(sessionState: string): boolean {
    return ['SESSION_STARTED', 'SESSION_RESUMED'].includes(sessionState);
  }

  @autobind
  private goBack() {

  }

  public render() {
    const epg = this.props.epg.find(epgInAir) || ({} as EpgEntry);

    if (!this.props.currentChannel) {
      return null;
    }

    return (
      <div className={styles.mainPanel}>
        <div className={styles.topControls}>
          <button type='button' onClick={this.goBack} className={styles.backBtn}><ArrowLeft/>
          </button>
        </div>

        {!this.isCastingEnabled(this.props.castingSessionState) && (
          <div className={styles.playerContainer}>
            <VideoPlayer src={this.getStreamUrl(this.props.currentChannel)}/>
          </div>
        )}

        <div className={styles.underWrap}>
          <div className={styles.progress}>
            <ProgressBar startTime={epg.startTime} endTime={epg.endTime}/>
          </div>

          <Scrollbars autoHide>
            <div className={styles.videoDetails}>
              <div className={styles.programDetails}>
                <div className={styles.programName}>
                  {epg.name}
                </div>

                <div className={styles.programTimebox}>
                  <Time>{epg.startTime}</Time> - <Time>{epg.endTime}</Time> (<Duration>{epg.endTime - epg.startTime}</Duration>)
                </div>

                <div className={styles.programDescription}>
                  {epg.descr}
                </div>
              </div>

              <div className={styles.channelDetails}>
                <div className={styles.channelLogo}>
                  <img src={this.props.currentChannel.logo}/>
                </div>

                <div className={styles.channelName}>
                  {this.props.currentChannel.name}
                </div>
              </div>

            </div>


            {this.props.currentChannel && <ChannelEpg channelId={this.props.currentChannel.id}/>}
          </Scrollbars>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: AppState): Partial<Props> {
  return {
    currentKey: state.settings.currentKey,
    castingSessionState: state.casting.sessionState,
    currentChannel: selectCurrentChannel(state),
    epg: selectChannelEpg(state, state.channels.selectedChannelId),
  };
}

export const PlayerArea = connect(mapStateToProps)(PlayerAreaComponent);
