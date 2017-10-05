import React, { Component } from 'react';
import styles from './showcase.scss';
import { VideoPlayer } from '../video-player/video-player';
import { Playlist } from '../../entities/playlist.model';
import { FavouritesEditor } from '../favourites-editor/favourites-editor';
import { ChannelsPanel } from '../channels-panel/channels-panel';
import { Route, Switch } from 'react-router-dom';
import { LocalStorageFactory } from '../../libs/storage';
import { CurrentEpg } from '../current-epg/current-epg';
import { ChannelEpg } from '../channel-epg/channel-epg';
import { Channel } from '../../entities/channel.model';
import { EpgDictionary } from '../../entities/epg-entry';
import { History } from 'history';
import { RouteComponentProps } from 'react-router';

interface RouterParams {
  channelSlug: string;
}
interface ShowcaseProps extends RouteComponentProps<RouterParams> {
  currentKey: string;
  playlistUrl: string;
}

export class Showcase extends Component<ShowcaseProps> {
  private favouritesStorage = LocalStorageFactory.create<number[]>('favourites');

  public state = {
    favourites: this.favouritesStorage.get([]),
    channels: [] as Channel[],
    currentEpg: {} as EpgDictionary,
    playlist: null as Playlist,
  };

  private setCurrentEpg(currentEpg: EpgDictionary) {
    this.setState({currentEpg});
  }

  public componentWillMount() {
    this.loadPlaylist().then((playlist) => {
      this.setState({
        playlist,
      });
    });
  }

  private loadPlaylist(): Promise<Playlist> {
    const url = this.props.playlistUrl;
    return window.fetch(url)
      .then((r) => r.json())
      .then((d) => new Playlist(d.playlist));
  }

  private get currentChannel(): Channel {
    if (!this.state.playlist) {
      return null;
    }

    return this.getInitialChannel(this.state.playlist.channels);
  }

  get streamUrl() {
    return ((this.currentChannel && this.currentChannel.stream) || '')
      .replace('{KEY}', this.props.currentKey);
  }

  /**
   * @param {Channel[]} channels
   * @return Channel
   */
  private getInitialChannel(channels: Channel[]): Channel {
    const { channelSlug } = this.props.match.params;

    if (!channelSlug) {
      return null;
    }

    const [id] = channelSlug.match(/^[^-]+/);

    if (id) {
      return channels.find((ch) => ch.id === +id);
    }

    return null;
  }

  private changeChannel(history: History, channel: Channel) {
    history.push('/' + channel.urlSlug);
  }

  private saveFavourites(favourites: number[]) {
    this.favouritesStorage.set(favourites);
    this.setState({favourites});
  }

  public render() {
    const commonProps = {
      channels: this.state.playlist ? this.state.playlist.channels : [],
      currentEpg: this.state.currentEpg,
      favourites: this.state.favourites,
      onChangeChannel: this.changeChannel.bind(this, this.props.history),
      current: this.currentChannel,
    };

    const favouritesEditor = ({history}: RouteComponentProps<any>) => (
      <FavouritesEditor {...commonProps}
                        onSave={(f) => {this.saveFavourites(f); history.push('/'); }}
                        onCancel={() => history.push('/')}/>);

    const channelsPanel = () => <ChannelsPanel {...commonProps}/>;

    return (
        <div className={styles.host}>
          {this.state.playlist && (<CurrentEpg onDataReceived={this.setCurrentEpg.bind(this)} epgUrl={this.state.playlist.urlEpg + '/channel_now'}/>)}
          <Switch>
            <Route exact path={'/edit-favourites'} render={favouritesEditor}/>
            <Route path='/' render={channelsPanel}/>
          </Switch>

          <div className={styles.mainPanel}>
            <div className={styles.playerContainer}>
              <VideoPlayer src={this.streamUrl}></VideoPlayer>
            </div>
            {this.currentChannel && <ChannelEpg epgUrl={`${this.state.playlist.urlEpg}channel/${this.currentChannel.id}`} />}
          </div>
        </div>
    );
  }
}
