import React from 'react'
import { Route, IndexRoute } from 'react-router'

/* Route handlers/layouts */
import App from './containers/app'
import Home from './layouts/home'
import Ingredients from './layouts/ingredients'
import ListIngredients from './layouts/list-ingredients'
import CreateIngredient from './layouts/create-ingredient'
import ShowIngredient from './layouts/show-ingredient'
import Orders from './layouts/orders'
import CreateOrder from './layouts/create-order'
import ListOrders from './layouts/list-orders'
import ShowOrder from './layouts/show-order'
import Dishes from './layouts/dishes'
import CreateDish from './layouts/create-dish'
import ListDishes from './layouts/list-dishes'
import ShowDish from './layouts/show-dish'
import Login from './layouts/login'
import Register from './layouts/register'

import { checkLogged, requireAuth } from './actions/auth'

export default (
  <Route>
    <Route onEnter={(dispatch, cb) => dispatch(checkLogged(cb))}>
      <Route path="/login" component={Login}/>
      <Route path="/register" component={Register}/>
    </Route>
    <Route component={App} onEnter={(dispatch, cb) => dispatch(requireAuth(cb))}>
      <Route  path= "/" component={Home} />
      <Route path="ingredients" component={Ingredients}>
        <IndexRoute component={ListIngredients}/>
        <Route path="create" component={CreateIngredient}/>
        <Route path=":id/show" component={ShowIngredient}/>
        <Route path=":id/edit" component={CreateIngredient}/>
      </Route>  
      <Route path="dishes" component={Dishes}>
        <IndexRoute component={ListDishes}/>
        <Route path="create" component={CreateDish}/>
        <Route path=":id/edit" component={CreateDish}/>
        <Route path=":id/show" component={ShowDish}/>
      </Route>  
      <Route path="orders" component={Orders}>
        <IndexRoute component={ListOrders}/>
        <Route path="create" component={CreateOrder}/>
        <Route path=":id/edit" component={CreateOrder}/>
        <Route path=":id/show" component={ShowOrder}/>
      </Route>  
    </Route>
  </Route>
)
