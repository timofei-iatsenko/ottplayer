import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Check from 'react-icons/lib/fa/check';
import Repeat from 'react-icons/lib/fa/repeat';

import styles from './save-bar.scss';

export class SaveBar extends Component {
  static propTypes = {
    saveDisabled: PropTypes.bool,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };


  render() {
    return (
      <div className={styles.saveBar}>
        <div className={styles.btns}>
          <button className={styles.btnSave} disabled={this.props.saveDisabled} title="Save"
                  onClick={this.props.onSave}>
            <Check/>
          </button>
          <button className={styles.btnCancel} title="Cancel"
                  onClick={this.props.onCancel}>
            <Repeat/>
          </button>
        </div>
      </div>
    );
  }
}
