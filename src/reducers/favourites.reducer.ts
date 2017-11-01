import { FavouritesActions } from '../actions/favourites.actions';

export interface FavouritesState {
  readonly savedChannels: ReadonlyArray<number>;
}

const initialState: FavouritesState = {
  savedChannels: [],
};

export function favouritesReducer(state = initialState, action: any): FavouritesState {
  switch (action.type) {
    case FavouritesActions.save:
      return {...state, savedChannels: action.favourites};
    default:
      return state;
  }
}
