import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AppState } from '@store';
import { Store } from '@ngrx/store';
import { epgInAir, selectChannelEpg } from '@store/reducers/epg.reducer';
import { ToggleMainPanel } from '@store/actions/ui.actions';
import { EpgEntry } from '../../entities/epg-entry';
import { selectCurrentChannel, selectStreamUrl } from '@store/reducers/channels.reducer';
import { selectCastingEnabled } from '@store/reducers/casting.reducer';
import { map, distinctUntilChanged } from 'rxjs/internal/operators';

@Component({
  selector: 'player-area',
  templateUrl: './player-area.component.html',
  styleUrls: ['./player-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerAreaComponent  {
  public currentChannel$ = this.store.select(selectCurrentChannel);
  public isCastingEnabled$ = this.store.select(selectCastingEnabled);
  public streamUrl$ = this.store.select(selectStreamUrl);
  public epg$ = this.store.select((state) => selectChannelEpg(state, state.channels.selectedChannelId)).pipe(
    map((entries) => entries.find(epgInAir) || ({} as EpgEntry)),
    distinctUntilChanged(),
  );

  constructor(
    private store: Store<AppState>
  ) {}

  public goBack() {
    this.store.dispatch(new ToggleMainPanel({ visible: false }));
  }
}

