import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { browserHistory, createRoutes, Router } from 'react-router'
import configureStore from 'core/store/configure-store'
import 'core/i18n'
import 'core/numeral'
import configureRoutes from 'src/configure-routes'
import 'src/mocks'

const store = configureStore()
const routes = createRoutes(configureRoutes(store, browserHistory))

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('root')
)
