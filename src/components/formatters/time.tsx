import React, { Component } from 'react';

interface TimeProps {
  children: number;
}

export class Time extends Component<TimeProps> {
  private format(ts: number) {
    const date = new Date(ts * 1000);
    return date.toTimeString().split(':').slice(0, 2).join(':');
  }

  public render() {
    return <span>{this.format(this.props.children)}</span>;
  }
}
