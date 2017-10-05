import React, { PureComponent } from 'react';
import Check from 'react-icons/lib/fa/check';
import Repeat from 'react-icons/lib/fa/repeat';

import styles from './save-bar.scss';

interface SaveBarProps {
  saveDisabled?: boolean;
  onSave: () => void;
  onCancel: () => void;
}

export class SaveBar extends PureComponent<SaveBarProps> {
  public render() {
    return (
      <div className={styles.saveBar}>
        <div className={styles.btns}>
          <button className={styles.btnSave} disabled={this.props.saveDisabled} title='Save'
                  onClick={this.props.onSave}>
            <Check/>
          </button>
          <button className={styles.btnCancel} title='Cancel'
                  onClick={this.props.onCancel}>
            <Repeat/>
          </button>
        </div>
      </div>
    );
  }
}
