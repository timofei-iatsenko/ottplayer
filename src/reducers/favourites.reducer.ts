import { FavouritesActions } from '../actions/favourites.actions';

export type FavouritesState = ReadonlyArray<number>;

const initialState: FavouritesState = [];

export function favouritesReducer(state = initialState, action: any): FavouritesState {
  switch (action.type) {
    case FavouritesActions.save:
      return action.favourites;
    default:
      return state;
  }
}
