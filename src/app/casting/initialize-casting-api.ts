import { CastStateChanged, SessionStateChanged } from '@store/reducers/casting.reducer';

export function initializeCastApi(store: any) {
  (window as any).__onGCastApiAvailable = (isAvailable: boolean) => {
    if (!isAvailable) {
      return;
    }

    const context = cast.framework.CastContext.getInstance();

    context.setOptions({
      receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
      autoJoinPolicy: (chrome.cast as any).AutoJoinPolicy.ORIGIN_SCOPED,
    });

    context.addEventListener(
      cast.framework.CastContextEventType.CAST_STATE_CHANGED,
      (event) => store.dispatch(new CastStateChanged({state: event.castState})),
    );
    context.addEventListener(
      cast.framework.CastContextEventType.SESSION_STATE_CHANGED,
      (event) => store.dispatch(new SessionStateChanged({state: event.sessionState})),
    );
  };
}
