import { AppState } from '../store';
import { ThunkAction } from 'redux-thunk';
import { EpgDictionary, EpgEntry } from '../entities/epg-entry';
import { schedule } from '../libs/scheduler';

export enum EpgActions {
  REQUEST_CURRENT_EPG = 'REQUEST_CURRENT_EPG',
  RECEIVE_CURRENT_EPG = 'RECEIVE_CURRENT_EPG',
  FAILED_LOAD_CURRENT_EPG = 'FAILED_LOAD_CURRENT_EPG',

  REQUEST_CHANNEL_EPG = 'REQUEST_CHANNEL_EPG',
  RECEIVE_CHANNEL_EPG = 'RECEIVE_CHANNEL_EPG',
  FAILED_LOAD_CHANNEL_EPG = 'FAILED_LOAD_CHANNEL_EPG',
}


function requestCurrentEpg() {
  return {
    type: EpgActions.REQUEST_CURRENT_EPG,
  };
}

function receiveCurrentEpg(epg: EpgDictionary) {
  return {
    type: EpgActions.RECEIVE_CURRENT_EPG,
    epg,
  };
}

function requestChannelEpg() {
  return {
    type: EpgActions.REQUEST_CHANNEL_EPG,
  };
}

function receiveChannelEpg(epg: EpgEntry[]) {
  return {
    type: EpgActions.RECEIVE_CHANNEL_EPG,
    epg,
  };
}
function getTime(seconds: number): number {
  return (Date.now() / 1000) + (seconds * 1000);
}
export function fetchCurrentEpg(epgUrl: string): ThunkAction<Promise<any>, AppState, void> {
  return (dispatch) => {
    dispatch(requestCurrentEpg());

    return window.fetch(epgUrl)
      .then((r) => r.json())
      .then((response) => {
        let invalidateDate = getTime(5);

        const epg = Object.keys(response).reduce((acc, key) => {
          acc[key] = new EpgEntry(response[key]);
          invalidateDate = Math.min(invalidateDate, acc[key].endTime);
          return acc;
        }, {} as any);

        schedule(invalidateDate).then(() => {
          dispatch(fetchCurrentEpg(epgUrl));
        });

        return dispatch(receiveCurrentEpg(epg));
      })
      .catch(() => {
        const reloadDate = getTime(10);
        schedule(reloadDate).then(() => {
          dispatch(fetchCurrentEpg(epgUrl));
        });
      });
  };
}

export function fetchChannelEpg(epgUrl: string): ThunkAction<Promise<any>, AppState, void> {
  return (dispatch) => {
    dispatch(requestChannelEpg());

    return window.fetch(epgUrl)
      .then((r) => r.json())
      .then((response) => {
        const epg = Object.keys(response).reduce((acc, key) => {
          acc.push(new EpgEntry(response[key]));
          return acc;
        }, [] as EpgEntry[]);

        const currentProgram = epg.find(programInAir);

        schedule(currentProgram.endTime).then(() => {
          dispatch(fetchChannelEpg(epgUrl));
        });

        return dispatch(receiveChannelEpg(epg));
      })
      .catch(() => {
        const reloadDate = getTime(10);
        schedule(reloadDate).then(() => {
          dispatch(fetchChannelEpg(epgUrl));
        });
      });
  };
}

function programInAir(entry: EpgEntry) {
  const currentTime = Date.now() / 1000;
  return entry.startTime <= currentTime && entry.endTime >= currentTime;
}
