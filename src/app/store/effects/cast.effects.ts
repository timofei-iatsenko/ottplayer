import { Actions, Effect } from '@ngrx/effects';
import { ofType } from 'ts-action-operators';
import { SetChannelSlug } from '@store/actions/channels.actions';
import { withLatestFrom, filter, tap } from 'rxjs/internal/operators';
import { AppState } from '@store';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { selectCurrentChannel, selectStreamUrl } from '@store/reducers/channels.reducer';
import { Channel } from '../../entities/channel.model';
import { selectCastingEnabled } from '@store/reducers/casting.reducer';

@Injectable()
export class CastEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
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
    tap(({channel, streamUrl}) => this.setMediaToCast(channel, streamUrl))
  );

   private setMediaToCast(channel: Channel, streamUrl: string) {
    const media: any = chrome.cast.media;
    const castSession = cast.framework.CastContext.getInstance().getCurrentSession();

    const mediaInfo = new media.MediaInfo(streamUrl, 'application/x-mpegURL');
    const request = new media.LoadRequest(mediaInfo);

    mediaInfo.metadata = new media.GenericMediaMetadata();
    mediaInfo.metadata.title = channel.name;

    castSession.loadMedia(request);
   }
}
