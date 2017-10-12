import { ChannelEpgComponent, DispatchProps, OwnProps, StateProps } from './channel-epg';
import { fetchChannelEpg } from '../../actions/epg.actions';
import { Dispatch } from 'redux';
import { AppState } from '../../store';
import { connect } from 'react-redux';

function mapStateToProps(state: AppState, ownProps: OwnProps): StateProps {
  return {
    epgUrl: `${state.playlist.urlEpg}channel/${ownProps.channelId}`,
    entries: state.currentData.epg,
  };
}

function mapDispatchToProps(dispatch: Dispatch<AppState>): DispatchProps {
  return {
    onFetchData: (epgUrl: string) => {
      dispatch(fetchChannelEpg(epgUrl));
    },
  };
}

export const ChannelEpg = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(ChannelEpgComponent);
