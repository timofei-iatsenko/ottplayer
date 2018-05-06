import { call, cancel, cancelled, fork, put, select, take } from 'redux-saga/effects';
import {
  FailedLoadChannelEpg,
  ReceiveChannelEpg,
  RequestChannelEpg,
  StartChannelEpgSync,
  StopChannelEpgSync,
} from '../actions/epg.actions';
import * as Api from '../../api/epg.api';
import { ChannelEpgResponse } from '../../api/epg.api';
import { schedule } from '../../libs/scheduler';
import { AppState } from '../index';

function* bgSync(url: string) {
  try {
   while (true) {
      yield put(new RequestChannelEpg());
      const {epg, invalidateDate} = (yield call(Api.fetchChannelEpg, url)) as ChannelEpgResponse;
      yield put(new ReceiveChannelEpg({ epg }));
      yield call(schedule, invalidateDate);
   }
  } finally {
    if (yield cancelled()) {
      yield put(new FailedLoadChannelEpg({error: 'Cancelled'}));
    }
  }
}

export default function* main() {
  while (true) {
    const action = (yield take(StartChannelEpgSync.type)) as typeof StartChannelEpgSync.action;
    // starts the task in the background
    const state: AppState = yield select();
    const url = `${state.playlist.urlEpg}channel/${action.payload.channelId}`;
    const bgSyncTask = yield fork(bgSync, url);

    // wait for the user stop action
    yield take(StopChannelEpgSync.type);
    yield cancel(bgSyncTask);
  }
}
