const path = require('path')

const basePath = process.cwd()

function resolvePath(relPath) {
  return path.join(basePath, relPath)
}

module.exports = {
  name: 'redux-base-app', // project name

  /* output config */
  output: {
    path: path.join(__dirname, '../public/js'), // output directory
    filename: 'bundle.[hash:6].js', // output file name with hash pattern
    publicPath: '/js/', // path to output file from browser's perspective
    hash: true // enable hash
  },
  module: {
    /* module loaders config */
    loaders: [
      {
        test: /\.js$/, // include files which filename is matching the pattern
        loaders: [ 'babel' ], // exclude files which path is matching the pattern
        exclude: /node_modules/ // list of module loaders
      },
      {
        test: /\.css$/, // Only .css files
        loader: 'style!css' // Run both loaders
      }
    ]
  },

  /* modules resolving config */
  resolve: {
    alias: {
      layouts: resolvePath('src/components/layouts'),
      connected: resolvePath('src/components/connected'),
      controllers: resolvePath('src/components/controllers'),
      views: resolvePath('src/components/views'),
      modules: resolvePath('src/modules')
    },
    modulesDirectories: ['node_modules'], // look for modules in listed directories only
    extensions: ['', '.js'] // resolve modules with listed extensions only
  },

  /* module loaders resolving config */
  resolveLoader: {
    modulesDirectories: ['node_modules'], // look for loader modules in listed directories only
    moduleTemplates: ['*-loader', '*'], // loader module name alternatives, 'babel' -> 'babel-loader'
    extensions: ['', '.js'] // resolve loader modules with listed extensions only
  },

  /* file system watching config */
  watchOptions: {
    aggregateTimeout: 100 // do not re-build for 100ms after the last build, default is 300ms
  }
}
