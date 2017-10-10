import React, { Component, PureComponent } from 'react';
import styles from './showcase.scss';
import { VideoPlayer } from '../video-player/video-player';
import { Playlist } from '../../entities/playlist.model';
import { FavouritesEditor } from '../favourites-editor/favourites-editor';
import { ChannelsPanel } from '../channels-panel/channels-panel';
import { Route, Switch } from 'react-router-dom';
import { LocalStorageFactory } from '../../libs/storage';
import { CurrentEpg } from '../current-epg/current-epg';
import { ChannelEpg } from '../channel-epg/channel-epg';
import { Channel, ChannelsCollection } from '../../entities/channel.model';
import { EpgDictionary } from '../../entities/epg-entry';
import { History } from 'history';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { AppState } from '../../app';

interface RouterParams {
  channelSlug: string;
}
interface ShowcaseProps {
  currentKey: string;
  channels: ChannelsCollection;
  favourites: ReadonlyArray<number>;
  currentEpg: Readonly<EpgDictionary>;
  playlist: Readonly<Playlist>;
  currentChannel: Readonly<Channel>;
}

export class Showcase extends PureComponent<ShowcaseProps> {
  private favouritesStorage = LocalStorageFactory.create<number[]>('favourites');

  // private setCurrentEpg(currentEpg: EpgDictionary) {
  //   this.setState({currentEpg});
  // }

  // public componentWillMount() {
  //   this.loadPlaylist().then((playlist) => {
  //     this.setState({
  //       playlist,
  //     });
  //   });
  // }

  // private loadPlaylist(): Promise<Playlist> {
  //   const url = this.props.playlistUrl;
  //   return window.fetch(url)
  //     .then((r) => r.json())
  //     .then((d) => new Playlist(d.playlist));
  // }

  private get currentChannel(): Channel {
    return this.props.currentChannel;
  }

  get streamUrl() {
    return ((this.currentChannel && this.currentChannel.stream) || '')
      .replace('{KEY}', this.props.currentKey);
  }

  private getChannelSlug(channel: Channel) {
    return channel.id;
  }

  private changeChannel(history: History, channel: Channel) {
    history.push('/' + this.getChannelSlug(channel));
  }

  // private saveFavourites(favourites: number[]) {
  //   this.favouritesStorage.set(favourites);
  //   this.setState({favourites});
  // }

  public render() {
    const commonProps = {
      channels: this.props.channels  || [],
      currentEpg: this.props.currentEpg,
      favourites: this.props.favourites,
      onChangeChannel: this.changeChannel.bind(this, this.props.history),
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

function getCurrentChannel(channels: ChannelsCollection, channelSlug: string): Channel {
  if (!channels.length || !channelSlug) {
    return null;
  }

  const [id] = channelSlug.match(/^[^-]+/);

  if (id) {
    return channels.find((ch) => ch.id === +id);
  }

  return null;
}

// currentKey: string;
// channels: Channel[];
// favourites: number[];
// currentEpg: EpgDictionary;
// playlist: Playlist;
// currentChannel: Channel;

function mapStateToProps(state: AppState, ownProps: RouteComponentProps<RouterParams>): ShowcaseProps {
  const { channelSlug } = ownProps.match.params;
  return {
    currentKey: state.currentKey,
    currentChannel: getCurrentChannel(state.channels, channelSlug),
    playlist: state.playlist,
    channels: state.channels,
    favourites: state.favourites,
    currentEpg: state.currentEpg,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onTodoClick: id => {
      dispatch(toggleTodo(id))
    }
  }
}

export const ShowCaseContainer = connect(
  mapStateToProps,
  // mapDispatchToProps,
)(Showcase);
