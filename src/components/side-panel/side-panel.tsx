import React, { PureComponent, ReactFragment } from 'react';
import styles from './side-panel.scss';
import Scrollbars from 'react-custom-scrollbars';

interface SidePanelProps {
  header: ReactFragment;
  body: ReactFragment;
  provideScrollbarCtrl?: (ctrl: any) => void;
}

export class SidePanel extends PureComponent<SidePanelProps> {
  public render() {
    return (
      <div className={styles.host}>
        <div className={styles.header}>
          {this.props.header}
        </div>

        <div className={styles.body}>
          <Scrollbars autoHide ref={this.props.provideScrollbarCtrl}>
            {this.props.body}
          </Scrollbars>
        </div>
      </div>
    );
  }
}
