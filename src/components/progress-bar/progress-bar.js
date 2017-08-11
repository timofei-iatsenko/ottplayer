import React, { Component } from 'react';
import styles from './progress-bar.scss';
import PropTypes from 'prop-types';
import { Time } from '../formatters/time';

export class ProgressBar extends Component {
  static propTypes = {
    startTime: PropTypes.number.isRequired,
    endTime: PropTypes.number.isRequired,
  };

  oldValue = null;

  componentDidMount() {
    this.watch();
  }

  watch() {
    if (this.isUnmounted) {
      return;
    }

    const THRESHOLD = 5;

    if (this.value - this.oldValue > THRESHOLD) {
      this.forceUpdate();
    }

    if (this.value < 100) {
      setTimeout(() => requestAnimationFrame(this.watch.bind(this)), 500);
    }
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  get value() {
    const duration = this.props.endTime - this.props.startTime;
    const passed = Math.floor(Date.now() / 1000) - this.props.startTime;
    return Math.round((passed / duration) * 100);
  }

  render() {
    this.oldValue = this.value;

    return (
      <div className={styles.host}>
        <div className={styles.startTime}><Time>{this.props.startTime}</Time></div>
        <div className={styles.bar}>
          <div className={styles.inner} style={{ width: this.value + '%' }}></div>
        </div>
        <div className={styles.endTime}><Time>{this.props.endTime}</Time></div>
      </div>
    );
  }
}
