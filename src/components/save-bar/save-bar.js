import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Check from 'react-icons/lib/fa/check';
import Repeat from 'react-icons/lib/fa/repeat';

import './save-bar.scss';

export class SaveBar extends Component {
  static propTypes = {
    saveDisabled: PropTypes.bool,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };


  render() {
    return (
      <div className="save-bar">
        <button className="save-bar__btn save-bar__btn--save" disabled={this.props.saveDisabled} title="Save"
                onClick={this.props.onSave}>
          <Check/>
        </button>
        <button className="save-bar__btn save-bar__btn--cancel" title="Cancel"
                onClick={this.props.onCancel}>
          <Repeat/>
        </button>
      </div>
    );
  }
}
