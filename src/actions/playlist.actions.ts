import { AppState } from '../store';
import { Playlist } from '../entities/playlist.model';
import { ThunkAction } from 'redux-thunk';
import { Channel } from '../entities/channel.model';

export const REQUEST_PLAYLIST = 'REQUEST_PLAYLIST';
export const RECEIVE_PLAYLIST = 'RECEIVE_PLAYLIST';
export const ERROR_FETCH_PLAYLIST = 'ERROR_FETCH_PLAYLIST';

function requestPlaylist(playlistUrl: string) {
  return {
    type: REQUEST_PLAYLIST,
    playlistUrl,
  };
}

function receivePlaylist(playlist: Playlist) {
  return {
    type: RECEIVE_PLAYLIST,
    playlist,
  };
}

export function fetchPlaylist(playlistUrl: string): ThunkAction<Promise<any>, AppState, void> {
  return (dispatch) => {
    dispatch(requestPlaylist(playlistUrl));

    return window.fetch(playlistUrl)
      .then((r) => r.json())
      .then((d) => d.playlist)
      .then((playlist: Playlist) => {
        playlist.channels.forEach((c: Channel) => {
          c.logo = playlist.urlLogo + c.logo;
          c.id = +c.id;
        });

        return dispatch(receivePlaylist(playlist));
      });
  };
}
