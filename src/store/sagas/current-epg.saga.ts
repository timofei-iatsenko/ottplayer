import { call, cancel, cancelled, fork, put, select, take } from 'redux-saga/effects';
import {
  FailedLoadCurrentEpg,
  ReceiveCurrentEpg,
  RequestCurrentEpg,
  StartCurrentEpgSync,
  StopCurrentEpgSync,
} from '../actions/epg.actions';
import * as Api from '../../api/epg.api';
import { CurrentEpgResponse } from '../../api/epg.api';
import { schedule } from '../../libs/scheduler';
import { AppState } from '../index';

function* bgSync(url: string) {
  try {
    while (true) {
      yield put(new RequestCurrentEpg());
      const {epg, invalidateDate} = (yield call(Api.fetchCurrentEpg, url)) as CurrentEpgResponse;
      yield put(new ReceiveCurrentEpg({epg}));
      yield call(schedule, invalidateDate);
    }
  } finally {
    if (yield cancelled()) {
      yield put(new FailedLoadCurrentEpg({error: 'Cancelled'}));
    }
  }
}

export default function* main() {
  while ( yield take(StartCurrentEpgSync.type) ) {
    // starts the task in the background
    const state: AppState = yield select();
    const bgSyncTask = yield fork(bgSync, state.playlist.urlEpg + 'channel_now');

    // wait for the user stop action
    yield take(StopCurrentEpgSync.type);
    yield cancel(bgSyncTask);
  }
}
