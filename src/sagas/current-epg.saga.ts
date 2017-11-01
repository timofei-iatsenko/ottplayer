import * as Api from '../api/epg.api';
import { CurrentEpgResponse } from '../api/epg.api';
import { call, cancel, cancelled, fork, put, select, take } from 'redux-saga/effects';
import * as actions from '../actions/epg.actions';
import { EpgActions } from '../actions/epg.actions';
import { schedule } from '../libs/scheduler';
import { AppState } from '../store';

function* bgSync(url: string) {
  try {
    while (true) {
      yield put(actions.requestCurrentEpg());
      const {epg, invalidateDate} = (yield call(Api.fetchCurrentEpg, url)) as CurrentEpgResponse;
      yield put(actions.receiveCurrentEpg(epg));
      yield call(schedule, invalidateDate);
    }
  } finally {
    if (yield cancelled()) {
      yield put(actions.failedLoadCurrentEpg('Cancelled'));
    }
  }
}

export default function* main() {
  while ( yield take(EpgActions.START_CURRENT_EPG_SYNC) ) {
    // starts the task in the background
    const state: AppState = yield select();
    const bgSyncTask = yield fork(bgSync, state.playlist.urlEpg + 'channel_now');

    // wait for the user stop action
    yield take(EpgActions.STOP_CURRENT_EPG_SYNC);
    yield cancel(bgSyncTask);
  }
}
