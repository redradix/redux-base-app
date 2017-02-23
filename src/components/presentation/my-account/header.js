import React, { Component, PropTypes } from 'react'
import Button from 'components/presentation/button'
import { t } from 'core/i18n'

class Header extends Component {
  render() {
    const { username, role, logout } = this.props
    return (
      <div className='header-info has-border'>
        <div className='wrapper'>
          <div className='info-main'>
            <h1 className='alpha semibold'>{username}</h1>
            <p className='info-complementary upper'>{role}</p>
          </div>
          <div className='info-date'>
            <Button className='mild-button' icon='logout' onClick={logout}>
              {t('my-account.labels.logout')}
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired
}

export default Header
