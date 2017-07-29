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
  };

  static contextTypes = {
    scrollArea: PropTypes.object.isRequired
  };

  state = {
    expanded: {}
  };

  toggleGroup(group) {
    this.setState({ expanded: { ...this.state.expanded, [group.name]: !this.state.expanded[group.name] } }, () => {
      this.context.scrollArea.refresh();
    })
  }

  isExpanded(group) {
    return this.state.expanded[group.name];
  }

  render() {
    const grouped = groupBy(this.props.channels, (channel) => channel.groupTitle);
    const groups = Object.keys(grouped).map((name) => {
      return {
        name,
        channels: grouped[name],
      }
    });

    return (
      <div className={styles.groupedChannelsList}>
        {groups.map((group, i) =>
          <div className={styles.group} key={ i }>
            <button onClick={() => {this.toggleGroup(group)}}
                    className={styles.header}>
              { group.name }
            </button>
            <div className={this.isExpanded(group) ? styles.bodyExpanded : styles.bodyCollapsed}>
              <ChannelsList channels={group.channels} onChangeChannel={this.props.onChangeChannel}/>
            </div>
          </div>
        )}
      </div>
    );
  }
}
