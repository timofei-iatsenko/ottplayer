import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Time extends Component {
    static propTypes = {
      ts: PropTypes.number.isRequired
    };

    formatTime(ts) {
      const date = new Date(ts * 1000);
      return date.toTimeString().split(':').slice(0, 2).join(':');
    }

    render() {
        return <span>{this.formatTime(this.props.ts)}</span>;
    }
}
