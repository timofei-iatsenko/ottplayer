import React, { Component } from 'react';
import { Channel, ReadonlyChannelsCollection } from '../../../entities/channel.model';
import { ChannelsList } from '../channels-list/channels-list';
import styles from './grouped-channels-list.scss';
import groupBy from 'lodash/groupBy';
import ArrowIcon from 'react-icons/lib/fa/angle-right';

interface GroupedChannelsListProps {
  onChangeChannel?: (channel: Channel) => void;
  channels: ReadonlyChannelsCollection;
  current?: Channel;
  scrollbarController?: any;
}

interface Group {
  name: string;
  channels: ReadonlyChannelsCollection;
}
export class GroupedChannelsList extends Component<GroupedChannelsListProps> {
  private groups: Group[] = [];

  public componentWillMount() {
    this.prepareData(this.props.channels, this.props.current);
  }

  public componentWillReceiveProps(props: GroupedChannelsListProps) {
    this.prepareData(props.channels, props.current);
  }

  public state = {
    expanded: {} as {[name: string]: boolean},
  };

  private expandGroup(group: Group) {
    this.setState({ expanded: { ...this.state.expanded, [group.name]: true } });
  }

  private toggleGroup(group: Group) {
    this.setState({ expanded: { ...this.state.expanded, [group.name]: !this.state.expanded[group.name] } });
  }

  private isExpanded(group: Group) {
    return this.state.expanded[group.name];
  }

  private prepareData(channels: ReadonlyChannelsCollection, current: Channel) {
    const grouped = groupBy(channels, (channel: Channel) => channel.groupTitle);
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

  public render() {
    return (
      <div className={styles.host}>
        {this.groups.map((group, i) =>
          <div className={this.isExpanded(group) ? styles.groupExpanded : styles.groupCollapsed} key={ i }>
            <div onClick={() => this.toggleGroup(group)}
                    className={styles.header}>
              { group.name }

              <div className={styles.arrowIcon}>
                <ArrowIcon />
              </div>

            </div>
            <div className={styles.body}>
              <ChannelsList {...this.props} channels={group.channels} />
            </div>
          </div>,
        )}
      </div>
    );
  }
}
