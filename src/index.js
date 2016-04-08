// Architecture file
import './main.css'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, createRoutes, browserHistory } from 'react-router'
import configureStore from './store/configureStore'
import { I18nextProvider } from 'react-i18next' // as we build ourself via webpack
import i18n from './utils/i18n'
import rawRoutes from './routes'

// Wraps with middleware the createStore function
const store = configureStore()
/* DOC: History: history is a JavaScript library that lets you easily manage session history in browsers, testing environments, and (soon, via React Native) native devices. history abstracts away the differences in these different platforms and provides a minimal API that lets you manage the history stack, navigate, confirm navigation, and persist state between sessions. history is library-agnostic and may easily be included in any JavaScript project.
 */

/* DOC: ReduxSimpleRouter: Redux is awesome. React Router is cool. The problem is that react-router manages an important piece of your application state: the URL. If you are using redux, you want your app state to fully represent your UI if you snapshotted the app state, you should be able to load it up later and see the same thing.
 * react-router does a great job of mapping the current URL to a component tree, and continually does so with any URL changes. This is very useful, but we really want to store this state in redux as well.
 * The entire state that we are interested in boils down to one thing: the URL. This is an extremely simple library that just puts the URL in redux state and keeps it in sync with any react-router changes. Additionally, you can change the URL via redux and react-router will change accordingly.
 */

/*
 * DOC: Call this with a react-router and a redux store instance to install hooks that always keep both of them in sync. When one changes, so will the other.
 */

// Hack to have the dispatcher available on the router
// Warning: The order of the arguments have been change from default
function mixDispatch(routes) {
  return routes && routes.map(route => ({
    ...route,
    childRoutes: mixDispatch(route.childRoutes),
    onEnter: route.onEnter && ((props, replaceState, cb) => {
      route.onEnter(store.dispatch, cb, props, replaceState)
      return cb()
    })
  }))
}

const routes = mixDispatch(createRoutes(rawRoutes))


// DOC: Provider: Makes the Redux store available to the connect() calls in the component hierarchy below
render(
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <Router history={browserHistory} routes={routes} />
    </Provider>
  </I18nextProvider>,
  document.getElementById('root')
)
