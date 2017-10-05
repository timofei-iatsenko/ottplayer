import React, { PureComponent, ReactFragment } from 'react';
import Star from 'react-icons/lib/fa/star';
import List from 'react-icons/lib/fa/align-justify';
import Folder from 'react-icons/lib/fa/folder';
import { ChannelListMode } from './channel-list-modes';

import styles from './list-switcher.scss';

interface ListSwitcherProps {
  onSwitch: (type: ChannelListMode) => void;
  current: ChannelListMode;
}

interface Option {
  btnTitle: string;
  title: string;
  icon: ReactFragment;
  type: ChannelListMode;
}

export class ListSwitcher extends PureComponent<ListSwitcherProps> {
  private options: Option[] = [
    {
      btnTitle: 'Show favourites',
      title: 'Favourites',
      icon: <Star/>,
      type: ChannelListMode.favourites,
    },
    {
      btnTitle: 'Show all',
      title: 'All',
      icon: <List/>,
      type: ChannelListMode.all,
    },
    {
      btnTitle: 'Show by categories',
      title: 'Categories',
      icon: <Folder/>,
      type: ChannelListMode.grouped,
    },
  ];

  private isCurrent(option: Option) {
    return option.type === this.props.current;
  }

  private get current() {
    return this.options.find(this.isCurrent.bind(this));
  }

  public render() {
    return (
      <div className={styles.listSwitcher}>

        <h3 className={styles.currentModeTitle}>
          {this.current.title}
        </h3>

        <div className={styles.options}>
          {this.options.map((option, i) => (
            <button className={this.isCurrent(option) ? styles.optionCurrent : styles.option}
                    key={i}
                    onClick={() => this.props.onSwitch(option.type)}
                    title={option.btnTitle}>
              {option.icon}
            </button>
          ))}
        </div>
      </div>
    );
  }
}
