import React, { PureComponent } from 'react';
import { VideoPlayer } from '../video-player/video-player';
import styles from './player-area.scss';
import { Channel } from '../../entities/channel.model';
import { ChannelEpg } from '../channel-epg/channel-epg.container';
import { AppState } from '../../store';
import { connect } from 'react-redux';
import { withChannelNavigation } from '../hoc/with-channel-navigation';

interface Props {
  currentChannel: Readonly<Channel>;
  currentKey: string;
  castingSessionState: cast.framework.SessionState;
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

  public render() {
    return (
      <div className={styles.mainPanel}>
        {!this.isCastingEnabled(this.props.castingSessionState) ? (
          <div className={styles.playerContainer}>
            <VideoPlayer src={this.getStreamUrl(this.props.currentChannel)}/>
          </div>
        ) : null}
        {this.props.currentChannel && <ChannelEpg channelId={this.props.currentChannel.id}/>}
      </div>
    );
  }
}

function mapStateToProps(state: AppState): Partial<Props> {
  return {
    currentKey: state.settings.currentKey,
    castingSessionState: state.casting.sessionState,
  };
}

export const PlayerArea = withChannelNavigation(connect(mapStateToProps)(PlayerAreaComponent));
