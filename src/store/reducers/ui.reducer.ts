import { on, reducer } from 'ts-action';
import { ToggleMainPanel } from '../actions/ui.actions';
export interface UiState {
  readonly classes: {
    readonly mainPanelVisible: boolean,
  };
}

const initialState: UiState = {
  classes: {
    mainPanelVisible: false,
  },
};

export const uiReducer = reducer<UiState>([
  on(ToggleMainPanel, (state, {payload}) => ({ ...state, classes: {
    ...state.classes, mainPanelVisible: payload.visible }})),
], initialState);
