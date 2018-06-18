'use strict';


const path = require('path');
const paths = require('./path-helpers');
const env = require('./env-config');
/**
 * Webpack Plugins
 */
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');
const webpack = require('webpack');

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = {
  /**
   * The entry point for the bundle
   * Our Angular.js app
   *
   * See: http://webpack.github.io/docs/configuration.html#entry
   */
  entry: [
    './src/index.tsx'
  ],

  output: {
    path: paths.root(env.destination),
    filename: '[name].bundle.js',
    sourceMapFilename: '[file].map',
    chunkFilename: '[name].chunk.js',
    publicPath: '',
  },

  resolve: {
    extensions: ['.js', '.tsx', '.ts', '.json'],
    /**
     * An array of directory names to be resolved to the current directory
     */
    modules: [paths.root('src'), paths.root('node_modules')],
    alias: {
      'videojs-contrib-hls': path.resolve(__dirname, '../node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.js'),
    },
  },

  /**
   * Options affecting the normal modules.
   *
   * See: http://webpack.github.io/docs/configuration.html#module
   */
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'awesome-typescript-loader',
          },
        ],
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[name]__[local]--[hash:base64:5]',
                importLoaders: 1,
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: paths.relative('postcss.config.js'),
                },
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        }),
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
        exclude: [paths.root('public/index.html')],
      },
      /**
       * File loader for supporting images, for example, in CSS files.
       */
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: './assets/',
            publicPath: env.base,
          },
        },
      },

      /* File loader for supporting fonts in CSS files.
       */
      {
        test: /woff2?$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: './assets/fonts/',
            publicPath: env.base,
          },
        },
      },
    ],

  },

  /**
   * Add additional plugins to the compiler.
   *
   * See: http://webpack.github.io/docs/configuration.html#plugins
   */
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new CheckerPlugin(),

    /**
     * Put Vendors in separate bundle
     */
    new CommonsChunkPlugin({
      name: 'vendors',
      minChunks: function (module) {
        return module.context && module.context.indexOf('node_modules') !== -1;
      },
    }),

    new ExtractTextPlugin({
      filename: env.IS_DEV ? 'css/[name].css' : 'css/[contenthash].css',
      allChunks: true,
      disable: env.IS_DEV,
    }),
    /**
     * Private section Entry HTML
     */
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      minify: env.IS_DEV ? false : {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),

    new webpack.ProvidePlugin({
      'videojs': 'video.js',
      'window.videojs': 'video.js',
    }),
  ],
};
