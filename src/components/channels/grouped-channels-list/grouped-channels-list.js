import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Channel } from '../../../entities/channel.model';
import { ChannelsList } from '../channels-list/channels-list';
import styles from './grouped-channels-list.scss';
import groupBy from 'lodash/groupBy';

export class GroupedChannelsList extends Component {
  static propTypes = {
    onChangeChannel: PropTypes.func,
    channels: PropTypes.arrayOf(PropTypes.instanceOf(Channel)).isRequired,
    current: PropTypes.instanceOf(Channel),
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
      <div className={styles.groupedChannelsList}>
        {this.groups.map((group, i) =>
          <div className={styles.group} key={ i }>
            <button onClick={() => {this.toggleGroup(group)}}
                    className={styles.header}>
              { group.name }
            </button>
            <div className={this.isExpanded(group) ? styles.bodyExpanded : styles.bodyCollapsed}>
              <ChannelsList channels={group.channels}
                            current={this.props.current}
                            onChangeChannel={this.props.onChangeChannel}/>
            </div>
          </div>
        )}
      </div>
    );
  }
}
