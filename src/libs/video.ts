import videojs from 'video.js';
import 'videojs-contrib-hls';

export default videojs;

declare module 'video.js' {
  interface PlayerOptions {
    fluid: boolean;
  }
}
