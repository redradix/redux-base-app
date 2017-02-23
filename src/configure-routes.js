import React, { PropTypes } from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import App from 'components/context/app-context'
import Login from 'components/context/login/login-context'
import Dashboard from 'components/composition/dashboard'
import MyAccount from 'components/context/my-account/account-context'
import AccountInfo from 'components/context/my-account/info-context'
import UsersList from 'components/context/my-account/users-list-context'
import UserForm from 'components/context/my-account/user-form-context'
import { loggedIn, fetchSession } from 'services/session'
import { fetchUsers } from 'services/users'
import { convertFromUrlParamToHumanReadable } from 'core/utils'

const configureRoutes = (store) => {
  function requireAuth(nextState, replace) {
    if (!loggedIn()) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      })
    }
  }

  function alreadyLogged(nextState, replace) {
    if (loggedIn()) {
      replace({
        pathname: '',
        state: {nextPathname: nextState.location.pathname}
      })
    }
  }

  function fetchInitialData({params}) {
    const urlFilters = convertFromUrlParamToHumanReadable(params)
    return store.dispatch(fetchSession(urlFilters))
    .then(() => App)
  }

  return (
    <Router history={history}>
      <Route path='/login' component={Login} onEnter={alreadyLogged} />
      <Route path='/' getComponent={fetchInitialData} onEnter={requireAuth}>
        <IndexRoute component={Dashboard} />
        <Route path='my-account' component={MyAccount}>
          <IndexRoute component={AccountInfo} />
          <Route path='users' onEnter={() => store.dispatch(fetchUsers())}>
            <IndexRoute component={UsersList} />
            <Route path='new' component={UserForm} />
            <Route path='edit/:email' component={UserForm} />
          </Route>
        </Route>
        <Route path='(:bu)(/:franchise)(/:product)' component={Dashboard} />
      </Route>
    </Router>
  )
}

configureRoutes.propTypes = {
  store: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired
  }).isRequired
}

export default configureRoutes
