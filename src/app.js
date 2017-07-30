import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import { Showcase } from './components/showcase/showcase';

class App extends Component {

  state = {
    playlistUrl: 'http://localhost:3001/playlist?url=myott.tv',
    currentKey: '00XE8DMEI7',
  };

  render() {
    const showCase = (routerProps) => {
      const props = Object.assign({}, routerProps, {
        currentKey: this.state.currentKey,
        playlistUrl: this.state.playlistUrl,
      });

      return <Showcase {...props}/>;
    };

    return (
      <Router>
        <div>
          <Route exact path="/" render={showCase}/>
          <Route exact path="/channels/:channelSlug" render={showCase}/>
        </div>
      </Router>
    );
  }
}

export default App;
