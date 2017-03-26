import 'babel-polyfill'
import 'assets/stylesheets/ie.css'
import 'assets/stylesheets/styles.css'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { browserHistory, createRoutes, Router } from 'react-router'
import configureRoutes from 'configure-routes'
import 'core/i18n'
import 'core/numeral'
import configureStore from 'core/store/configure-store'
import 'mocks'
import Immutable from 'immutable'

const store = configureStore()
const routes = createRoutes(configureRoutes(store, browserHistory))

if (process.env.NODE_ENV === 'development') {
  window.store = store
  window.Immutable = Immutable
}

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('root')
)
