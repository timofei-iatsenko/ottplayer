import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './showcase.scss';
import { VideoPlayer } from '../video-player/video-player';
import { Playlist } from '../../entities/playlist.model';
import { FavouritesEditor } from '../favourites-editor/favourites-editor';
import { ChannelsPanel } from '../channels-panel/channels-panel';
import { Route, Switch } from 'react-router-dom'
import { LocalStorageFactory } from '../../libs/storage';
import { CurrentEpg } from '../current-epg/current-epg';

export class Showcase extends Component {
  static propTypes = {
    currentKey: PropTypes.string,
    playlistUrl: PropTypes.string,
  };

  favouritesStorage = LocalStorageFactory.create('favourites');

  state = {
    currentChannel: null,
    favourites: this.favouritesStorage.get([]),
    channels: [],
    currentEpg: {},
    /**
     * @type Playlist
     */
    playlist: null,
  };

  setCurrentEpg(currentEpg) {
    this.setState({currentEpg});
  }

  componentWillMount() {
    this.loadPlaylist().then((playlist) => {
      this.setState({
        playlist: playlist,
        currentChannel: this.getInitialChannel(playlist.channels)
      });
    })
  }

  /**
   * @returns {Promise.<Playlist>}
   */
  loadPlaylist() {
    const url = this.props.playlistUrl;
    return window.fetch(url).then(r => r.json()).then((d) => new Playlist(d.playlist));
  }

  /**
   * @returns {Channel}
   */
  get currentChannel() {
    return this.state.currentChannel || {};
  }

  get streamUrl() {
    return (this.currentChannel.stream || '').replace('{KEY}', this.props.currentKey)
  }

  /**
   * @param {Channel[]} channels
   * @return Channel
   */
  getInitialChannel(channels) {
    const { channelSlug } = this.props.match.params;

    if (!channelSlug) {
      return null;
    }

    const [id] = channelSlug.match(/^[^-]+/);

    if (id) {
      return channels.find((ch) => ch.id === +id);
    }
  }

 /**
  * @param {History} history
  * @param {Channel} channel
  * */
  changeChannel(history, channel) {
    this.setState({
      currentChannel: channel,
    });

    history.push('/' + channel.urlSlug);
  }

  saveFavourites(favourites){
    this.favouritesStorage.set(favourites);
    this.setState({favourites});
  }

  render() {
    const commonProps = {
      channels: this.state.playlist ? this.state.playlist.channels : [],
      currentEpg: this.state.currentEpg,
      favourites: this.state.favourites,
      onChangeChannel: this.changeChannel.bind(this, this.props.history),
      current: this.state.currentChannel,
    };

    const favouritesEditor = ({history}) => (
      <FavouritesEditor {...commonProps}
                        onSave={(f) => {this.saveFavourites(f); history.push('/')}}
                        onCancel={() => history.push('/')}/>);

    const channelsPanel = () => <ChannelsPanel {...commonProps}/>;

    return (
        <div className={styles.host}>
          {this.state.playlist && (<CurrentEpg onDataReceived={this.setCurrentEpg.bind(this)} epgUrl={this.state.playlist.urlEpg + '/channel_now'}/>)}
          <Switch>
            <Route exact path={`/edit-favourites`} render={favouritesEditor}/>
            <Route path="/" render={channelsPanel}/>
          </Switch>

          <div className={styles.mainPanel}>
            <div className={styles.playerContainer}>
              <VideoPlayer src={this.streamUrl}></VideoPlayer>
            </div>
          </div>
        </div>
    );
  }
}
