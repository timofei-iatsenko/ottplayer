import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import { Showcase } from './components/showcase/showcase';
import styles from './app.scss';

class App extends Component {

  state = {
    playlistUrl: '/api/playlist?url=myott.tv',
    currentKey: '00XE8DMEI7',
  };

  render() {
    const showCase = (routerProps) => {
      const props = Object.assign({}, routerProps, this.state);
      return <Showcase {...props}/>;
    };

    return (
      <Router>
        <div className={styles.appWrap}>
          <div className={styles.container}>
            <Route path="/:channelSlug*" render={showCase}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
