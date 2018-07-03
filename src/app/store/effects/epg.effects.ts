import { Actions, Effect } from '@ngrx/effects';
import { ofType } from 'ts-action-operators';
import { switchMap, withLatestFrom, filter, map, takeUntil, tap } from 'rxjs/internal/operators';
import { AppState } from '@store';
import { Store } from '@ngrx/store';
import { GetEpg, ReceiveEpg, StopEpgSync } from '@store/actions/epg.actions';
import { Injectable } from '@angular/core';
import { db } from '../../db';
import { fromPromise } from 'rxjs/internal/observable/fromPromise';
import { timer } from 'rxjs';
import { fetchEpg } from '../../api/epg.api';
import { epgLastUpdateStorage } from '@store/reducers/epg.reducer';

const EPG_UPDATE_PERIOD_HOURS = 6;

function isEpgOutdated(lastUpdate: number) {
  return !lastUpdate || ((Date.now() - lastUpdate) >= EPG_UPDATE_PERIOD_HOURS * 1000 * 60 * 60);
}

@Injectable()
export class EpgEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
  ) {}

  @Effect()
  public fetchEpg$ = this.actions$.pipe(
    ofType(GetEpg),
    withLatestFrom(
      this.store.select((store) => store.epg.lastUpdate),
      this.store.select((store) => store.channels.urlEpg),
      this.store.select((store) => store.channels.channels.map((ch) => ch.id)),
      (action, lastUpdate, urlEpg, channelsIds) => ({ lastUpdate, urlEpg, channelsIds }),
    ),
    switchMap(({ lastUpdate, urlEpg, channelsIds }) => {
      if (!isEpgOutdated(lastUpdate)) {
        return this.retrieveFromDb(lastUpdate);
      }

      return this.startSync(urlEpg, channelsIds);
    }),
  );

  private retrieveFromDb(lastUpdate: number) {
    return fromPromise(db.epg.toArray()).pipe(
      map((epg) => new ReceiveEpg({ epg, finishTime: lastUpdate })),
    );
  }

  private fetchEpg(url: string, channelsIds: number[]) {
    return fromPromise(fetchEpg(url, channelsIds)).pipe(
      switchMap(async (epg) => {
        await db.epg.clear();
        await db.epg.bulkAdd(epg);
        return epg;
      }),
      map((epg) => new ReceiveEpg({ epg, finishTime: Date.now() })),
      tap((action) => epgLastUpdateStorage.set(action.payload.finishTime))
    );
  }

  private startSync(url: string, channelsIds: number[]) {
    return timer(0, 1000 * 60 * 60).pipe(
      takeUntil(this.actions$.pipe(ofType(StopEpgSync))),
      withLatestFrom(this.store.select((store) => store.epg.lastUpdate)),
      filter(([lastUpdate]) => isEpgOutdated(lastUpdate)),
      switchMap(() => this.fetchEpg(url, channelsIds)),
    );
  }
}
