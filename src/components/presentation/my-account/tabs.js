import React, { Component } from 'react'
import { Link, IndexLink } from 'react-router'
import { t } from 'core/i18n'

class Tabs extends Component {
  render() {
    return (
      <div className='profile-menu'>
        <div className='wrapper'>
          <div className='menu-item'>
            <IndexLink to='/my-account' activeClassName='is-current'>
              {t('my-account.title')}
            </IndexLink>
          </div>
          <div className='menu-item'>
            <Link to='/my-account/users' activeClassName='is-current'>
              {t('my-account.users.title')}
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Tabs
