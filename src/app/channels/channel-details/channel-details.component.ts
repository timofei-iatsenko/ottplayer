import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { epgInAir, channelEpgSelector, selectChannelEpg } from '@store/reducers/epg.reducer';
import { AppState } from '@store';
import { Store } from '@ngrx/store';
import { Channel } from '../../entities/channel.model';
import { map, withLatestFrom, distinctUntilChanged } from 'rxjs/internal/operators';
import { timer } from 'rxjs/index';

@Component({
  selector: 'channel-details',
  template: `
    <div class="details">
      <h5 [title]="channel.name" class="name">{{channel.name}}</h5>

      <div *ngIf="(currentEpg$ | async) as currentEpg" [title]="'Сейчас: ' + currentEpg.name"
           class="current-program">
        <span class="time">{{currentEpg.startTime | time}}</span>
        {{currentEpg.name}}
      </div>

      <progress-bar *ngIf="(currentEpg$ | async) as currentEpg"
                    [startTime]="currentEpg.startTime"
                    [endTime]="currentEpg.endTime"></progress-bar>

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

  public epg$ = timer(0, 1000 * 5).pipe(
    withLatestFrom(
      this.store.select((store) => selectChannelEpg(store, this.channel.id)),
      (i, epg) => epg,
    )
  );

  public currentEpg$ = this.epg$.pipe(
    map((epg) => epg.find(epgInAir)),
    distinctUntilChanged(),
  );

  public nextEpg$ = this.epg$.pipe(
    withLatestFrom(this.currentEpg$),
    map(([epg, current]) => {
      const currentIndex = epg.indexOf(current);

      if (currentIndex + 1 <= epg.length) {
        return epg[currentIndex + 1];
      }

      return null;
    }),
    distinctUntilChanged(),
  );

  constructor(
    private store: Store<AppState>,
  ) {}
}
