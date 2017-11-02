'use strict';

const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common');

const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-source-map',
  output: {
    /**
     * Specifies the name of each output file on disk.
     * IMPORTANT: You must not specify an absolute path here!
     *
     * See: http://webpack.github.io/docs/configuration.html#output-filename
     */
    filename: '[name].[chunkhash:8].js',

    /**
     * The filename of non-entry chunks as relative path
     * inside the output.path directory.
     *
     * See: http://webpack.github.io/docs/configuration.html#output-chunkfilename
     */
    chunkFilename: '[name].[chunkhash:8].chunk.js',
  },
  plugins: [
    //new UglifyJsPlugin({
    //  sourceMap: true
    //}),
  ],
});
