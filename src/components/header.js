import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'

class Header extends Component {
  onClick(e) {
    e.preventDefault()
    this.props.logout()
  }
  render() {
    const {title, username } = this.props  
    return (
      <div>
        <header>
          <h1>{title}</h1>
          {' '}
          <p>Welcome {username}</p>
          <Link to="/">Home</Link>
          {' '}
          <a href onClick={this.onClick.bind(this)}>Logout</a>
        </header>
      </div>
    );  
  }
}

Header.propTypes = {
  title: PropTypes.string, 
  username: PropTypes.string,
  logout: PropTypes.func.isRequired
}

export default Header
