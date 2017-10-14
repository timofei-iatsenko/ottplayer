import { ChannelEpgComponent, DispatchProps, OwnProps, StateProps } from './channel-epg';
import { fetchChannelEpg } from '../../actions/epg.actions';
import { Dispatch } from 'redux';
import { AppState } from '../../store';
import { connect } from 'react-redux';
import { EpgEntry } from '../../entities/epg-entry';

function filterOutdatedEntries(entries: EpgEntry[]) {
  const index = entries.findIndex((entry) => entry.inAir);
  return entries.slice(index);
}

function mapStateToProps(state: AppState, ownProps: OwnProps): StateProps {
  return {
    epgUrl: `${state.playlist.urlEpg}channel/${ownProps.channelId}`,
    entries: filterOutdatedEntries(state.currentChannel.epg),
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
