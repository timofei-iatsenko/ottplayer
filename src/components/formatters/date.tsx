import React, { Component } from 'react';

interface DateFormatterProps {
  children: number;
}
export class DateFormatter extends Component<DateFormatterProps> {
  private format(ts: number) {
    const date = new Date(ts * 1000);
    return date.toLocaleDateString();
  }

  public render() {
    return <span>{this.format(this.props.children)}</span>;
  }
}
