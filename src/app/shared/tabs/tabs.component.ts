import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  ViewChild,
  ElementRef,
  AfterViewInit,
  EventEmitter,
  NgZone,
} from '@angular/core';

interface Item {
  name: string;
}

@Component({
  selector: 'tabs',
  template: `
    <div class="host">
      <div class="nav-btn"
           #leftBtn
           (click)="this.goLeft()">
        <i class="material-icons">keyboard_arrow_left</i>

      </div>
      <div class="tabs-wrap" #container>
        <button *ngFor="let item of items; trackBy: trackItems"
                type='button'
                class="group-tab"
                [class.selected]="isSelected(item)"
                (click)="select.emit(item)">
          {{item.name}}
        </button>
      </div>
      <div class="nav-btn"
           #rightBtn
           (click)="this.goRight()">
        <i class="material-icons">keyboard_arrow_right</i>
      </div>
    </div>
  `,
  styleUrls: ['./tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent implements AfterViewInit {
  @Input() public items: Item[];
  @Input() public selected: string;
  @Output() public select = new EventEmitter<Item>();

  @ViewChild('container') public _container: ElementRef;
  @ViewChild('leftBtn') public _leftBtn: ElementRef;
  @ViewChild('rightBtn') public _rightBtn: ElementRef;

  private get container(): HTMLElement { return this._container.nativeElement; }
  private get leftBtn(): HTMLElement { return this._leftBtn.nativeElement; }
  private get rightBtn(): HTMLElement { return this._rightBtn.nativeElement; }

  constructor(
    private ngZone: NgZone
  ) {}

  public ngAfterViewInit() {
    this.updateStyles();

    this.ngZone.runOutsideAngular(() => {
      this.container.addEventListener('scroll', () => this.updateStyles());
    });

    this.scrollToSelected();
  }

  private scrollToSelected() {
    const selected = this.container.querySelector('.selected');

    if (selected) {
      selected.scrollIntoView();
    }
  }

  public isSelected(item: Item): boolean {
    return this.selected === item.name;
  }

  public goLeft() {
    (this.container as HTMLElement).scrollLeft = this.container.scrollLeft - 60;
  }

  public goRight() {
    this.container.scrollLeft = this.container.scrollLeft + 60;
  }

  public trackItems(index: number, item: Item) {
    return item.name;
  }

  private updateStyles() {
    const el = this.container as HTMLElement;

    const leftEnabled = el.scrollLeft > 0;
    const rightEnabled = (el.scrollLeft + el.clientWidth) < el.scrollWidth;

    this.rightBtn.classList.toggle('enabled', rightEnabled);
    this.leftBtn.classList.toggle('enabled', leftEnabled);
  }
}
