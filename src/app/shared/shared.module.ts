import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { TimePipe } from './pipes/time.pipe';
import { DurationPipe } from './pipes/duration.pipe';
import { DatePipe } from './pipes/date.pipe';
import { TabsComponent } from './tabs/tabs.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TimePipe, DurationPipe, DatePipe, TabsComponent],
  exports: [TimePipe, DurationPipe, DatePipe, TabsComponent],
})
export class SharedModule {
}
