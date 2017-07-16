import videojs from 'video.js';

// If you're not using `webpack.ProvidePlugin` anyways, you can also shim `videojs` here direcly
//import 'imports-loader?global=>undefined!videojs-contrib-hls'; // eslint-disable-line import/no-webpack-loader-syntax
import 'videojs-contrib-hls';

export default videojs;
