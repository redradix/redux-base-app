import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import DevTools from '../containers/DevTools'
import { logout } from '../actions/auth'

class Header extends Component {
  onClick(e) {
    e.preventDefault()
    this.props.logout()
  }
  render() {
    const {title, username} = this.props  
    return (
      <div>
        <header>
          <h1>{title}</h1>
          {' '}
          <p>Bienvenido {username}</p>
          <Link to="/">Home</Link>
          {' '}
          <Link to="/ingredients">Ingredients</Link>
          {' '}
          <Link to="/dishes">Dishes</Link>
          {' '}
          <Link to="/orders">Orders</Link>
          {' '}
          <a href onClick={this.onClick.bind(this)}>Logout</a>
        </header>
      </div>
    );  
  }
}

Header.propTypes = {
  title: PropTypes.string  
}

function App({children, username, logout}) {
  return (
    <div>
      <Header title={"DAH"} username={username} logout={logout}>
      </Header>
      <div style={{marginTop: '1.5em'}}>{children}</div>
      <DevTools/>
    </div>
  )
}

App.propTypes = {
  children: PropTypes.element,
  username: PropTypes.string,
  logout: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return state.auth.session
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logout }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

