import { Dispatch } from 'redux';
import { AppState } from '../app';
import { Playlist } from '../entities/playlist.model';
import { ThunkAction } from 'redux-thunk';

export const SET_FAVOURITES = 'SET_FAVOURITES';
export const DELETE_FAVOURITES = 'DELETE_FAVOURITES';

function setFavourites(favourites: number[]) {
  return {
    type: SET_FAVOURITES,
    favourites,
  };
}
