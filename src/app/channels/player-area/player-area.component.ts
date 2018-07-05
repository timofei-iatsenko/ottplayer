import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AppState } from '@store';
import { Store } from '@ngrx/store';
import { ToggleMainPanel } from '@store/actions/ui.actions';
import { selectCurrentChannel, selectStreamUrl } from '@store/reducers/channels.reducer';
import { selectCastingEnabled } from '@store/reducers/casting.reducer';
import { EpgStreamsFactory } from '../epg-streams.service';

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

  public epgStreams = this.epgStreamsFactory.create(this.store.select((state) => state.channels.selectedChannelId));

  constructor(
    private store: Store<AppState>,
    private epgStreamsFactory: EpgStreamsFactory,
  ) {}

  public goBack() {
    this.store.dispatch(new ToggleMainPanel({ visible: false }));
  }
}

