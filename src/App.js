import React, { Component } from 'react';
import './App.scss';
import { ChannelsList } from './components/channels-list/channels-list';
import { GroupedChannelsList } from './components/grouped-channels-list/grouped-channels-list';
import { SelectableChannelsList } from './components/selectable-channels-list/selectable-channels-list';
import { VideoPlayer } from './components/video-player/video-player';
import { SaveBar } from './components/save-bar/save-bar';
import { ListSwitcher } from './components/list-switcher/list-switcher';
import { ChannelListMode } from './components/list-switcher/channel-list-modes';
import { Playlist } from './entities/playlist.model';
import ScrollArea from 'react-scrollbar';

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentChannel: null,
      selectedChannels: [],
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
    const url = 'http://localhost:3005/playlist?url=myott.tv';
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

  saveFavourites() {
    console.log('save favourites!');
    this.exitFromFavouritesEditor();
  }

  exitFromFavouritesEditor() {
    this.setState({ currentChannelListType: ChannelListMode.all })
  }

  switchChannelListType(type) {
    this.setState({ currentChannelListType: type });
  }

  handleSelectionChange(selection) {
    this.setState({selectedChannels: selection});
  }

  getChannelsList() {
    switch (this.state.currentChannelListType) {
      case ChannelListMode.grouped:
        return (
          <GroupedChannelsList
            channels={this.state.channels} onChangeChannel={this.changeChannel.bind(this)}></GroupedChannelsList>
        );

      case ChannelListMode.favourites:
        return (
          <SelectableChannelsList channels={this.state.channels}
                                  onChangeChannel={this.changeChannel.bind(this)}
                                  onSelectionChange={this.handleSelectionChange.bind(this)}></SelectableChannelsList>
        );

      default:
        return (
          <ChannelsList
            channels={this.state.channels} onChangeChannel={this.changeChannel.bind(this)}></ChannelsList>
        );
    }
  }

  render() {
    return (
      <div className="app">
        <div className="side-panel">
          <div className="side-panel__header">
            {this.state.currentChannelListType === ChannelListMode.favourites ? (
              <SaveBar saveDisabled={this.state.selectedChannels.length === 0}
                       onSave={this.saveFavourites.bind(this)}
                       onCancel={this.exitFromFavouritesEditor.bind(this)}/>
            ) : (
              <ListSwitcher onSwitch={this.switchChannelListType.bind(this)}
                            current={this.state.currentChannelListType}/>
            )}
          </div>

          <ScrollArea smoothScrolling={true} className="channels-container">
            {this.getChannelsList()}
          </ScrollArea>
        </div>


        <div className="main-panel">
          <VideoPlayer src={this.streamUrl}></VideoPlayer>
        </div>
      </div>
    );
  }
}

export default App;
