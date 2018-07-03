import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { EpgEntry } from '../../entities/epg-entry';
import { Store } from '@ngrx/store';
import { AppState } from '@store';
import { channelEpgSelector, epgInAir, selectChannelEpg } from '@store/reducers/epg.reducer';
import { map, tap } from 'rxjs/internal/operators';

@Component({
  selector: 'channel-epg',
  template: `
    <div class="host">
      <div class="entries">
        <div class="entry" *ngFor="let entry of (entries$ | async); trackBy: trackEntries">
          <div class="mainInfo">
            <h5 class="name">{{entry.name}}</h5>

            <div class="timing">
              <div class="start-time">{{entry.startTime | time}}</div>
              <div class="end-time">{{entry.endTime | time}}</div>
            </div>
          </div>

          <div class="side-info">
            <span class="date">{{entry.startTime | date}}</span>
            <span class="duration">{{entry.duration | duration}}</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./channel-epg.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChannelEpgComponent {
  @Input() public channelId: number;

  public entries$ = this.store
    .select((store) => selectChannelEpg(store, this.channelId)).pipe(
      map(this.filterOutdatedEntries),
    );

  constructor(
    private store: Store<AppState>,
  ) {}

  public trackEntries(index: number, entry: EpgEntry) {
    return entry.startTime;
  }

  private filterOutdatedEntries(entries: EpgEntry[]) {
    const index = entries.findIndex(epgInAir);
    return entries.slice(index - 1);
  }
}
