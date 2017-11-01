import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { ShowCaseContainer } from './components/showcase/showcase.container';
import styles from './app.scss';
import { Provider } from 'react-redux';
import { store } from './store';
import { Settings } from './components/settings/settings';

export class App extends Component {
  public render() {
    return (
      <Provider store={store}>
        <Router>
          <div className={styles.appWrap}>
            <div className={styles.container}>
              <Switch>
                <Route path='/settings' component={Settings}/>
                {!store.getState().settings.playlistUrl ? (
                  <Redirect to={{
                    pathname: '/settings',
                  }}/>
                ) : (
                   <Route path='/:channelSlug*' component={ShowCaseContainer}/>
                 )}
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}
