import { Actions, Effect } from '@ngrx/effects';
import { ofType } from 'ts-action-operators';
import { switchMap, withLatestFrom, filter, map, takeUntil, tap } from 'rxjs/internal/operators';
import { AppState } from '@store';
import { Store } from '@ngrx/store';
import { GetEpg, StopEpgSync, EpgLoaded } from '@store/actions/epg.actions';
import { Injectable } from '@angular/core';
import { db } from '../../db';
import { fromPromise } from 'rxjs/internal/observable/fromPromise';
import { timer } from 'rxjs';
import { fetchEpg } from '../../api/epg.api';
import { LocalStorageFactory } from '../../libs/storage';

const EPG_UPDATE_PERIOD_HOURS = 6;

function isEpgOutdated(lastUpdate: number) {
  return !lastUpdate || ((Date.now() - lastUpdate) >= EPG_UPDATE_PERIOD_HOURS * 1000 * 60 * 60);
}

@Injectable()
export class EpgEffects {
  private lastUpdateStorage = LocalStorageFactory.create<number>('epgLastUpdate');

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
  ) {}

  @Effect()
  public fetchEpg$ = this.actions$.pipe(
    ofType(GetEpg),
    withLatestFrom(
      this.store.select((store) => store.channels.urlEpg),
      this.store.select((store) => store.channels.channels.map((ch) => ch.id)),
      (action, urlEpg, channelsIds) => ({ urlEpg, channelsIds }),
    ),
    switchMap(({ urlEpg, channelsIds }) => {
      const lastUpdate = this.lastUpdateStorage.get();
      if (isEpgOutdated(lastUpdate)) {
        return this.startSync(urlEpg, channelsIds);
      }

      return [new EpgLoaded({ finishTime: lastUpdate })];
    }),
  );

  private fetchEpg(url: string, channelsIds: number[]) {
    return fromPromise(fetchEpg(url, channelsIds)).pipe(
      switchMap(async (epg) => {
        await db.epg.clear();
        await db.epg.bulkAdd(epg);
        return epg;
      }),
      map(() => new EpgLoaded({ finishTime: Date.now() })),
      tap((action) => this.lastUpdateStorage.set(action.payload.finishTime)),
    );
  }

  private startSync(url: string, channelsIds: number[]) {
    return timer(0, 1000 * 60 * 60).pipe(
      takeUntil(this.actions$.pipe(ofType(StopEpgSync))),
      filter(() => isEpgOutdated(this.lastUpdateStorage.get())),
      switchMap(() => this.fetchEpg(url, channelsIds)),
    );
  }
}
