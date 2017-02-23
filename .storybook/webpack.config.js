'use strict';
const path = require('path')
const dotenv = require('dotenv')
const webpack = require('webpack')

const resolvePath = p => path.join(process.cwd(), p)

const env = dotenv.load('../.env').parsed
env.NODE_ENV = process.env.NODE_ENV
Object.keys(env).forEach(k => env[k] = JSON.stringify(env[k]))

module.exports = {
  resolve: {
    alias: {
      src: resolvePath('src'),
      core: resolvePath('src/core'),
      components: resolvePath('src/components'),
      modules: resolvePath('src/modules'),
      services: resolvePath('src/services'),
      locales: resolvePath('src/locales')
    },
    // NOTE: Empty string to properly resolve when providing extension
    // TODO: Remove after upgrading to webpack 2
    extensions: ['', '.js']
  },
  plugins: [
    new webpack.DefinePlugin({ process: { env } })
  ]
};
