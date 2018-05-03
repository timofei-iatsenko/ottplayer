import {action, payload, union} from 'ts-action';

export const CastStateChanged = action('[Casting] Cast state changed', payload<{state: string}>());
export const SessionStateChanged = action('[Casting] Session state changed',  payload<{state: string}>());

const CastingActions = union({
  CastStateChanged,
  SessionStateChanged,
});

export interface CastingState {
  readonly castState: cast.framework.CastState;
  readonly sessionState: cast.framework.SessionState;
}

const initialState: CastingState = {
  castState: null,
  sessionState: null,
};

// tslint:disable-next-line no-shadowed-variable
export function castingReducer(state: CastingState = initialState, action: typeof CastingActions) {
  switch (action.type) {
    case SessionStateChanged.type: {
      return {
        ...state,
        sessionState: action.payload.state,
      };
    }
    case CastStateChanged.type: {
      return {
        ...state,
        castState: action.payload.state,
      };
    }
    default:
      return state;
  }
}
