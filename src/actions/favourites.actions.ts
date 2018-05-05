import { action, payload, union } from 'ts-action';

export const SaveFavourites = action('[Favourites] Save', payload<{favourites: ReadonlyArray<number>}>());

export const FavouritesActions = union({
  SaveFavourites,
});
