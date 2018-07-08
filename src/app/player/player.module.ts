import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalPlayerComponent } from './local-player/local-player.component';
import { CastPlaceholderComponent } from './cast-placeholder/cast-placeholder.component';
import { VideoPlayerComponent } from './video-player/video-player.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LocalPlayerComponent,
    CastPlaceholderComponent,
    VideoPlayerComponent,
  ],
  exports: [
    LocalPlayerComponent,
    CastPlaceholderComponent,
    VideoPlayerComponent,
  ]
})
export class PlayerModule { }
