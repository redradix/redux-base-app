const path = require('path')
const express = require('express')
const app = express()
const port = 3000

if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const config = require('../config/webpack.config.dev')

  const compiler = webpack(config)
  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  }))
  app.use(webpackHotMiddleware(compiler))
}


app.use(express.static('public'))

// keep this handler on the last position of the stack, it serves the index.html if reloading from any url.
if (process.env.NODE_ENV === 'development') {
  require('isomorphic-fetch')
  app.get('*', (req, res) => {
    fetch('http://localhost:' + port + '/js/index.html')
      .then((r) => r.text())
      .then((html) => res.send(html))
      .catch((err) => console.error(err.stack))
  })
} else {
  app.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname, '../public/main.html'))
  })
}


app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port)
  }
})
