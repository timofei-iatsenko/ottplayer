import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { EpgEntry } from '../../entities/epg-entry';
import { epgInAir } from '@store/reducers/epg.reducer';

@Component({
  selector: 'channel-epg',
  template: `
    <div class="entries" *ngIf="entries">
      <div class="entry"
           *ngFor="let entry of filterOutdatedEntries(entries); trackBy: trackEntries">
        <h5 class="name">{{entry.name}}</h5>
        <div class="program-timebox">
          {{entry.startTime | time}} - {{entry.endTime | time}}
          {{entry.endTime - entry.startTime | duration}} ({{entry.startTime | date}})
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./channel-epg.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChannelEpgComponent {
  @Input() public entries: EpgEntry[];

  public trackEntries(index: number, entry: EpgEntry) {
    return entry.startTime;
  }

  public filterOutdatedEntries(entries: EpgEntry[]) {
    const index = entries.findIndex(epgInAir);
    return entries.slice(index + 1);

  }
}
