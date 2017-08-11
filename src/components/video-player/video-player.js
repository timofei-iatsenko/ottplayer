import React, { Component } from 'react';
import PropTypes from 'prop-types';
import videojs from '../../libs/video.js';
import './video-player.scss';

export class VideoPlayer extends Component {
  static propTypes = {
    src: PropTypes.string,
  };

  componentDidMount() {
    this.player = videojs(this.refs.video, {
      autoplay: true,
      fluid: true,
      controls: true,
    });

    if (this.props.src) {
      this.updateSrc(this.props.src);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.player && nextProps.src && (nextProps.src !== this.props.src)) {
      this.updateSrc(nextProps.src);
    }
  }

  updateSrc(src) {
    this.player.ready(function() {
      this.src({
        src: src,
        type: 'application/x-mpegURL',
      });
    });
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div data-vjs-player className="video-js vjs-big-play-centered">
        <video ref="video"></video>
      </div>
    );
  }
}
