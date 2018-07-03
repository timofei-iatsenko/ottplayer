import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Channel, ReadonlyChannelsCollection } from '../../entities/channel.model';
import { Router } from '@angular/router';
import { AppState } from '../../store';
import { Store } from '@ngrx/store';
import { ToggleMainPanel } from '@store/actions/ui.actions';

@Component({
  selector: 'channels-list',
  template: `
    <!--<Scrollbars autoHide ref={(ref) => this.scroll = ref}>-->
    <div>
      <button
        type="button"
        *ngFor="let channel of channels; trackBy: trackChannel"
        (click)="handleChannelClick(channel)"
        [class]="getStyles(channel)"
      >
        <div class="item-wrapper">
          <div class="icon">
            <img [src]="channel.logo" alt=''/>
          </div>
          <channel-details [channel]="channel"></channel-details>
        </div>
      </button>
    </div>
    <!--</Scrollbars>-->
  `,
  styleUrls: ['./channels-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChannelsListComponent {
  @Input() public channels: ReadonlyChannelsCollection;
  @Input() public selectedChannelId: number;
  @Input() public visibleIds: number[];

  constructor(
    private router: Router,
    private store: Store<AppState>,
  ) {}

  public trackChannel(index: number, item: Channel) {
    return item.id;
  }

  private isActive(chanel: Channel): boolean {
    return chanel.id === this.selectedChannelId;
  }

  private isVisible(chanel: Channel): boolean {
    return this.visibleIds.includes(chanel.id);
  }

  private getChannelSlug(channel: Channel) {
    return channel.id;
  }

  public handleChannelClick(channel: Channel) {
    this.router.navigate(['/' + this.getChannelSlug(channel)]);
    this.store.dispatch(new ToggleMainPanel({visible: true}));
  }
  //private isInitiallyScrolled = false;
  //
  //private scrollToActiveChannel() {
  //  if (!this.isInitiallyScrolled && this.scroll && this.activeElementRef) {
  //    this.isInitiallyScrolled = true;
  //
  //    const values = this.scroll.getValues();
  //
  //    const topPoint = values.scrollTop;
  //    const bottomPoint = values.clientHeight + values.scrollTop;
  //    const elementTop = this.activeElementRef.offsetTop;
  //
  //    if (topPoint < elementTop && bottomPoint < elementTop) {
  //      this.scroll.scrollTop(elementTop);
  //    }
  //  }
  //}

  //public componentDidMount() {
  //  this.scrollToActiveChannel();
  //}
  //
  //public componentDidUpdate() {
  //  this.scrollToActiveChannel();
  //}

  // todo: rewrite in angular style
  public getStyles(channel: Channel): string {
    if (!this.isVisible(channel)) {
      return 'hidden-item';
    }
    return this.isActive(channel) ? 'item-active' : 'item';
  }
}
