import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { epgInAir } from '@store/reducers/epg.reducer';
import { AppState } from '@store';
import { Store } from '@ngrx/store';
import { Channel } from '../../entities/channel.model';
import {
  map,
  withLatestFrom,
  distinctUntilChanged,
  switchMap,
  shareReplay,
} from 'rxjs/operators';
import { OttDataBase } from '../../db';
import { timer } from 'rxjs';

@Component({
  selector: 'channel-details',
  template: `
    <div class="details">
      <h5 [title]="channel.name" class="name">{{channel.name}}</h5>

      <ng-container *ngIf="(currentEpg$ | async) as currentEpg">
        <div [title]="'Сейчас: ' + currentEpg.name"
             class="current-program">
          <span class="time">{{currentEpg.startTime | time}}</span>
          {{currentEpg.name}}
        </div>
        <progress-bar [startTime]="currentEpg.startTime"
                      [endTime]="currentEpg.endTime"></progress-bar>
      </ng-container>

      <div *ngIf="(nextEpg$ | async) as nextEpg" [title]="'Далее:' + nextEpg.name"
           class="next-program">
        <span class="time">{{nextEpg.startTime | time}}</span>
        {{nextEpg.name}}
      </div>
    </div>
  `,
  styleUrls: ['./channel-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChannelDetailsComponent {
  @Input() public channel: Channel;

  private epg$ = this.store.select((state) => state.epg.lastUpdate).pipe(
    switchMap(() => this.db.queryChannelEpg(this.channel.id)),
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

  constructor(
    private store: Store<AppState>,
    private db: OttDataBase,
  ) {}
}
