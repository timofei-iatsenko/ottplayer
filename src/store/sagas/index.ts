import { all } from 'redux-saga/effects';
import currentEpg from './current-epg.saga';
import channelEpg from './channel-epg.saga';
import playlist from './playlist.saga';

export function* rootSaga() {
  yield all([
    currentEpg(),
    channelEpg(),
    playlist(),
  ]);
}
