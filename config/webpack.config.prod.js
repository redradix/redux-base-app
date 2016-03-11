const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseConfig = require('./webpack.config.base')

module.exports = Object.assign({

  /* source-map type */
  devtool: 'source-map',

  /* entry module config */
  entry: [
    './src/index' // entry module path
  ],

  /* plugins config */
  plugins: [

    /* define global variables which will be replaced by its values at build time */
    new webpack.DefinePlugin({
      __DEV__: false,
      'process.env': { NODE_ENV: '"production"' }
    }),

    /* eliminate duplicated modules */
    new webpack.optimize.DedupePlugin(),

    /* hoist most often used modules */
    new webpack.optimize.OccurenceOrderPlugin(),

    /* minify and optimize */
    new webpack.optimize.UglifyJsPlugin({
      compress: true,
      acorn: true // Acorn AST parser is little faster than a default one
    }),

    /* automate HTML file creation when using hashes in file names or any other dynamic output */
    new HtmlWebpackPlugin({
      template: 'templates/index.html',
      filename: '../main.html'
    })
  ]
}, baseConfig)
