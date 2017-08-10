import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class DateFormatter extends Component {
    static propTypes = {
      children: PropTypes.number.isRequired
    };

    format(ts) {
      const date = new Date(ts * 1000);
      return date.toLocaleDateString();
    }

    render() {
        return <span>{this.format(this.props.children)}</span>;
    }
}
