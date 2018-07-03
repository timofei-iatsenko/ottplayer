import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@store';
import { Group } from '@store/reducers/channels.reducer';
import { SetActiveGroup } from '@store/actions/channels.actions';

@Component({
  selector: 'channels-panel',
  template: `
    <div class="panel-wrap">
      <div class="header">
        <h3 class="header-title">Channels</h3>
      </div>
      <div class="body">
        <!--<tabs-component *ngIf="channels.length"-->
        <!--[items]="this.props.groups"-->
        <!--(onSelect)="handleSelectGroup($event)"-->
        <!--[selected]="selectedGroup.name"/>-->
        <div class="list">
          <channels-list
            [channels]="channels$ | async"
            [selectedChannelId]="selectedChannelId$ | async"
            [visibleIds]="visibleChannels$ | async"
          ></channels-list>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./channels-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChannelsPanelComponent {
  public channels$ = this.store.select((state) => state.channels.channels);
  public selectedChannelId$ = this.store.select((state) => state.channels.selectedChannelId);
  public visibleChannels$ = this.store.select(
    (state) =>
      state.channels.groups.find((group) => group.name === state.channels.selectedGroup).channels,
  );

  constructor(
    private store: Store<AppState>,
  ) {}

  public handleSelectGroup(group: Group) {
    this.store.dispatch(new SetActiveGroup({ name: group.name }));
  }
}
