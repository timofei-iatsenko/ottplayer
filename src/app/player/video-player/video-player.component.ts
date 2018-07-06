import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  OnChanges,
  SimpleChanges,
  Input, AfterViewInit, OnDestroy,
} from '@angular/core';
import * as Hls from 'hls.js/dist/hls.light';
import { Store } from '@ngrx/store';
import { AppState } from '@store';
import { PlayerPlayingStateChanged, PlayerReady } from '@store/reducers/player.reducer';
import { PlayerService } from '../player.service';

@Component({
  selector: 'video-player',
  template: `
    <div class="video-wrapper">
      <video #video class="video" controls controlsList="nodownload noremoteplayback"></video>
    </div>
  `,
  styleUrls: ['./video-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoPlayerComponent implements OnChanges, AfterViewInit, OnDestroy {
  @ViewChild('video') public videoRef: ElementRef;
  @Input() public src: string;
  private hls: Hls;

  private get videoEl() { return this.videoRef.nativeElement as HTMLVideoElement; }

  constructor(
    private store: Store<AppState>,
    private playerSvc: PlayerService,
  ) {}

  public ngOnChanges(changes: SimpleChanges) {
    if (this.src) {
      this.updateSrc(this.src);
    } else {
      this.stopHls();
    }
  }

  public ngOnDestroy() {
    this.stopHls();
    this.store.dispatch(new PlayerReady({ready: false}));
  }

  public ngAfterViewInit() {
    this.playerSvc.registerPlayer(this.videoEl);
    this.store.dispatch(new PlayerReady({ready: true}));

    const stateChanged = () => this.store.dispatch(new PlayerPlayingStateChanged({paused: this.videoEl.paused}));

    this.videoEl.addEventListener('playing', stateChanged);
    this.videoEl.addEventListener('pause', stateChanged);
  }

  private stopHls() {
    if (this.hls) {
      this.hls.destroy();
    }
  }

  private startHls(src: string) {
    if (Hls.isSupported()) {
      this.hls = new Hls();
      this.hls.attachMedia(this.videoEl);

      this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
        this.videoEl.play();
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
