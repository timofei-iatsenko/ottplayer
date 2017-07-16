import React, { Component } from 'react';
import './App.scss';
import { ChannelsList } from './components/channels-list';
import { VideoPlayer } from './components/video-player';
import { Playlist } from './entities/playlist.model'

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentChannel: null,
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
    const url = 'http://localhost:3000/playlist?url=myott.tv';
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

  render() {
    return (
      <div className="app">
        <div className="channels-container">
            <ChannelsList channels={this.state.channels} onChangeChannel={this.changeChannel.bind(this)}></ChannelsList>
        </div>
        <div className="main-container">
          <VideoPlayer src={this.streamUrl}></VideoPlayer>
        </div>
      </div>
    );
  }
}

export default App;
