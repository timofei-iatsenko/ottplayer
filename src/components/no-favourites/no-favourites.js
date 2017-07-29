import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class NoFavourites extends Component {
  render() {
    return (
      <div>
        <div>Favorites are not set yet</div>
        <Link to="/edit-favourites">Set Now..</Link>
      </div>
    );
  }
}
