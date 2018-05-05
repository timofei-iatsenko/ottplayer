import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { StartChannelEpgSync, StopChannelEpgSync } from '../../actions/epg.actions';
import { EpgEntry } from '../../entities/epg-entry';
import { AppState } from '../../store';
import { ChannelEpgComponent, DispatchProps, OwnProps, StateProps } from './channel-epg';

function filterOutdatedEntries(entries: EpgEntry[]) {
  const index = entries.findIndex((entry) => entry.inAir);
  return entries.slice(index);
}

function mapStateToProps(state: AppState): StateProps {
  return {
    entries: filterOutdatedEntries(state.currentChannel.epg),
  };
}

function mapDispatchToProps(dispatch: Dispatch<AppState>): DispatchProps {
  return {
    onStartDataSync: (channelId) => {
      dispatch(new StartChannelEpgSync({channelId}));
    },
    onStopDataSync: () => {
      dispatch(new StopChannelEpgSync());
    },
  };
}

export const ChannelEpg = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(ChannelEpgComponent);
