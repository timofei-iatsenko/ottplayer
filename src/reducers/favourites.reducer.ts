import { FavouritesActions, SaveFavourites } from '../actions/favourites.actions';

export type FavouritesState = ReadonlyArray<number>;

const initialState: FavouritesState = [];

export function favouritesReducer(state = initialState, action: typeof FavouritesActions): FavouritesState {
  switch (action.type) {
    case SaveFavourites.type:
      return action.payload.favourites;
    default:
      return state;
  }
}
