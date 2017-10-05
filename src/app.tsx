import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { Showcase } from './components/showcase/showcase';
import styles from './app.scss';
import { RouteComponentProps } from 'react-router';

export class App extends Component {
  public state = {
    playlistUrl: '/api/playlist?url=myott.tv',
    currentKey: '00XE8DMEI7',
  };

  public render() {
    const showCase = (routerProps: RouteComponentProps<any>) => {
      const props = Object.assign({}, routerProps, this.state);
      return <Showcase {...props}/>;
    };

    return (
      <Router>
        <div className={styles.appWrap}>
          <div className={styles.container}>
            <Route path='/:channelSlug*' render={showCase}/>
          </div>
        </div>
      </Router>
    );
  }
}
