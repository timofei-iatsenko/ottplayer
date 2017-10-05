import React, { Component } from 'react';
import videojs from '../../libs/video';
import './video-player.scss';
import { Player } from 'video.js';

interface VideoPlayerProps {
  src: string;
}
export class VideoPlayer extends Component<VideoPlayerProps> {
  private player: any;

  public componentDidMount() {
    this.player = videojs(this.refs.video, {
      autoplay: true,
      fluid: true,
      controls: true,
    });

    if (this.props.src) {
      this.updateSrc(this.props.src);
    }
  }

  public componentWillReceiveProps(nextProps: VideoPlayerProps) {
    if (this.player && nextProps.src && (nextProps.src !== this.props.src)) {
      this.updateSrc(nextProps.src);
    }
  }

  private updateSrc(src: string) {
    this.player.ready(function(this: Player) {
      this.src({
        src,
        type: 'application/x-mpegURL',
      });
    });
  }

  public shouldComponentUpdate() {
    return false;
  }

  public render() {
    return (
      <div data-vjs-player className='video-js vjs-big-play-centered'>
        <video ref='video'></video>
      </div>
    );
  }
}
