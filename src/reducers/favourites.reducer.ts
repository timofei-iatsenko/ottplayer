import { SET_FAVOURITES } from '../actions/favourites.actions';
import { LocalStorageFactory } from '../libs/storage';

const favouritesStorage = LocalStorageFactory.create<number[]>('favourites');

export function favouritesReducer(state: number[] = favouritesStorage.get([]), action: any) {
  switch (action.type) {
    case SET_FAVOURITES:
      favouritesStorage.set(action.favourites);
      return action.favourites;
    default:
      return state;
  }
}
