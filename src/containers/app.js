import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import DevTools from './dev-tools'
import { logout } from '../modules/auth'
import Header from '../components/header'


class App extends Component {
  render() {
    const {children, username, logout} = this.props
    return (
      <div>
        <Header title={"miApp"} username={username} logout={logout}>
        </Header>
        <div style={{marginTop: '1.5em'}}>{children}</div>
        <DevTools/>
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.element,
  username: PropTypes.string,
  notifications: PropTypes.array,
  logout: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    username: state.auth.session.username
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logout }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

