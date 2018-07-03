import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChannelsPanelComponent } from './channels-panel/channels-panel.component';
import { ChannelsListComponent } from './channels-list/channels-list.component';
import { ChannelDetailsComponent } from './channel-details/channel-details.component';
import { SharedModule } from '../shared/shared.module';
import { ChannelPageComponent } from './channel-page/channel-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {path: '', component: ChannelPageComponent}
    ])
  ],
  declarations: [
    ChannelsPanelComponent,
    ChannelsListComponent,
    ChannelDetailsComponent,
    ChannelPageComponent,
  ],
})
export class ChannelsModule {}
