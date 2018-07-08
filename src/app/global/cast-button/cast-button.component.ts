import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@store';

@Component({
  selector: 'cast-button',
  template: `
    <button class="btn"
            [class.active] = "isConnected$ | async"
            (click)="requestCastSession()"
            title='Cast to...'
            type='button'>
      <i class="material-icons">{{(isConnected$ | async) ? 'cast_connected' : 'cast'}}</i>
    </button>
  `,
  styleUrls: ['./cast-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CastButtonComponent {
  public isConnected$ = this.store.select((state) => state.casting.castState  === 'CONNECTED');

  constructor(private store: Store<AppState>) {}

  public requestCastSession() {
    const context = cast.framework.CastContext.getInstance();
    context.requestSession();
  }
}
