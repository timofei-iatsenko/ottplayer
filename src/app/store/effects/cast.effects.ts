import { Actions, Effect } from '@ngrx/effects';
import { ofType } from 'ts-action-operators';
import { withLatestFrom, filter, tap } from 'rxjs/operators';
import { AppState } from '@store';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { selectCurrentChannel, selectStreamUrl } from '@store/reducers/channels.reducer';
import { selectCastingEnabled } from '@store/reducers/casting.reducer';
import { CastService } from '../../casting/cast.service';
import { LaunchMedia } from '@store/reducers/player.reducer';

@Injectable()
export class CastEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private castService: CastService,
  ) {}

  @Effect({dispatch: false})
  public setMedia$ = this.actions$.pipe(
    ofType(LaunchMedia),
    withLatestFrom(
      this.store.select(selectCurrentChannel),
      this.store.select(selectCastingEnabled),
      this.store.select(selectStreamUrl),
      (action, channel, castingEnabled, streamUrl) => ({channel, castingEnabled, streamUrl})
    ),
    filter(({castingEnabled}) => castingEnabled),
    tap(({channel, streamUrl}) => {
      if (!!streamUrl) {
        this.castService.launchMedia(channel.name, streamUrl);
      } else if (this.castService.controller) {
        this.castService.controller.stop();
      }
    })
  );
}
