import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { Channel, ReadonlyChannelsCollection } from '../../entities/channel.model';
import { AppState } from '@store';
import { Store } from '@ngrx/store';
import { NavigateToChannel } from '@store/actions/channels.actions';

@Component({
  selector: 'channels-list',
  template: `
    <button
      type="button"
      *ngFor="let channel of channels; trackBy: trackChannel"
      (click)="handleChannelClick(channel)"
      [class.hidden]="!isVisible(channel)"
      [class.active]="isActive(channel)"
      class="item"
    >
      <div class="item-wrapper">
        <div class="icon">
          <img [src]="channel.logo" alt=''/>
        </div>
        <channel-details [channel]="channel"></channel-details>
      </div>
    </button>
  `,
  styleUrls: ['./channels-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChannelsListComponent implements AfterViewInit {
  @Input() public channels: ReadonlyChannelsCollection;
  @Input() public selectedChannelId: number;
  @Input() public visibleIds: number[];

  constructor(
    private store: Store<AppState>,
    private elementRef: ElementRef,
  ) {}

  public ngAfterViewInit() {
    this.scrollToActiveChannel();
  }

  public trackChannel(index: number, item: Channel) {
    return item.id;
  }

  public isActive(chanel: Channel): boolean {
    return chanel.id === this.selectedChannelId;
  }

  public isVisible(chanel: Channel): boolean {
    return this.visibleIds.includes(chanel.id);
  }


  public handleChannelClick(channel: Channel) {
    this.store.dispatch(new NavigateToChannel({ channel }));
  }

  private scrollToActiveChannel() {
    const activeElement = (this.elementRef.nativeElement as HTMLElement).querySelector('.active');

    if (activeElement) {
      activeElement.scrollIntoView();
    }
  }
}
