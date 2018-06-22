import React, { PureComponent } from 'react';
import { ChannelsList } from '../channels/channels-list/channels-list';
import { TabsComponent } from '../tabs/tabs';
import { ChannelsState, Group } from '../../store/reducers/channels.reducer';
import styles from './channels-panel.scss';

export interface OwnProps {}

export interface StateProps {
  favourites: ChannelsState['favourites'];
  channels: ChannelsState['channels'];
  groups: ChannelsState['groups'];
  selectedChannelId: ChannelsState['selectedChannelId'];
  selectedGroup: Group;
}

export interface DispatchProps {
  onSelectGroup: (group: { name: string }) => void;
}

type Props = StateProps & DispatchProps;

export class ChannelsPanelComponent extends PureComponent<Props> {
  private getList() {
    const props = {
      channels: this.props.channels,
      selectedChannelId: this.props.selectedChannelId,
      visibleIds: this.props.selectedGroup ? this.props.selectedGroup.channels : [],
    };

    return <ChannelsList {...props} />;
  }

  public render() {
    return (
      <div className={styles.host}>
        <div className={styles.header}>
          <h3 className={styles.headerTitle}>Channels</h3>
        </div>
        <div className={styles.body}>
          {this.props.channels.length ? (
            <TabsComponent items={this.props.groups}
                           onSelect={this.props.onSelectGroup}
                           selected={this.props.selectedGroup.name}/>
          ) : null}
          <div className={styles.list}>{this.getList()}</div>
        </div>
      </div>
    );
  }
}
