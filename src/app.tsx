import React, {Component} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import styles from './app.scss';
import {Provider} from 'react-redux';
import {store} from './store';
import {Settings} from './components/settings/settings';
import {TvPortal} from './components/tv-portal/tv-portal.component';
import {HeaderWithRouter} from './components/header/header.component';

export class App extends Component {
  public render() {
    return (
      <Provider store={store}>
        <Router>
          <div className={styles.appWrap}>
            <HeaderWithRouter/>
            <div className={styles.container}>
              <Switch>
                <Route path='/settings' component={Settings}/>
                {
                  !store.getState().settings.playlistUrl
                    ? <Redirect to='/settings'/>
                    : <Route path='/:channelSlug*' component={TvPortal}/>
                }
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}
