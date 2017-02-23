import path from 'path'
import dotenv from 'dotenv'
import webpack from 'webpack'
import info from './package.json'

const resolvePath = p => path.join(__dirname, p)

const __DEV__ = process.env.NODE_ENV !== 'production'

const { parsed: env } = dotenv.load()
env.NODE_ENV = process.env.NODE_ENV
Object.keys(env).forEach(k => env[k] = JSON.stringify(env[k]))

const config = {
  name: info.name,

  entry: {
    app: 'src/index',
    vendor: Object.keys(info.dependencies)
  },

  output: {
    path: resolvePath('public'),
    filename: '/js/[name].js',
    publicPath: '/',
    debug: __DEV__,
    pathinfo: __DEV__
  },

  module: {
    preLoaders: [{
      // NOTE: Run linter before transpiling
      test: /\.js$/,
      loader: 'eslint-loader',
      exclude: /node_modules/
    }],
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/
    }, {
      // TODO: Remove after upgrading to webpack 2
      test: /\.json$/,
      loader: 'json'
    }]
  },

  resolve: {
    alias: {
      src: resolvePath('src'),
      core: resolvePath('src/core'),
      components: resolvePath('src/components'),
      modules: resolvePath('src/modules'),
      services: resolvePath('src/services'),
      resources: resolvePath('src/resources'),
      locales: resolvePath('src/locales')
    },
    // NOTE: Empty string to properly resolve when providing extension
    // TODO: Remove after upgrading to webpack 2
    extensions: ['', '.js']
  },

  plugins: [
    // NOTE: `NoErrorsPlugin` causes eslint warnings to stop the build process
    // new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin('commons', '/js/commons.js'),
    new webpack.DefinePlugin({ process: { env } })
    // new webpack.NormalModuleReplacementPlugin( /^fetch-mock$/, path.resolve( __dirname, 'node_modules', 'fetch-mock/src/client.js' ) )
  ],

  eslint: {
    configFile: resolvePath('.eslintrc')
  }
}

if (__DEV__) {
  config.devtool = 'source-map'

  config.devServer = {
    contentBase: 'public',
    // NOTE: Options `inline` and `hot` shall be passed as CLI arguments
    // inline: true,
    // hot: true,
    historyApiFallback: true
  }
} else {
  config.plugins.push(...[
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: true,
      acorn: true
    })
  ])
}

export default config
