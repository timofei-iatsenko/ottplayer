import { FavouritesActions } from '../actions/favourites.actions';

export interface FavouritesState {
  readonly savedChannels: ReadonlyArray<number>;
  readonly selectedChannels: ReadonlyArray<number>;
}

const initialState: FavouritesState = {
  savedChannels: [],
  selectedChannels: [],
};

export function favouritesReducer(state = initialState, action: any): FavouritesState {
  switch (action.type) {
    case FavouritesActions.save:
      return {...state, savedChannels: action.favourites, selectedChannels: action.favourites};
    case FavouritesActions.select:
      return {...state, selectedChannels: action.favourites};
    default:
      return state;
  }
}
