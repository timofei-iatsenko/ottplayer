import React, { Component } from 'react';
import styles from './video-player.scss';
import * as Hls from 'hls.js/dist/hls.light';

interface VideoPlayerProps {
  src: string;
}
export class VideoPlayer extends Component<VideoPlayerProps> {
  private hls: Hls;

  public componentDidMount() {
    if (this.props.src) {
      this.startHls(this.props.src);
    }
  }

  private startHls(src: string) {
    if (Hls.isSupported()) {
      const video = this.refs.video as HTMLVideoElement;
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

  public componentWillReceiveProps(nextProps: VideoPlayerProps) {
    if (nextProps.src && (nextProps.src !== this.props.src)) {
      this.updateSrc(nextProps.src);
    }
  }

  private updateSrc(src: string) {
    if (this.hls) {
      this.hls.destroy();
    }

    this.startHls(src);
  }

  public shouldComponentUpdate() {
    return false;
  }

  public render() {
    return (
      <div className={styles.videoWrapper}>
        <video ref='video' className={styles.video}></video>
      </div>
    );
  }
}
