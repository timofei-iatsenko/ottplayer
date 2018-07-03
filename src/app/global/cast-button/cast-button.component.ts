import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@store';

@Component({
  selector: 'cast-button',
  template: `
    <button [class]="(isConnected$ | async) ? 'active' : 'default'"
            (click)="requestCastSession()"
            title='Cast to...'
            type='button'>
      {{(isConnected$ | async) ? 'connected icon' : 'cast icon'}}
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
