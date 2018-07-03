import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { TimePipe } from './pipes/time.pipe';
import { DurationPipe } from './pipes/duration.pipe';
import { DatePipe } from './pipes/date.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TimePipe, DurationPipe, DatePipe],
  exports: [TimePipe, DurationPipe, DatePipe],
})
export class SharedModule {
}
