import React, { PureComponent } from 'react';
import { SidePanel } from '../side-panel/side-panel';
import { SaveBar } from './save-bar/save-bar';
import { SelectableChannelsList } from '../channels/selectable-channels-list/selectable-channels-list';
import { Channel, ReadonlyChannelsCollection } from '../../entities/channel.model';
import { AppState } from '../../store';
import { connect } from 'react-redux';
import { withChannelNavigation } from '../hoc/with-channel-navigation';
import { Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';
import { saveFavourites, selectFavourites } from '../../actions/favourites.actions';

interface FavouritesEditorProps {
  channels: ReadonlyChannelsCollection;
  favourites: ReadonlyArray<number>;
  selected: ReadonlyArray<number>;
  onChangeChannel: (channel: Channel) => void;
  onCancel: () => void;
  onSelect: (selection: ReadonlyArray<number>) => void;
  onSave: (selection: ReadonlyArray<number>) => void;
}

export class FavouritesEditorComponent extends PureComponent<FavouritesEditorProps> {
  public render() {
    const header = <SaveBar
      saveDisabled={this.props.favourites.length === 0}
      onSave={() => this.props.onSave(this.props.favourites)}
      onCancel={this.props.onCancel}/>;

    const body = <SelectableChannelsList
      channels={this.props.channels}
      selected={this.props.favourites}
      onChangeChannel={this.props.onChangeChannel}
      onSelectionChange={this.props.onSelect} />;

    return (
      <SidePanel header={header} body={body}/>
    );
  }
}

function mapStateToProps(state: AppState): Partial<FavouritesEditorProps> {
  return {
    channels: state.playlist.channels,
    favourites: state.favourites.savedChannels,
    selected: state.favourites.selectedChannels,
  };
}

function mapDispatchToProps(dispatch: Dispatch<AppState>, ownProps: RouteComponentProps<{}>): Partial<FavouritesEditorProps> {
  return {
    onSave: (favourites) => {
      dispatch(saveFavourites(favourites));
      ownProps.history.push('/');
    },
    onSelect: (favourites) => {
      dispatch(selectFavourites(favourites));
    },

    onCancel: () => ownProps.history.push('/'),
  };
}

export const FavouritesEditor = withChannelNavigation(connect(mapStateToProps, mapDispatchToProps)(FavouritesEditorComponent));
