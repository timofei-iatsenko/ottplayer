'use strict';

const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common');
const webpack = require('webpack');
const pathHelpers = require('./path-helpers');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const path = require('path');

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-source-map',
  entry: [
    require.resolve('react-dev-utils/webpackHotDevClient'),
    // We ship a few polyfills by default:
    require.resolve('./polyfills'),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: {
          formatter: 'stylish',
        },
      },
    ],
  },
  output: {
    devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new WatchMissingNodeModulesPlugin(pathHelpers.root('node_modules')),
  ],
  devServer: {
    stats: 'minimal',
    historyApiFallback: true,
    publicPath: '/',
    clientLogLevel: 'none',
    hot: true,
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        pathRewrite: {
          '^/api': '/'
        }
      }
    },
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
      ignored: /node_modules/
    }
  },
});
