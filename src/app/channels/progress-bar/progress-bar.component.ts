import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { timer } from 'rxjs/index';
import { map, distinctUntilChanged } from 'rxjs/internal/operators';

@Component({
  selector: 'progress-bar',
  template: `
    <div class="host">
      <div class="bar">
        <div class="inner" [style.width]="(value$ | async) + '%'">
      </div>
    </div>
    </div>
  `,
  styleUrls: ['./progress-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarComponent {
  @Input() public startTime: number;
  @Input() public endTime: number;

  public value$ = timer(0, 500).pipe(
    map(() => this.calculateProgress(this.startTime, this.endTime)),
    distinctUntilChanged(),
  );

  private calculateProgress(startTime: number, endTime: number) {
    const duration = endTime - startTime;
    const passed = Math.floor(Date.now() / 1000) - startTime;
    const value = Math.round((passed / duration) * 100);
    return value > 100 ? 100 : value;
  }
}
