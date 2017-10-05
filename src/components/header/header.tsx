import React, { Component } from 'react';
import styles from './header.scss';

export class Header extends Component {
  public render() {
    return (
      <header className={styles.host}></header>
    );
  }
}
