import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AppState } from '@store';
import { Store } from '@ngrx/store';
import { ToggleMainPanel } from '@store/actions/ui.actions';
import { selectCurrentChannel, selectStreamUrl } from '@store/reducers/channels.reducer';
import { selectCastingEnabled } from '@store/reducers/casting.reducer';
import { EpgStreamsFactory } from '../epg-streams.service';

@Component({
  selector: 'player-area',
  template: `
    <div class="main-panel">
      <div class="top-controls">
        <button type='button' (click)="goBack()" class="back-btn">
          <i class="material-icons">keyboard_arrow_left</i>
        </button>
      </div>

      <div class="player-container">
       <video-player
         [streamUrl]="streamUrl$ | async"
         [isCastingEnabled]="isCastingEnabled$ | async"
       ></video-player>
        <div class="progress" *ngIf="epgStreams.currentEpg$ | async as epg">
          <progress-bar [startTime]="epg.startTime" [endTime]="epg.endTime"></progress-bar>
        </div>
      </div>

      <div class="under-wrap">
        <div class="video-details">
          <div class="program-details" *ngIf="epgStreams.currentEpg$ | async as epg">
            <div class="program-name">
              {{epg.name}}
            </div>

            <div class="program-timebox">
              {{epg.startTime | time}} - {{epg.endTime | time}}
              {{epg.endTime - epg.startTime | duration}}
            </div>

            <div class="program-description">
              {{epg.descr}}
            </div>
          </div>

          <div class="channel-details" *ngIf="(currentChannel$ | async) as currentChannel">
            <div class="channel-logo">
              <img [src]="currentChannel.logo"/>
            </div>

            <div class="channel-name">
              {{currentChannel.name}}
            </div>
          </div>
        </div>

        <channel-epg *ngIf="(currentChannel$ | async) as currentChannel"
                     [entries]="epgStreams.epg$ | async">
        </channel-epg>
      </div>
    </div>`,
  styleUrls: ['./player-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerAreaComponent {
  public currentChannel$ = this.store.select(selectCurrentChannel);
  public streamUrl$ = this.store.select(selectStreamUrl);
  public isCastingEnabled$ = this.store.select(selectCastingEnabled);

  public epgStreams = this.epgStreamsFactory.create(this.store.select((state) => state.channels.selectedChannelId));

  constructor(
    private store: Store<AppState>,
    private epgStreamsFactory: EpgStreamsFactory,
  ) {}

  public goBack() {
    this.store.dispatch(new ToggleMainPanel({ visible: false }));
  }
}

