export enum FavouritesActions {
  save = '[Favourites] Save',
  select = '[Favourites] Change selection',
}

export function saveFavourites(favourites: ReadonlyArray<number>) {
  return {
    type: FavouritesActions.save,
    favourites,
  };
}

export function selectFavourites(favourites: ReadonlyArray<number>) {
  return {
    type: FavouritesActions.select,
    favourites,
  };
}
