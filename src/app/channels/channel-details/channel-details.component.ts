import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Channel } from '../../entities/channel.model';
import { EpgStreamsFactory } from '../epg-streams.service';
import { defer } from 'rxjs';

@Component({
  selector: 'channel-details',
  template: `
    <div class="details">
      <h5 [title]="channel.name" class="name">{{channel.name}}</h5>

      <ng-container *ngIf="(epgStreams.currentEpg$ | async) as currentEpg">
        <div [title]="'Сейчас: ' + currentEpg.name"
             class="current-program">
          <span class="time">{{currentEpg.startTime | time}}</span>
          {{currentEpg.name}}
        </div>
        <progress-bar [startTime]="currentEpg.startTime"
                      [endTime]="currentEpg.endTime"></progress-bar>
      </ng-container>

      <div *ngIf="(epgStreams.nextEpg$ | async) as nextEpg" [title]="'Далее:' + nextEpg.name"
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

  public epgStreams = this.epgStreamsFactory.create(defer(async() => await this.channel.id));

  constructor(
    private epgStreamsFactory: EpgStreamsFactory,
  ) {}
}
