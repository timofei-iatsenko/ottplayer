import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AppState } from '@store';
import { Store } from '@ngrx/store';
import { epgInAir } from '@store/reducers/epg.reducer';
import { ToggleMainPanel } from '@store/actions/ui.actions';
import { selectCurrentChannel, selectStreamUrl } from '@store/reducers/channels.reducer';
import { selectCastingEnabled } from '@store/reducers/casting.reducer';
import { map, distinctUntilChanged, switchMap, shareReplay } from 'rxjs/operators';
import { timer, combineLatest } from 'rxjs';
import { OttDataBase } from '../../db';

@Component({
  selector: 'player-area',
  templateUrl: './player-area.component.html',
  styleUrls: ['./player-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerAreaComponent {
  public currentChannel$ = this.store.select(selectCurrentChannel);
  public isCastingEnabled$ = this.store.select(selectCastingEnabled);
  public streamUrl$ = this.store.select(selectStreamUrl);

  public epg$ = combineLatest(
      this.store.select((state) => state.epg.lastUpdate),
      this.store.select((state) => state.channels.selectedChannelId),
    ).pipe(
      switchMap(([, chId]) => this.db.queryChannelEpg(chId)),
      shareReplay(1),
    );

  public currentEpg$ = timer(0, 1000 * 5).pipe(
    switchMap(() => this.epg$),
    map((epg) => epg.find(epgInAir)),
    distinctUntilChanged(),
    shareReplay(),
  );

  constructor(
    private store: Store<AppState>,
    private db: OttDataBase,
  ) {}

  public goBack() {
    this.store.dispatch(new ToggleMainPanel({ visible: false }));
  }
}

