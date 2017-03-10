import React, { PropTypes } from 'react'
import { Route, IndexRoute } from 'react-router'
import App from 'components/context/app-context'
import Login from 'components/context/login/login-context'
import Dashboard from 'components/composition/dashboard'
import Account from 'components/context/my-account/account-context'
import Info from 'components/context/my-account/info-context'
import UsersList from 'components/context/my-account/users-list-context'
import UserForm from 'components/context/my-account/user-form-context'
import { loggedIn, fetchSession } from 'services/session'
import { fetchUsers } from 'services/users'
import {composeAsync} from 'core/utils'

const LOGGED_URL = ''
const NOT_LOGGED_URL = '/login'

function requireAuth(nextState, replace) {
  if (!loggedIn()) {
    replace({
      pathname: NOT_LOGGED_URL,
      state: { nextPathname: nextState.location.pathname }
    })
    // Need to throw exception to stop the possible chain
    throw Error('Not logged')
  }
}

function alreadyLogged(nextState, replace) {
  if (loggedIn()) {
    replace({
      pathname: LOGGED_URL,
      state: {nextPathname: nextState.location.pathname}
    })
    // Need to throw exception to stop the possible chain
    throw Error('Already logged')
  }
}

const configureRoutes = (store) => {
  function fetchInitialData(nextState) {
    return store.dispatch(fetchSession(nextState.params))
  }

  function fetchUsersHook() {
    return store.dispatch(fetchUsers())
  }

  return (
    <div>
      <Route path='/login' component={Login} onEnter={alreadyLogged} />
      <Route path='/' component={App} onEnter={composeAsync(requireAuth, fetchInitialData)}>
        <IndexRoute component={Dashboard} />
        <Route path='my-account' component={Account}>
          <IndexRoute component={Info} />
          <Route path='users' onEnter={fetchUsersHook}>
            <IndexRoute component={UsersList} />
            <Route path='new' component={UserForm} />
            <Route path='edit/:email' component={UserForm} />
          </Route>
        </Route>
      </Route>
    </div>
  )
}

configureRoutes.propTypes = {
  store: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired
  }).isRequired
}

export default configureRoutes
