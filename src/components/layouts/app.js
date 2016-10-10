import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { logout, getSession } from 'modules/auth'
import Header from 'views/header'

class App extends Component {
  componentDidMount() {
    this.props.getSession()
  }

  render() {
    const {children, username, logout} = this.props
    return (
      <div>
        <Header title={'miApp'} username={username} logout={logout} />
        <div style={{marginTop: '1.5em'}}>{children}</div>
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

const mapDispatchToProps = { logout, getSession }

export default connect(mapStateToProps, mapDispatchToProps)(App)
