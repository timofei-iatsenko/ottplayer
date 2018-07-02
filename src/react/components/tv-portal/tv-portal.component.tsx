import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router';
import { Dispatch } from 'redux';
import { StopEpgSync } from '../../store/actions/epg.actions';
import { RequestPlaylist, SetChannelSlug } from '../../store/actions/channels.actions';
import { AppState } from '../../store';
import { ChannelsPanel } from '../channels-panel/channels-panel.container';
import { PlayerArea } from '../player-area/player-area.component';
import styles from './tv-portal.scss';
import { PlayerControlBar } from '../player-control-bar/player-control-bar';

interface Props extends RouteComponentProps<{
  channelSlug: string;
}> {
  currentKey: string;
  playlistUrl: string;
  appClasses: {[className: string]: boolean};

  onFetchData: (playlistUrl: string) => void;
  onUnmount: () => void;
  onChannelSelected: (slug: string) => void;
}

export class TvPortalComponent extends PureComponent<Props> {
  public componentWillReceiveProps(props: Props) {
    this.props.onChannelSelected(props.match.params.channelSlug);
  }

  public componentDidMount() {
    if (this.props.playlistUrl) {
      this.props.onFetchData(this.props.playlistUrl);
    }
    this.props.onChannelSelected(this.props.match.params.channelSlug);
  }

  public componentWillUnmount() {
    this.props.onUnmount();
  }

  private getAppClasses(): string[] {
    return Object.keys(this.props.appClasses).reduce((acc, className) => {
      if (this.props.appClasses[className]) {
        acc.push(className);
      }
      return acc;
    }, [styles.host]);
  }

  public render() {
    return (
      <div className={this.getAppClasses().join(' ')}>
        {!this.props.playlistUrl ? <Redirect to='/settings'/> : null}
        <ChannelsPanel/>
        <PlayerArea/>
        <PlayerControlBar />
      </div>
    );
  }
}

function mapStateToProps(state: AppState): Partial<Props> {
  return {
    currentKey: state.settings.currentKey,
    playlistUrl: state.settings.playlistUrl,
    appClasses: state.ui.classes,
  };
}

function mapDispatchToProps(dispatch: Dispatch): Partial<Props> {
  return {
    onChannelSelected: (slug: string) => dispatch(new SetChannelSlug({ slug })),
    onFetchData: (playlistUrl: string) => dispatch(new RequestPlaylist({ playlistUrl })),
    onUnmount: () => dispatch(new StopEpgSync()),
  };
}

export const TvPortal = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TvPortalComponent);
