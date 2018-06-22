import { connect } from 'react-redux';
import { EpgEntry } from '../../entities/epg-entry';
import { AppState } from '../../store';
import { epgInAir, selectChannelEpg } from '../../store/reducers/epg.reducer';
import { ChannelEpgComponent, OwnProps, StateProps } from './channel-epg';

function filterOutdatedEntries(entries: EpgEntry[]) {
  const index = entries.findIndex(epgInAir);
  return entries.slice(index);
}

function mapStateToProps(state: AppState, ownProps: OwnProps): StateProps {
  return {
    entries: filterOutdatedEntries(selectChannelEpg(state, ownProps.channelId)),
  };
}

export const ChannelEpg = connect<StateProps, {}, OwnProps>(
  mapStateToProps,
)(ChannelEpgComponent);
