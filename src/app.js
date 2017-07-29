import React, { Component } from 'react';
import styles from './app.scss';
import { VideoPlayer } from './components/video-player/video-player';
import { ChannelListMode } from './components/list-switcher/channel-list-modes';
import { Playlist } from './entities/playlist.model';
import { FavouritesEditor } from './components/favourites-editor/favourites-editor';
import { ChannelsPanel } from './components/channels-panel/channels-panel';

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentChannel: null,
      currentChannelListType: ChannelListMode.grouped,
      currentKey: '00XE8DMEI7',
      channels: [],
    };
  }

  componentWillMount() {
    this.loadPlaylist().then((playlist) => {
      this.setState({
        channels: playlist.channels,
      })
    })
  }

  loadPlaylist() {
    const url = 'http://localhost:3001/playlist?url=myott.tv';
    return window.fetch(url).then(r => r.json()).then((d) => new Playlist(d.playlist));
  }

  /**
   * @returns {Channel}
   */
  get currentChannel() {
    return this.state.currentChannel || {};
  }

  get streamUrl() {
    return (this.currentChannel.stream || '').replace('{KEY}', this.state.currentKey)
  }

  changeChannel(channel) {
    this.setState({
      currentChannel: channel,
    });
  }

  exitFromFavouritesEditor() {
    this.setState({ currentChannelListType: ChannelListMode.all })
  }

  switchChannelListType(type) {
    this.setState({ currentChannelListType: type });
  }

  render() {
    return (
      <div className={styles.app}>
        <FavouritesEditor channels={this.state.channels}
                          onChangeChannel={this.changeChannel.bind(this)}
                          onCancel={this.exitFromFavouritesEditor.bind(this)}/>

        <ChannelsPanel channels={this.state.channels}
                       onChangeChannel={this.changeChannel.bind(this)}/>

        <div className={styles.mainPanel}>
          <VideoPlayer src={this.streamUrl}></VideoPlayer>
        </div>
      </div>
    );
  }
}

export default App;
