import { Actions, Effect } from '@ngrx/effects';
import { ofType } from 'ts-action-operators';
import { withLatestFrom, tap } from 'rxjs/internal/operators';
import { AppState } from '@store';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { PlayerService } from '../../player/player.service';
import { TogglePlayback } from '@store/reducers/player.reducer';

@Injectable()
export class PlayerEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private playerService: PlayerService,
  ) {}

  @Effect({ dispatch: false })
  public togglePlayback$ = this.actions$.pipe(
    ofType(TogglePlayback),
    withLatestFrom(
      this.store.select((store) => store.player),
    ),
    tap(([action, playerState]) => {
      playerState.paused ? this.playerService.play() : this.playerService.pause();
    }),
  );
}
