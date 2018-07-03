import { Actions, Effect } from '@ngrx/effects';
import { ofType } from 'ts-action-operators';
import { RequestPlaylist, ReceivePlaylist } from '@store/actions/channels.actions';
import { switchMap, withLatestFrom, filter } from 'rxjs/internal/operators';
import { AppState } from '@store';
import { Store } from '@ngrx/store';
import { fetchPlaylist } from '../../api/playlist.api';
import { GetEpg } from '@store/actions/epg.actions';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class ChannelsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private route: ActivatedRoute,
  ) {}

  @Effect()
  public fetchPlaylist$ = this.actions$.pipe(
    ofType(RequestPlaylist),
    withLatestFrom(this.store.select((store) => store.settings.playlistUrl)),
    filter(([action, playlistUrl]) => !!playlistUrl),
    switchMap(([action, playlistUrl]) => fetchPlaylist(playlistUrl)),
    switchMap((playlist) => [
      new ReceivePlaylist({ playlist }),
      new GetEpg(),
    ]),
  );
}
