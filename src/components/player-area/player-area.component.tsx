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
}

class PlayerAreaComponent extends PureComponent<Props> {
  get streamUrl() {
    return ((this.props.currentChannel && this.props.currentChannel.stream) || '')
      .replace('{KEY}', this.props.currentKey);
  }

  public render() {
    return (
      <div className={styles.mainPanel}>
        <div className={styles.playerContainer}>
          <VideoPlayer src={this.streamUrl}></VideoPlayer>
        </div>
        {this.props.currentChannel && <ChannelEpg channelId={this.props.currentChannel.id}/>}
      </div>
    );
  }
}

function mapStateToProps(state: AppState) {
  return {
    currentKey: state.settings.currentKey,
  };
}

export const PlayerArea = withChannelNavigation(connect(mapStateToProps)(PlayerAreaComponent));
