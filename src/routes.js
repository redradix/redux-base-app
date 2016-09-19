import React from 'react'
import { Route } from 'react-router'

/* Route handlers/layouts */
import App from './components/layouts/app'
import Landing from './components/layouts/landing'
import Home from './components/views/home'
import Login from './components/connected/login'
import Register from './components/connected/register'

import { checkLogged, getSession } from './modules/auth'

export default (
  <Route>
    <Route component={Landing}>
      <Route path='/login' component={Login}/>
      <Route path='/register' component={Register}/>
    </Route>
    <Route component={App}>
      <Route  path='/' component={Home} />
    </Route>
  </Route>
)
