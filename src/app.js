import React, { Component } from 'react';
import styles from './app.scss';
import { VideoPlayer } from './components/video-player/video-player';
import { ChannelListMode } from './components/list-switcher/channel-list-modes';
import { Playlist } from './entities/playlist.model';
import { FavouritesEditor } from './components/favourites-editor/favourites-editor';
import { ChannelsPanel } from './components/channels-panel/channels-panel';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentChannel: null,
      favourites: [],
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

  render() {
    const favouritesEditor = ({history}) => (
      <FavouritesEditor channels={this.state.channels}
                        onChangeChannel={this.changeChannel.bind(this)}
                        onCancel={() => history.goBack()}/>);

    const channelsPanel = () => (
      <ChannelsPanel channels={this.state.channels}
                     favourites={this.state.favourites}
                     onChangeChannel={this.changeChannel.bind(this)}/>);

    return (
      <Router>
        <div className={styles.app}>
          <Route exact path="/" render={channelsPanel}/>
          <Route exact path='/edit-favourites' render={favouritesEditor}/>

          <div className={styles.mainPanel}>
            <VideoPlayer src={this.streamUrl}></VideoPlayer>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
