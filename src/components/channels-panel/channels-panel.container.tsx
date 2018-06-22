import { connect, MapDispatchToPropsParam, MapStateToPropsParam } from 'react-redux';
import { AppState } from '../../store';
import { ChannelsPanelComponent, DispatchProps, OwnProps, StateProps } from './channels-panel';
import { SetActiveGroup } from '../../store/actions/channels.actions';

const mapStateToProps: MapStateToPropsParam<StateProps, OwnProps, AppState> = (state: AppState) => {
  return {
    currentEpg: state.epg,
    ...state.channels,
    selectedGroup: state.channels.groups.find((group) => group.name === state.channels.selectedGroup),
  };
};

const mapDispatchToProps: MapDispatchToPropsParam<DispatchProps, OwnProps> = (dispatch) => {
  return {
    onSelectGroup: (group) => {
      dispatch(new SetActiveGroup({ name: group.name }));
    },
  };
};

export const ChannelsPanel = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(ChannelsPanelComponent);
