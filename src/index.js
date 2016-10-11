// Architecture file
import './main.css'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, createRoutes, browserHistory } from 'react-router'
import configureStore from './store/configureStore'
import { I18nextProvider } from 'react-i18next' // as we build ourself via webpack
import i18n from './utils/i18n'
import configureRoutes from './routes'

const store = configureStore()
const routes = createRoutes(configureRoutes(store))

render(
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <Router history={browserHistory} routes={routes} />
    </Provider>
  </I18nextProvider>,
  document.getElementById('root')
)
