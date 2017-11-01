import React, { PureComponent } from 'react';
import styles from './showcase.scss';
import { ChannelsPanel } from '../channels-panel/channels-panel.container';
import { Route, Switch } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { PlayerArea } from '../player-area/player-area.component';
import { FavouritesEditor } from '../favourites-editor/favourites-editor';

export type OwnProps = RouteComponentProps<{}>;

export interface StoreProps {
  currentKey: string;
  playlistUrl: string;
}

export interface DispatchProps {
  onFetchData: (playlistUrl: string) => void;
  onUnmount: () => void;
}

type ShowcaseProps = StoreProps & DispatchProps & OwnProps;

export class Showcase extends PureComponent<ShowcaseProps> {

  public componentDidMount() {
    this.props.onFetchData(this.props.playlistUrl);
  }

  public componentWillUnmount() {
    this.props.onUnmount();
  }

  public render() {
    return (
        <div className={styles.host}>
          <Switch>
            <Route exact path={'/edit-favourites'} component={FavouritesEditor}/>
            <Route path={this.props.match.path} component={ChannelsPanel}/>
          </Switch>

          <Route path={this.props.match.path} component={PlayerArea}/>
        </div>
    );
  }
}
