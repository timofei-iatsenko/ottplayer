import { delay } from 'redux-saga';
import { call, cancel, cancelled, fork, put, select, take } from 'redux-saga/effects';
import * as Api from '../../api/epg.api';
import { FetchEpgResponse } from '../../api/epg.api';
import {
  FailedLoadEpg,
  ReceiveEpg,
  StopEpgSync, GetEpg,
} from '../actions/epg.actions';
import { AppState } from '../index';
import { db } from '../../db';

const EPG_UPDATE_PERIOD_HOURS = 6;

function isEpgOutdated(lastUpdate: number) {
  return !lastUpdate || ((Date.now() - lastUpdate) >= EPG_UPDATE_PERIOD_HOURS * 1000 * 60 * 60);
}

function *startSync() {
  while (true) {
    // starts the task in the background
    const state: AppState = yield select();
    const channelsIds = state.playlist.channels.map((ch) => ch.id);
    const bgSyncTask = yield fork(bgSync, state.playlist.urlEpg, channelsIds);

    // wait for the user stop action
    yield take(StopEpgSync.type);
    yield cancel(bgSyncTask);
  }
}

function* bgSync(url: string, channelsIds: number[]) {
  try {
    while (true) {
      const state: AppState = yield select();

      if (isEpgOutdated(state.epg.lastUpdate)) {
        const epg = (yield call(Api.fetchEpg, url, channelsIds)) as FetchEpgResponse;
        yield put(new ReceiveEpg({ epg, finishTime: Date.now() }));
        yield call([db.epg, 'clear']);
        yield call([db.epg, 'bulkAdd'], epg);
      }

      yield call(delay, 1000 * 60 * 60);
    }
  } finally {
    if (yield cancelled()) {
      yield put(new FailedLoadEpg({error: 'Cancelled'}));
    }
  }
}

function *getEpg() {
  while (true) {
    yield take(GetEpg.type);
    const state: AppState = yield select();

    if (!isEpgOutdated(state.epg.lastUpdate)) {
      const epg = yield call([db.epg, 'toArray']);
      yield put(new ReceiveEpg({ epg, finishTime: state.epg.lastUpdate }));
    }
    yield startSync();
  }
}

export default function* main() {
  yield getEpg();
}
