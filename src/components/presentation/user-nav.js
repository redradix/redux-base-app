import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import Icon from 'components/presentation/icon'

class UserNav extends Component {
  render() {
    const { username, role } = this.props
    return (
      <nav className='user-nav has-submenu'>
        <Link to='/my-account' title=''>
          <Icon type='user' />
          <span className='username'>
            <span>{username}</span>
            <span className='role'>{role}</span>
          </span>
        </Link>
      </nav>
    )
  }
}

UserNav.propTypes = {
  username: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired
}

export default UserNav
