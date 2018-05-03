import React, {PureComponent} from 'react';
import styles from './header.scss';
import List from 'react-icons/lib/fa/align-justify';
import Cog from 'react-icons/lib/fa/cog';
import autobind from 'autobind-decorator';
import {RouteComponentProps, withRouter} from 'react-router';

interface HeaderProps {}

class Header extends PureComponent<RouteComponentProps<HeaderProps>> {
  @autobind
  private goToSettings() {
    this.props.history.push('/settings');
  }

  public render() {
    return (
      <header className={styles.host}>
        <div className={styles.channelsBtns}>
          <button className={styles.btn} title='Channels list' type='button'>
            <List/>
          </button>
        </div>
        <div className={styles.settingsBtns}>
          <button className={styles.btn}
                  onClick={this.goToSettings}
                  title='Settings'
                  type='button'>
            <Cog/>
          </button>
        </div>
      </header>
    );
  }
}

export const HeaderWithRouter = withRouter<HeaderProps>(Header);
