import { on, reducer } from 'ts-action';
import { SaveFavourites } from '../actions/favourites.actions';

export type FavouritesState = ReadonlyArray<number>;

const initialState: FavouritesState = [];

export const favouritesReducer = reducer<FavouritesState>([
  on(SaveFavourites, (_state, { payload }) => payload.favourites),
], initialState);
