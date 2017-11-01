import { FavouritesActions } from '../actions/favourites.actions';
import { LocalStorageFactory } from '../libs/storage';

export interface FavouritesState {
  readonly savedChannels: ReadonlyArray<number>;
  readonly selectedChannels: ReadonlyArray<number>;
}

const favouritesStorage = LocalStorageFactory.create<ReadonlyArray<number>>('favourites');

const initialState: FavouritesState = {
  savedChannels: favouritesStorage.get([]),
  selectedChannels: favouritesStorage.get([]),
};

export function favouritesReducer(state = initialState, action: any): FavouritesState {
  switch (action.type) {
    case FavouritesActions.save:
      favouritesStorage.set(action.favourites); // todo: shitty, unpure
      return {...state, savedChannels: action.favourites, selectedChannels: action.favourites};
    case FavouritesActions.select:
      return {...state, selectedChannels: action.favourites};
    default:
      return state;
  }
}
