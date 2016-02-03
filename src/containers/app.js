import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import DevTools from '../containers/dev-tools'
import { logout } from '../modules/auth'
import Header from '../components/header'

function Loading() {
  return (
    <span>Loading...</span>
  )  
}

// Loading: Example of a general loading for the whole app. Not quite sure about it. Probably each app will have a different way to show the loading
function App({children, username, logout, notifications, isFetching}) {
  return (
    <div>
      {isFetching && <Loading/>}
      {!isFetching && <div>
        <Header title={"DAH"} username={username} logout={logout} notifications={notifications}>
        </Header>
        <div style={{marginTop: '1.5em'}}>{children}</div>
      </div>}
      <DevTools/>
    </div>
  )
}

App.propTypes = {
  children: PropTypes.element,
  username: PropTypes.string,
  notifications: PropTypes.array,
  logout: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const {ingredients: {isFetching: ingredientsAreFetching}, dishes: {isFetching: dishesAreFetching}, orders: {isFetching: ordersAreFetching}} = state
  //Loading: Here on isFetching  we group all the possible cases where we should show the loading screen
  return {
    isFetching: ingredientsAreFetching || dishesAreFetching || ordersAreFetching,
    username: state.auth.session.username,
    notifications: state.notifications
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logout }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
