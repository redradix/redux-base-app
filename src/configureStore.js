// Architecture file

/* DOC: Usually this file takes care of the addition of all middleware
 *
 * Middleware: A middleware is a higher-order function that composes a dispatch function to return a new dispatch function. It often turns async actions into actions.
 * Middleware is composable using function composition. It is useful for logging actions, performing side effects like routing, or turning an asynchronous API call into a series of synchronous actions.
 * http://rackt.org/redux/docs/api/applyMiddleware.html
 *
 * Store: A store is an object that holds the application’s state tree.
 * There should only be a single store in a Redux app, as the composition happens on the reducer level.
 *
 * dispatch(action) is the base dispatch function described above.
 * getState() returns the current state of the store.
 * subscribe(listener) registers a function to be called on state changes.
 * replaceReducer(nextReducer) can be used to implement hot reloading and code splitting. Most likely you won’t use it.
 *
 * Store creator: A store creator is a function that creates a Redux store. Like with dispatching function, we must distinguish the base store creator, createStore(reducer, initialState) exported from the Redux package, from store creators that are returned from the store enhancers.
 *
 * Store enhancer: A store enhancer is a higher-order function that composes a store creator to return a new, enhanced store creator. This is similar to middleware in that it allows you to alter the store interface in a composable way.
 * Store enhancers are much the same concept as higher-order components in React, which are also occasionally called “component enhancers”.
 * Because a store is not an instance, but rather a plain-object collection of functions, copies can be easily created and modified without mutating the original store. There is an example in compose documentation demonstrating that.
 * Most likely you’ll never write a store enhancer, but you may use the one provided by the developer tools. It is what makes time travel possible without the app being aware it is happening. Amusingly, the Redux middleware implementation is itself a store enhancer.
 *
 * Compose: Composes functions from right to left.
 * This is a functional programming utility, and is included in Redux as a convenience.
 * You might want to use it to apply several store enhancers in a row.
 *
 */
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from './modules/reducer'
import api from './middleware/api'
import DevTools from './containers/dev-tools'

const finalCreateStore = compose(
  // Middleware you want to use in development:
  applyMiddleware(thunk, api),
  // Required! Enable Redux DevTools with the monitors you chose
  DevTools.instrument()
)(createStore);

export default function configureStore(initialState) {
  const store = finalCreateStore(reducer, initialState)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./modules/reducer', () => {
      const nextReducer = require('./modules/reducer')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
