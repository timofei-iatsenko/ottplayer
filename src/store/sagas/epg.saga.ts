import { delay } from 'redux-saga';
import { call, cancel, cancelled, fork, put, select, take } from 'redux-saga/effects';
import * as Api from '../../api/epg.api';
import { FetchEpgResponse } from '../../api/epg.api';
import {
  FailedLoadEpg,
  ReceiveEpg,
  StartEpgSync,
  StopEpgSync,
} from '../actions/epg.actions';
import { AppState } from '../index';

const EPG_UPDATE_PERIOD_HOURS = 6;

function* bgSync(url: string, channelsIds: number[]) {
  try {
    while (true) {
      const state: AppState = yield select();

      if (!state.epg.lastUpdate || ((Date.now() - state.epg.lastUpdate) >= EPG_UPDATE_PERIOD_HOURS * 1000 * 60 * 60)) {
        const epg = (yield call(Api.fetchEpg, url, channelsIds)) as FetchEpgResponse;
        yield put(new ReceiveEpg({ epg, finishTime: Date.now() }));
      }

      yield call(delay, 1000 * 60 * 60);
    }
  } finally {
    if (yield cancelled()) {
      yield put(new FailedLoadEpg({error: 'Cancelled'}));
    }
  }
}

export default function* main() {
  while (true) {
    yield take(StartEpgSync.type);
    // starts the task in the background
    const state: AppState = yield select();
    const channelsIds = state.playlist.channels.map((ch) => ch.id);
    const bgSyncTask = yield fork(bgSync, state.playlist.urlEpg, channelsIds);

    // wait for the user stop action
    yield take(StopEpgSync.type);
    yield cancel(bgSyncTask);
  }
}
