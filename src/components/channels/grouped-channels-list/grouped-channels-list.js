import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Channel } from '../../../entities/channel.model';
import { ChannelsList } from '../channels-list/channels-list';
import styles from './grouped-channels-list.scss';
import groupBy from 'lodash/groupBy';
import ArrowIcon from 'react-icons/lib/fa/angle-right';

export class GroupedChannelsList extends Component {
  static propTypes = {
    onChangeChannel: PropTypes.func,
    channels: PropTypes.arrayOf(PropTypes.instanceOf(Channel)).isRequired,
    current: PropTypes.instanceOf(Channel),
    scrollbarController: PropTypes.object,
  };

  groups = [];

  componentWillMount() {
    this.prepareData(this.props.channels, this.props.current);
  }

  componentWillReceiveProps(props) {
    this.prepareData(props.channels, props.current);
  }

  state = {
    expanded: {}
  };

  expandGroup(group) {
    this.setState({ expanded: { ...this.state.expanded, [group.name]: true } })
  }

  toggleGroup(group) {
    this.setState({ expanded: { ...this.state.expanded, [group.name]: !this.state.expanded[group.name] } })
  }

  isExpanded(group) {
    return this.state.expanded[group.name];
  }

  /**
   *
   * @param {Channel[]} channels
   * @param {Channel} current
   */
  prepareData(channels, current) {
    const grouped = groupBy(channels, (channel) => channel.groupTitle);
    this.groups = Object.keys(grouped).map((name) => {
      const group = {
        name,
        channels: grouped[name],
      };

      if (current && group.channels.includes(current)) {
        this.expandGroup(group);
      }

      return group;
    });
  }

  render() {
    return (
      <div className={styles.host}>
        {this.groups.map((group, i) =>
          <div className={this.isExpanded(group) ? styles.groupExpanded : styles.groupCollapsed} key={ i }>
            <div onClick={() => {this.toggleGroup(group)}}
                    className={styles.header}>
              { group.name }

              <div className={styles.arrowIcon}>
                <ArrowIcon />
              </div>

            </div>
            <div className={styles.body}>
              <ChannelsList {...this.props} channels={group.channels} />
            </div>
          </div>
        )}
      </div>
    );
  }
}
