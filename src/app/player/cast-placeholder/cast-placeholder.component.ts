import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@store';
import { TogglePlayback } from '@store/reducers/player.reducer';

@Component({
  selector: 'cast-placeholder',
  template: `
    <i class="material-icons icon cast-icon">cast_connected</i>
    <button class="play btn" (click)="togglePlayBack()">
      <i class="material-icons icon">{{(isPaused$ | async) ? 'play_arrow': 'pause'}}</i>
    </button>
    <div class="cast-to">Гостиная</div>
  `,
  styleUrls: ['./cast-placeholder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CastPlaceholderComponent  {
  public isPaused$ = this.store.select((store) => store.player.paused);

  constructor(
    private store: Store<AppState>,
  ) { }

  public togglePlayBack() {
    this.store.dispatch(new TogglePlayback());
  }
}
