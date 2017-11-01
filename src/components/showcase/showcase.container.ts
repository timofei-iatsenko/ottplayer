import { connect } from 'react-redux';
import { AppState } from '../../store';
import { DispatchProps, Showcase, StoreProps } from './showcase';
import { fetchPlaylist } from '../../actions/playlist.actions';
import { startCurrentEpgSync, stopCurrentEpgSync } from '../../actions/epg.actions';
import { Dispatch } from 'redux';

function mapStateToProps(state: AppState): StoreProps {
  return {
    currentKey: state.settings.currentKey,
    playlistUrl: state.settings.playlistUrl,
  };
}

function mapDispatchToProps(dispatch: Dispatch<AppState>): DispatchProps {
  return {
    onFetchData: async (playlistUrl: string) => {
      await dispatch(fetchPlaylist(playlistUrl));
      dispatch(startCurrentEpgSync());
    },
    onUnmount: () => {
      dispatch(stopCurrentEpgSync());
    },
  };
}

export const ShowCaseContainer = connect<StoreProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Showcase);
