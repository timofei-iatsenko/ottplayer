import { Actions, Effect } from '@ngrx/effects';
import { ofType, toPayload } from 'ts-action-operators';
import {
  RequestPlaylist,
  ReceivePlaylist,
  SetActiveGroup,
  NavigateToChannel,
} from '@store/actions/channels.actions';
import { switchMap, withLatestFrom, filter, tap, map } from 'rxjs/internal/operators';
import { AppState } from '@store';
import { Store } from '@ngrx/store';
import { fetchPlaylist } from '../../api/playlist.api';
import { GetEpg } from '@store/actions/epg.actions';
import { Injectable } from '@angular/core';
import { savedGroupStorage } from '@store/reducers/channels.reducer';
import { Router } from '@angular/router';
import { Channel } from '../../entities/channel.model';
import { selectCastingEnabled } from '@store/reducers/casting.reducer';
import { ToggleMainPanel } from '@store/actions/ui.actions';

@Injectable()
export class ChannelsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private router: Router,
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

  @Effect({dispatch: false})
  public saveGroupPersistent$ = this.actions$.pipe(
    ofType(SetActiveGroup),
    toPayload(),
    tap(({ name }) => savedGroupStorage.set(name)),
  );

  @Effect()
  public navigate$ = this.actions$.pipe(
    ofType(NavigateToChannel),
    toPayload(),
    tap(({ channel }) => this.router.navigate(['/' + this.getChannelSlug(channel)])),
    withLatestFrom(this.store.select(selectCastingEnabled)),
    filter(([, castingEnabled]) => !castingEnabled),
    map(() => new ToggleMainPanel({ visible: true }))
  );


  private getChannelSlug(channel: Channel) {
    return channel.id;
  }
}
