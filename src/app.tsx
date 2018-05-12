import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styles from './app.scss';
import { HeaderWithRouter } from './components/header/header.component';
import { Settings } from './components/settings/settings';
import { TvPortal } from './components/tv-portal/tv-portal.component';
import { store } from './store';

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
                <Route path='/:channelSlug*' component={TvPortal}/>
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}
