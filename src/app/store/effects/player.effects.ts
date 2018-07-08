import { Actions, Effect } from '@ngrx/effects';
import { ofType } from 'ts-action-operators';
import { withLatestFrom, tap } from 'rxjs/internal/operators';
import { AppState } from '@store';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { PlayerService } from '../../player/player.service';
import { TogglePlayback } from '@store/reducers/player.reducer';
import { CastService } from '../../casting/cast.service';
import { selectCastingEnabled } from '@store/reducers/casting.reducer';

@Injectable()
export class PlayerEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private playerService: PlayerService,
    private castService: CastService,
  ) {}

  @Effect({ dispatch: false })
  public togglePlayback$ = this.actions$.pipe(
    ofType(TogglePlayback),
    withLatestFrom(
      this.store.select((store) => store.player),
      this.store.select(selectCastingEnabled)
    ),
    tap(([action, playerState, isCasting]) => {
      if (!isCasting) {
        playerState.paused ? this.playerService.play() : this.playerService.pause();
      } else {
        this.castService.controller.playOrPause();
      }
    }),
  );
}
