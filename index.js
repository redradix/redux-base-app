import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import { createHistory } from 'history'
import { syncReduxAndRouter, routeReducer } from 'redux-simple-router'
import App from './layouts/app'
import Home from './layouts/home'
import Ingredients from './containers/ingredients'
import ListIngredients from './layouts/list-ingredients'
import CreateIngredient from './layouts/create-ingredient'
import ShowIngredient from './layouts/show-ingredient'
import Orders from './layouts/orders'
import CreateOrder from './layouts/create-order'
import Dishes from './layouts/dishes'
import CreateDish from './layouts/create-dish'
//import {Home, Ingredients, Dishes, Orders } from './components'
import configureStore from './store/configureStore'


// Wraps with middleware the createStore function
const store = configureStore()
const history = createHistory()

syncReduxAndRouter(history, store)

render(
  // Makes the Redux store available to the connect() calls in the component hierarchy below
  <Provider store={store}>
    <Router history={history}>
      <Route path= "/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="ingredients" component={Ingredients}>
          <IndexRoute component={ListIngredients}/>
          <Route path="create" component={CreateIngredient}/>
          <Route path=":id/show" component={ShowIngredient}/>
          <Route path=":id/edit" component={CreateIngredient}/>
        </Route>  
        <Route path="dishes" component={Dishes}>
          <Route path="create"/>
        </Route>  
        <Route path="orders" component={Orders}>
          <Route path="create"/>
        </Route>  
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
