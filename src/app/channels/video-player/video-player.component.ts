import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  OnChanges,
  SimpleChanges,
  Input,
} from '@angular/core';
import * as Hls from 'hls.js/dist/hls.light';

@Component({
  selector: 'video-player',
  template: `
    <div class="video-wrapper">
      <video #video class="video"></video>
    </div>
  `,
  styleUrls: ['./video-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoPlayerComponent implements OnChanges {
  @ViewChild('video') public videoRef: ElementRef;
  @Input() public src: string;
  private hls: Hls;

  public ngOnChanges(changes: SimpleChanges) {
    if (this.src) {
      this.updateSrc(this.src);
    }
  }

  private startHls(src: string) {
    if (Hls.isSupported()) {
      const video = this.videoRef.nativeElement as HTMLVideoElement;
      this.hls = new Hls();
      this.hls.attachMedia(video);

      this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });

      this.hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              // try to recover network error
              this.hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              this.hls.recoverMediaError();
              break;
            default:
              // cannot recover
              this.hls.destroy();
              break;
          }
        }
      });

      this.hls.loadSource(src);
    }
  }

  private updateSrc(src: string) {
    if (this.hls) {
      this.hls.destroy();
    }

    this.startHls(src);
  }
}
