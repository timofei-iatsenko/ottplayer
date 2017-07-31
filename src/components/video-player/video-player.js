import React, { Component } from 'react';
import PropTypes from 'prop-types';
import videojs from '../../libs/video.js';
import './video-player.scss';

export class VideoPlayer extends Component {
  static propTypes = {
    src: PropTypes.string,
  };

  componentDidMount() {
    const self = this;
    this.player = videojs(this.refs.video, {
      autoplay: true,
      fluid: true,
      controls: true,
    }).ready(function() {

      if (self.props.src) {
        this.src({
          src: self.props.src,
          type: "application/x-mpegURL"
        })
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.player && nextProps.src) {
      this.player.ready(function() {
        console.log(nextProps.src);
        this.src({
          src: nextProps.src,
          type: 'application/x-mpegURL',
        });
      });
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div data-vjs-player className="video-js">
        <video ref="video"></video>
      </div>
    );
  }
}
