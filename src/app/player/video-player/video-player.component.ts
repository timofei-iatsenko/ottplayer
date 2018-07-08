import { Component, ChangeDetectionStrategy, Input, OnChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@store';
import { LaunchMedia } from '@store/reducers/player.reducer';

@Component({
  selector: 'video-player',
  template: `
    <local-player [src]="streamUrl"
                  *ngIf="!isCastingEnabled"></local-player>
    <cast-placeholder *ngIf="isCastingEnabled"></cast-placeholder>
  `,
  styleUrls: ['./video-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoPlayerComponent implements OnChanges {
  @Input() public streamUrl: string;
  @Input() public isCastingEnabled: boolean;

  constructor(
    private store: Store<AppState>,
  ) {}

  public ngOnChanges() {
    this.store.dispatch(new LaunchMedia({streamUrl: this.streamUrl}));
  }
}
