import { AppState } from '../store';
import { ThunkAction } from 'redux-thunk';
import { EpgDictionary, EpgEntry } from '../entities/epg-entry';

export const REQUEST_CURRENT_EPG = 'REQUEST_CURRENT_EPG';
export const RECEIVE_CURRENT_EPG = 'RECEIVE_CURRENT_EPG';

function requestCurrentEpg() {
  return {
    type: REQUEST_CURRENT_EPG,
  };
}

function receiveCurrentEpg(epg: EpgDictionary, invalidateDate: number) {
  return {
    type: RECEIVE_CURRENT_EPG,
    epg,
    invalidateDate,
  };
}

/**
 *
 * @param {number} when timestamp in *seconds*
 * @param {string} epgUrl
 */
export function scheduleEpgUpdate(when: number, epgUrl: string): ThunkAction<Promise<void>, AppState, void> {
  return (dispatch) => {
    return new Promise((resolve) => {
      const currentTs = Math.floor(Date.now() / 1000);
      let timeout = when - currentTs;

      if (when <= currentTs) {
        timeout = 1000 * 10;
      }

      window.setTimeout(() => {
        resolve();
        dispatch(fetchCurrentEpg(epgUrl));
      }, timeout);
    });
  };
}

export function fetchCurrentEpg(epgUrl: string): ThunkAction<Promise<any>, AppState, void> {
  return (dispatch) => {
    dispatch(requestCurrentEpg());

    return window.fetch(epgUrl)
      .then((r) => r.json())
      .then((response) => {
        let invalidateDate = 0;

        const epg =  Object.keys(response).reduce((acc, key) => {
          acc[key] = new EpgEntry(response[key]);
          invalidateDate = Math.max(invalidateDate, acc[key].endTime);
          return acc;
        }, {} as any);

        dispatch(scheduleEpgUpdate(invalidateDate, epgUrl));
        return dispatch(receiveCurrentEpg(epg, invalidateDate));
      });
  };
}
