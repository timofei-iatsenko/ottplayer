export const SET_FAVOURITES = 'SET_FAVOURITES';
export const DELETE_FAVOURITES = 'DELETE_FAVOURITES';

export function setFavourites(favourites: number[]) {
  return {
    type: SET_FAVOURITES,
    favourites,
  };
}
