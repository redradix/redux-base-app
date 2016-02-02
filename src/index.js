import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import {browserHistory} from 'react-router'
import { Router, createRoutes } from 'react-router'
import configureStore from './configureStore'
import { I18nextProvider } from 'react-i18next/lib'
import i18n from './utils/i18n'
import rawRoutes from './routes';

// Wraps with middleware the createStore function
const store = configureStore()

// Hack to have the dispatcher available on the router
// Warning: The order of the arguments have been change from default
function mixDispatch(routes) {
  return routes && routes.map(route => ({
    ...route,
    childRoutes: mixDispatch(route.childRoutes),
    onEnter: route.onEnter && function (props, replaceState, cb) {
      route.onEnter(store.dispatch, cb, props, replaceState)
      return cb()
    }
  }));
}

const routes = mixDispatch(createRoutes(rawRoutes));


// DOC: Provider: Makes the Redux store available to the connect() calls in the component hierarchy below
render(
  <I18nextProvider i18n={ i18n }>
    <Provider store={store}>
      <Router history={browserHistory} routes={routes}>
      </Router>
    </Provider>
  </I18nextProvider>,
  document.getElementById('root')
)
