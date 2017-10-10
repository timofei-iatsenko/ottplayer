import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ShowCaseContainer } from './components/showcase/showcase.container';
import styles from './app.scss';
import { Provider } from 'react-redux';
import { fetchPlaylist } from './actions/playlist.actions';
import { store } from './store';
import { fetchCurrentEpg } from './actions/epg.actions';

export class App extends Component {
  public render() {
    return (
      <Provider store={store}>
        <Router>
          <div className={styles.appWrap}>
            <div className={styles.container}>
              <Route path='/:channelSlug*' component={ShowCaseContainer}/>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

store
  .dispatch(fetchPlaylist(store.getState().settings.playlistUrl))
  .then(() => store.dispatch(fetchCurrentEpg(store.getState().playlist.urlEpg + '/channel_now' )));
