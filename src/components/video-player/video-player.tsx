import React, { Component } from 'react';
import './video-player.scss';
import * as Hls from 'hls.js/dist/hls.light';

interface VideoPlayerProps {
  src: string;
}
export class VideoPlayer extends Component<VideoPlayerProps> {
  private hls: Hls;

  public componentDidMount() {
    if (Hls.isSupported()) {
      const video = this.refs.video as HTMLVideoElement;
      this.hls = new Hls();
      this.hls.attachMedia(video);
    }

    if (this.props.src) {
      this.updateSrc(this.props.src);
    }

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
  }

  public componentWillReceiveProps(nextProps: VideoPlayerProps) {
    if (this.hls && nextProps.src && (nextProps.src !== this.props.src)) {
      this.updateSrc(nextProps.src);
    }
  }

  private updateSrc(src: string) {
    this.hls.loadSource(src);
  }

  public shouldComponentUpdate() {
    return false;
  }

  public render() {
    return (
      <video ref='video' controls autoPlay></video>
    );
  }
}
