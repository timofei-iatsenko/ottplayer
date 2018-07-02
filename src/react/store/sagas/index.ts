import { all } from 'redux-saga/effects';
import channelEpg from './epg.saga';
import playlist from './playlist.saga';

export function* rootSaga() {
  yield all([
    channelEpg(),
    playlist(),
  ]);
}
