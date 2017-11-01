import React, { PureComponent } from 'react';
import styles from './showcase.scss';
import { VideoPlayer } from '../video-player/video-player';
import { Playlist } from '../../entities/playlist.model';
import { ChannelsPanel } from '../channels-panel/channels-panel.container';
import { Route, Switch } from 'react-router-dom';
import { ChannelEpg } from '../channel-epg/channel-epg.container';
import { Channel } from '../../entities/channel.model';

export interface StoreProps {
  currentKey: string;
  playlist: Readonly<Playlist>;
  currentChannel: Readonly<Channel>;
  playlistUrl: string;
}

export interface DispatchProps {
  onFetchData: (playlistUrl: string) => void;
  onUnmount: () => void;
  onChangeChannel: (channel: Channel) => void;
}

type ShowcaseProps = StoreProps & DispatchProps;

export class Showcase extends PureComponent<ShowcaseProps> {
  private get currentChannel(): Channel {
    return this.props.currentChannel;
  }

  public componentDidMount() {
    this.props.onFetchData(this.props.playlistUrl);
  }

  public componentWillUnmount() {
    this.props.onUnmount();
  }

  get streamUrl() {
    return ((this.currentChannel && this.currentChannel.stream) || '')
      .replace('{KEY}', this.props.currentKey);
  }

  public render() {
    const commonProps = {
      onChangeChannel: this.props.onChangeChannel,
      current: this.currentChannel,
    };

    // const favouritesEditor = ({history}: RouteComponentProps<any>) => (
    //   <FavouritesEditor {...commonProps}
    //                     onSave={(f) => {this.saveFavourites(f); history.push('/'); }}
    //                     onCancel={() => history.push('/')}/>);

    const channelsPanel = () => <ChannelsPanel {...commonProps}/>;

    return (
        <div className={styles.host}>
          <Switch>
            {/*<Route exact path={'/edit-favourites'} render={favouritesEditor}/>*/}
            <Route path='/' render={channelsPanel}/>
          </Switch>

          <div className={styles.mainPanel}>
            <div className={styles.playerContainer}>
              <VideoPlayer src={this.streamUrl}></VideoPlayer>
            </div>
            {this.currentChannel && <ChannelEpg channelId={this.currentChannel.id} />}
          </div>
        </div>
    );
  }
}
