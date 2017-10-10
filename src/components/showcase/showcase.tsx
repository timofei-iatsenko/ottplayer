import React, { PureComponent } from 'react';
import styles from './showcase.scss';
import { VideoPlayer } from '../video-player/video-player';
import { Playlist } from '../../entities/playlist.model';
import { ChannelsPanel } from '../channels-panel/channels-panel';
import { Route, Switch } from 'react-router-dom';
import { ChannelEpg } from '../channel-epg/channel-epg';
import { Channel, ReadonlyChannelsCollection } from '../../entities/channel.model';
import { EpgDictionary } from '../../entities/epg-entry';

export interface ShowcaseProps {
  currentKey: string;
  channels: ReadonlyChannelsCollection;
  favourites: ReadonlyArray<number>;
  currentEpg: Readonly<EpgDictionary>;
  playlist: Readonly<Playlist>;
  currentChannel: Readonly<Channel>;

  onChangeChannel: (channel: Channel) => void;
}

export class Showcase extends PureComponent<ShowcaseProps> {
  private get currentChannel(): Channel {
    return this.props.currentChannel;
  }

  get streamUrl() {
    return ((this.currentChannel && this.currentChannel.stream) || '')
      .replace('{KEY}', this.props.currentKey);
  }

  public render() {
    const commonProps = {
      channels: this.props.channels  || [],
      currentEpg: this.props.currentEpg,
      favourites: this.props.favourites,
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
          {/*{this.state.playlist && (<CurrentEpg onDataReceived={this.setCurrentEpg.bind(this)} epgUrl={this.state.playlist.urlEpg + '/channel_now'}/>)}*/}
          <Switch>
            {/*<Route exact path={'/edit-favourites'} render={favouritesEditor}/>*/}
            <Route path='/' render={channelsPanel}/>
          </Switch>

          <div className={styles.mainPanel}>
            <div className={styles.playerContainer}>
              <VideoPlayer src={this.streamUrl}></VideoPlayer>
            </div>
            {this.currentChannel && <ChannelEpg epgUrl={`${this.props.playlist.urlEpg}channel/${this.currentChannel.id}`} />}
          </div>
        </div>
    );
  }
}
