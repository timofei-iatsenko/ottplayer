import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Duration extends Component {
  static propTypes = {
    children: PropTypes.number.isRequired,
  };

  format(value) {
    const minutes = value / 60;

    if (minutes < 60) {
      return `${minutes} min`;
    }

    const hours = minutes / 60;
    return `${hours}h ${minutes - hours * 60} min`;
  }

  render() {
    return <span>{this.format(this.props.children)}</span>;
  }
}
