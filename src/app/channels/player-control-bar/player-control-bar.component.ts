import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@store';
import { selectCurrentChannel } from '@store/reducers/channels.reducer';
import { EpgStreamsFactory } from '../epg-streams.service';
import { ToggleMainPanel } from '@store/actions/ui.actions';
import { selectCastingEnabled } from '@store/reducers/casting.reducer';
import { Router } from '@angular/router';
import { TogglePlayback } from '@store/reducers/player.reducer';

@Component({
  selector: 'player-control-bar',
  template: `
    <div class="host" *ngIf="currentChannel$ | async as currentChannel">
      <div class="icon" [class.casting]="isCasting$ | async" (click)="clickOnBar()">
        <img [src]="currentChannel.logo"/>
        <div class="cast-overlay">
          <i class="material-icons">cast_connected</i>
        </div>
      </div>

      <div class="wrap">
        <div class="progress" *ngIf="epgStreams.currentEpg$ | async as epg">
          <progress-bar [startTime]="epg.startTime" [endTime]="epg.endTime"></progress-bar>
          <span class="start-time">{{epg.startTime | time}}</span>
          <span class="end-time">{{epg.endTime | time}}</span>
        </div>

        <div class="program-info" *ngIf="epgStreams.currentEpg$ | async as epg">
          <div class="program-name">
            {{epg.name}}
          </div>

          <div class="channel-name">
           {{currentChannel.name}}
          </div>
        </div>

        <div class="buttons">
          <button class="play-pause-btn"
                  (click)="togglePlayBack()"
                  [disabled]="!(isPlayerReady$ | async)">
            <i class="material-icons">{{(isPaused$ | async) ? 'play_arrow': 'pause'}}</i>
          </button>
          <button class="stop-btn"
                  (click)="close()"
                  [disabled]="!(isPlayerReady$ | async)">
            <i class="material-icons">close</i>
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./player-control-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerControlBarComponent {
  constructor(
    private store: Store<AppState>,
    private epgStreamsFactory: EpgStreamsFactory,
    private router: Router,
  ) {}

  public currentChannel$ = this.store.select(selectCurrentChannel);
  public isCasting$ = this.store.select(selectCastingEnabled);
  public isPlayerReady$ = this.store.select((store) => store.player.ready);
  public isPaused$ = this.store.select((store) => store.player.paused);

  public epgStreams = this.epgStreamsFactory.create(
    this.store.select((state) => state.channels.selectedChannelId),
  );

  public clickOnBar() {
    this.store.dispatch(new ToggleMainPanel({ visible: true }));
  }

  public togglePlayBack() {
    this.store.dispatch(new TogglePlayback());
  }

  public close() {
    this.router.navigate(['/']);
  }
}
