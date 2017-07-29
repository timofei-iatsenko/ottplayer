import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Star from 'react-icons/lib/fa/star';
import List from 'react-icons/lib/fa/align-justify';
import Folder from 'react-icons/lib/fa/folder';
import { ChannelListMode } from './channel-list-modes';

import './list-switcher.scss';

export class ListSwitcher extends Component {
  static propTypes = {
    onSwitch: PropTypes.func,
    current: PropTypes.number.isRequired,
  };

  options = [
    {
      btnTitle: "Show favourites",
      title: "Favourites",
      icon: <Star/>,
      type: ChannelListMode.favourites,
    },
    {
      btnTitle: "Show all",
      title: "All",
      icon: <List/>,
      type: ChannelListMode.all,
    },
    {
      btnTitle: "Show by categories",
      title: "Categories",
      icon: <Folder/>,
      type: ChannelListMode.grouped,
    },
  ];

  isCurrent(option) {
    return option.type === this.props.current;
  }

  get current() {
    return this.options.find(this.isCurrent.bind(this));
  }

  render() {
    return (
      <div className="list-switcher">

        <h3 className="list-switcher__current-mode-title">
          {this.current.title}
        </h3>

        <div className="list-switcher__options">
          {this.options.map((option, i) => (
            <button className={classnames('list-switcher__option', {'list-switcher__option--current': this.isCurrent(option)})}
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
