import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Channel } from '../../entities/channel.model';
import { ChannelsList } from '../channels-list/channels-list';
import './grouped-channels-list.scss';
import groupBy from 'lodash/groupBy';
import classNames from 'classnames';

export class GroupedChannelsList extends Component {
  static propTypes = {
    onChangeChannel: PropTypes.func,
    channels: PropTypes.arrayOf(PropTypes.instanceOf(Channel)).isRequired,
  };

  state = {
    expanded: {}
  };

  toggleGroup(group) {
    this.setState({ expanded: { ...this.state.expanded, [group.name]: !this.state.expanded[group.name] } })
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
      <div className="grouped-channels-list">
        {groups.map((group, i) =>
          <div className="grouped-channels-list__group" key={ i }>
            <button onClick={() => {this.toggleGroup(group)}}
                    className="grouped-channels-list__group-header">
              { group.name }
            </button>
            <div className={classNames(
              'grouped-channels-list__group-body',
              { 'grouped-channels-list__group-body--expanded': this.isExpanded(group) }
            )}>
              <ChannelsList channels={group.channels} onChangeChannel={this.props.onChangeChannel}/>
            </div>
          </div>
        )}
      </div>
    );
  }
}
