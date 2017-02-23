import React, { Component, PropTypes } from 'react'
import Logo from 'components/presentation/logo'
import UserNav from 'components/presentation/user-nav'
import { t } from 'core/i18n'

class Header extends Component {
  render() {
    const { username, role } = this.props
    return (
      <header className='global-header'>
        <Logo />
        <p className='global-title'>{t('app.title')}</p>
        <UserNav username={username} role={role} />
      </header>
    )
  }
}

Header.propTypes = {
  username: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired
}

export default Header
