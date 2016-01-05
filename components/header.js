import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import Notifications from './notifications'

class Header extends Component {
  onClick(e) {
    e.preventDefault()
    this.props.logout()
  }
  render() {
    const {title, username, modalIsOpen, notifications} = this.props  
    return (
      <div>
        <header>
          <h1>{title}</h1>
          {' '}
          <p>Welcome {username}</p>
          <Link to="/">Home</Link>
          {' '}
          <Link to="/ingredients">Ingredients</Link>
          {' '}
          <Link to="/dishes">Dishes</Link>
          {' '}
          <Link to="/orders">Orders</Link>
          {' '}
          <Notifications notifications={notifications}/>
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
  notifications: PropTypes.array,
  logout: PropTypes.func.isRequired
}

export default Header
