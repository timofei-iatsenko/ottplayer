import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Time extends Component {
    static propTypes = {
      children: PropTypes.number.isRequired
    };

    format(ts) {
      const date = new Date(ts * 1000);
      return date.toTimeString().split(':').slice(0, 2).join(':');
    }

    render() {
        return <span>{this.format(this.props.children)}</span>;
    }
}
