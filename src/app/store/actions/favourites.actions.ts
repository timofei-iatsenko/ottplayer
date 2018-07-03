import { action, payload } from 'ts-action';

export const SaveFavourites = action('[Favourites] Save', payload<{favourites: number[]}>());
