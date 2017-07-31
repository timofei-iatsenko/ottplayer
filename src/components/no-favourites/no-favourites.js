import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Star from 'react-icons/lib/fa/star';
import styles from './no-favourites.scss';

export class NoFavourites extends Component {
  render() {
    return (
      <div className={styles.host}>
        <div className={styles.noFavIcon}>
          <Star />
        </div>

        <div className={styles.text}>
          Favorites are not set yet <br />
          <Link className={styles.action} to="/edit-favourites">Set Now..</Link>
        </div>

      </div>
    );
  }
}
