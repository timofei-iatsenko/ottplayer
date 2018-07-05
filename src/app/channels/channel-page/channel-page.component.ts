import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@store';
import { RequestPlaylist, SetChannelSlug } from '@store/actions/channels.actions';
import { StopEpgSync } from '@store/actions/epg.actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'channel-page',
  template: `
    <div class="channels-page-wrap" [ngClass]="appClasses$ | async">
      <channels-panel></channels-panel>
      <player-area></player-area>
      <!--<PlayerControlBar />-->
    </div>
  `,
  styleUrls: ['./channel-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChannelPageComponent implements OnInit, OnDestroy {
  public appClasses$ = this.store.select((store) => store.ui.classes);

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
  ) {}

  public ngOnInit() {
    this.store.dispatch(new RequestPlaylist());

    this.route.params.subscribe((params) => {
      this.store.dispatch(new SetChannelSlug({slug: params['channelSlug']}));
    });
  }

  public ngOnDestroy() {
    this.store.dispatch(new StopEpgSync());
  }
}
