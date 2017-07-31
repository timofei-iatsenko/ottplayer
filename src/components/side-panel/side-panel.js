import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './side-panel.scss';
import { Scrollbars } from 'react-custom-scrollbars';

export class SidePanel extends Component {
  static propTypes = {
    header: PropTypes.element,
    body: PropTypes.element,
  };

  render() {
    return (
      <div className={styles.host}>
        <div className={styles.header}>
          {this.props.header}
        </div>

        <div className={styles.body}>
          <Scrollbars autoHide >
            {this.props.body}
          </Scrollbars>
        </div>
      </div>
    );
  }
}
