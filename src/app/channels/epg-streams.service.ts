import { Injectable } from '@angular/core';
import { distinctUntilChanged, map, withLatestFrom, shareReplay, switchMap } from 'rxjs/operators';
import { epgInAir } from '@store/reducers/epg.reducer';
import { timer, combineLatest, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@store';
import { OttDataBase } from '../db';

@Injectable({
  providedIn: 'root',
})
export class EpgStreamsFactory {
  constructor(
    private store: Store<AppState>,
    private db: OttDataBase,
  ) { }

  public create(channel$: Observable<number>) {
    return new EpgStreams(this.store, this.db, channel$);
  }
}

export class EpgStreams {
  constructor(
    private store: Store<AppState>,
    private db: OttDataBase,
    private channel$: Observable<number>
  ) { }

  public epg$ = combineLatest(
    this.store.select((state) => state.epg.lastUpdate),
    this.channel$,
  ).pipe(
    switchMap(([, chId]) => this.db.queryChannelEpg(chId)),
    shareReplay(1),
  );

  public currentEpg$ = timer(0, 1000 * 5).pipe(
    switchMap(() => this.epg$),
    map((epg) => epg.find(epgInAir)),
    distinctUntilChanged(),
    shareReplay(),
  );

  public nextEpg$ = this.currentEpg$.pipe(
    withLatestFrom(this.epg$),
    map(([current, all]) => {
      const currentIndex = all.indexOf(current);

      if (currentIndex + 1 <= all.length) {
        return all[currentIndex + 1];
      }

      return null;
    }),
    distinctUntilChanged(),
  );
}
