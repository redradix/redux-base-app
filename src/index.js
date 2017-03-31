import 'babel-polyfill'
import 'assets/stylesheets/ie.css'
import 'assets/stylesheets/styles.css'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { browserHistory, Router } from 'react-router'
import configureRoutes from 'core/configure-routes'
import configureStore from 'core/configure-store'
import 'core/i18n'
import 'core/numeral'
import 'mocks'
import Immutable from 'immutable'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)
const routes = configureRoutes(store)

if (process.env.NODE_ENV === 'development') {
  window.store = store
  window.Immutable = Immutable
}

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
)
