export enum FavouritesActions {
  save = '[Favourites] Save',
}

export function saveFavourites(favourites: ReadonlyArray<number>) {
  return {
    type: FavouritesActions.save,
    favourites,
  };
}
