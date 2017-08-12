import videojs from 'video.js';

// If you're not using `webpack.ProvidePlugin` anyways, you can also shim `videojs` here direcly
import 'videojs-contrib-hls';

export default videojs;
