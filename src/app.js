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
} from 'react-router-dom'
import { LocalStorageFactory } from './libs/storage';

class App extends Component {
  favouritesStorage = LocalStorageFactory.create('favourites');

  state = {
    currentChannel: null,
    favourites: this.favouritesStorage.get([]),
    currentKey: '00XE8DMEI7',
    channels: [],
  };

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

  saveFavourites(favourites){
    this.favouritesStorage.set(favourites);
    this.setState({favourites});
  }

  exitFromFavouritesEditor() {
    this.setState({ currentChannelListType: ChannelListMode.all })
  }

  render() {
    const favouritesEditor = ({history}) => (
      <FavouritesEditor channels={this.state.channels}
                        favourites={this.state.favourites}
                        onChangeChannel={this.changeChannel.bind(this)}
                        onSave={(f) => {this.saveFavourites(f); history.goBack()}}
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
