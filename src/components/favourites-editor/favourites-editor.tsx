import React, { Component } from 'react';
import { SidePanel } from '../side-panel/side-panel';
import { SaveBar } from './save-bar/save-bar';
import { SelectableChannelsList } from '../channels/selectable-channels-list/selectable-channels-list';
import { Channel, ReadonlyChannelsCollection } from '../../entities/channel.model';
import { AppState } from '../../store';
import { connect } from 'react-redux';
import { withChannelNavigation } from '../hoc/with-channel-navigation';
import { Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';
import { saveFavourites } from '../../actions/favourites.actions';
import autobind from 'autobind-decorator';

interface FavouritesEditorProps {
  channels: ReadonlyChannelsCollection;
  favourites: ReadonlyArray<number>;
  onChangeChannel: (channel: Channel) => void;
  onCancel: () => void;
  onSave: (selection: ReadonlyArray<number>) => void;
}

export class FavouritesEditorComponent extends Component<FavouritesEditorProps> {
  public state = {
    selectedChannels: this.props.favourites,
    touched: false,
  };

  @autobind
  private handleSelectionChange(selection: ReadonlyArray<number>) {
    this.setState({ selectedChannels: selection, touched: true });
  }

  public render() {
    const header = <SaveBar
      saveDisabled={!this.state.selectedChannels.length || !this.state.touched}
      onSave={() => this.props.onSave(this.state.selectedChannels)}
      onCancel={this.props.onCancel}/>;

    const body = <SelectableChannelsList
      channels={this.props.channels}
      selected={this.state.selectedChannels}
      onChangeChannel={this.props.onChangeChannel}
      onSelectionChange={this.handleSelectionChange}/>;

    return (
      <SidePanel header={header} body={body}/>
    );
  }
}

function mapStateToProps(state: AppState): Partial<FavouritesEditorProps> {
  return {
    channels: state.playlist.channels,
    favourites: state.favourites.savedChannels,
  };
}

function mapDispatchToProps(dispatch: Dispatch<AppState>, ownProps: RouteComponentProps<{}>): Partial<FavouritesEditorProps> {
  return {
    onSave: (favourites) => {
      dispatch(saveFavourites(favourites));
      ownProps.history.push('/');
    },
    onCancel: () => ownProps.history.push('/'),
  };
}

export const FavouritesEditor = withChannelNavigation(
  connect(mapStateToProps, mapDispatchToProps)(FavouritesEditorComponent),
);
