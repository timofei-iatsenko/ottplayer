import React, { Component } from 'react';

interface DurationProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: number;
}
export class Duration extends Component<DurationProps> {
  private format(value: number) {
    const minutes = value / 60;

    if (minutes < 60) {
      return `${minutes} min`;
    }

    const hours = Math.floor(minutes / 60);
    return `${hours}h ${minutes - hours * 60} min`;
  }

  public render() {
    return <span {...this.props}>{this.format(this.props.children)}</span>;
  }
}
