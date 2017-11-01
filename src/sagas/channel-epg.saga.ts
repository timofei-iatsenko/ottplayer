import * as Api from '../api/epg.api';
import { call, cancel, cancelled, fork, put, select, take } from 'redux-saga/effects';
import * as actions from '../actions/epg.actions';
import { EpgActions } from '../actions/epg.actions';
import { schedule } from '../libs/scheduler';
import { AppState } from '../store';
import { ChannelEpgResponse } from '../api/epg.api';

function* bgSync(url: string) {
  try {
   while (true) {
      yield put(actions.requestChannelEpg());
      const {epg, invalidateDate} = (yield call(Api.fetchChannelEpg, url)) as ChannelEpgResponse;
      yield put(actions.receiveChannelEpg(epg));
      yield call(schedule, invalidateDate);
   }
  } finally {
    if (yield cancelled()) {
      yield put(actions.failedLoadChannelEpg('Cancelled'));
    }
  }
}

export default function* main() {
  while (true) {
    const action = yield take(EpgActions.START_CHANNEL_EPG_SYNC );
    // starts the task in the background
    const state: AppState = yield select();
    const url = `${state.playlist.urlEpg}channel/${action.channelId}`;
    const bgSyncTask = yield fork(bgSync, url);

    // wait for the user stop action
    yield take(EpgActions.STOP_CHANNEL_EPG_SYNC);
    yield cancel(bgSyncTask);
  }
}
