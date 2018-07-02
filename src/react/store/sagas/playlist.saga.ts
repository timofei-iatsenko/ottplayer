import { call, put, take } from 'redux-saga/effects';
import * as Api from '../../api/playlist.api';
import { Playlist } from '../../entities/playlist.model';
import { GetEpg } from '../actions/epg.actions';
import { ReceivePlaylist, RequestPlaylist } from '../actions/channels.actions';

export default function* main() {
  while (true) {
    const action = (yield take(RequestPlaylist.type)) as typeof RequestPlaylist.action;
    const playlist = (yield call(Api.fetchPlaylist, action.payload.playlistUrl)) as Playlist;
    yield put(new ReceivePlaylist({ playlist }));
    yield put(new GetEpg());
  }
}
