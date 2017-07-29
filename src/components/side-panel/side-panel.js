import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './side-panel.scss';
import ScrollArea from 'react-scrollbar';

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

        <ScrollArea smoothScrolling={true}>
          {this.props.body}
        </ScrollArea>
      </div>
    );
  }
}
