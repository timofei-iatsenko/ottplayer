import React, { Component } from 'react';
import styles from './progress-bar.scss';
import { Time } from '../formatters/time';

interface ProgressBarProps {
  startTime: number;
  endTime: number;
}

export class ProgressBar extends Component<ProgressBarProps> {
  private oldValue: number = null;
  private isUnmounted: boolean;

  public componentDidMount() {
    this.watch();
  }

  private watch() {
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

  public componentWillUnmount() {
    this.isUnmounted = true;
  }

  private get value() {
    const duration = this.props.endTime - this.props.startTime;
    const passed = Math.floor(Date.now() / 1000) - this.props.startTime;
    const value = Math.round((passed / duration) * 100);
    return value > 100 ? 100 : value;
  }

  public render() {
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
