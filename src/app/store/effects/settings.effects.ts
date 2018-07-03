import { Actions, Effect } from '@ngrx/effects';
import { ofType, toPayload } from 'ts-action-operators';
import { tap } from 'rxjs/internal/operators';
import { Injectable } from '@angular/core';
import { ChangeSettings } from '@store/actions/settings.actions';
import { settingsStorage } from '@store/reducers/settings.reducer';

@Injectable()
export class SettingsEffects {
  constructor(
    private actions$: Actions,
  ) {}

  @Effect({dispatch: false})
  public savePersistent$ = this.actions$.pipe(
    ofType(ChangeSettings),
    toPayload(),
    tap(({ settings }) => settingsStorage.set(settings))
  );
}
