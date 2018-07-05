import { Actions, Effect } from '@ngrx/effects';
import { ofType } from 'ts-action-operators';
import { SetChannelSlug } from '@store/actions/channels.actions';
import { withLatestFrom, filter, tap } from 'rxjs/internal/operators';
import { AppState } from '@store';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { selectCurrentChannel, selectStreamUrl } from '@store/reducers/channels.reducer';
import { selectCastingEnabled } from '@store/reducers/casting.reducer';
import { CastService } from '../../casting/cast.service';

@Injectable()
export class CastEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private castService: CastService,
  ) {}

  @Effect({dispatch: false})
  public setMedia$ = this.actions$.pipe(
    ofType(SetChannelSlug),
    withLatestFrom(
      this.store.select(selectCurrentChannel),
      this.store.select(selectCastingEnabled),
      this.store.select(selectStreamUrl),
      (action, channel, castingEnabled, streamUrl) => ({channel, castingEnabled, streamUrl})
    ),
    filter(({castingEnabled, streamUrl}) => castingEnabled && !!streamUrl),
    tap(({channel, streamUrl}) => this.castService.launchMedia(channel.name, streamUrl))
  );
}
