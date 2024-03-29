const
  path = require('path'),
  _ = require('lodash'),
  base = require('./webpack.base.babel'),
  paths = require('../paths');

import { webpack as config } from '../config';


const babelLoaders = ['babel?loose&stage=0'];

if (config.reactHot) {
  babelLoaders.unshift('react-hot');
}


module.exports = _.extend({}, base, {

  entry: {
    popup: [
      'webpack-dev-server/client',
      path.resolve(paths.SRC, 'popup/index.js'),
      path.resolve(paths.SRC, 'background/background.js')
    ]
  },

  output: {
    path: paths.DEV,
    publicPath: paths.PUBLIC_PATH || '',
    filename: '/[name]/[name].bundle.js',
    chunkFilename: '/[name]/[name]-[id].chunk.js'
  },

  debug: true,

  devtool: config.devTool || 'source-map',

  devServer: {
    contentBase: paths.DEV,
    hot: true,
    inline: true,
    port: config.port || 3000
  },

  module: _.extend({}, base.module, {
    loaders: base.module.loaders.concat([
      // babel transpiler
      {
        test: /\.jsx?$/, // test for both js and jsx
        loaders: babelLoaders,
        exclude: [/node_modules/, paths.ASSETS],
        include: [paths.SRC, paths.TEST]
      },
      {
        test: /\.css?$/,
        loaders: ['style-loader', 'css-loader']
      },
      // SASS loaders
      {
        test: /\.scss$/,
        exclude: paths.THEME_VARIABLES,
        loaders: ['style-loader', 'css-loader', 'sass-loader?sourceMap']
      }
    ])
  })
});
