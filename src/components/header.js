import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import Notifications from './notifications'
import { translate, Interpolate } from 'react-i18next/lib'

class Header extends Component {
  onClick(e) {
    e.preventDefault()
    this.props.logout()
  }
  render() {
    const {title, username, modalIsOpen, notifications, t} = this.props
    return (
      <div>
        <header>
          <h1>{t('appName')}:{title}</h1>
          {' '}
          <Interpolate parent='p' i18nKey='content.welcome' value={username} />
          <Link to="/">{t('home')}</Link>
          {' '}
          <Link to="/ingredients">{t('ingredients')}</Link>
          {' '}
          <Link to="/dishes">{t('dishes')}</Link>
          {' '}
          <Link to="/orders">{t('orders')}</Link>
          {' '}
          <Notifications notifications={t("notifications")}/>
          {' '}
          <a href onClick={this.onClick.bind(this)}>{t('logout')}</a>
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

export default translate(['header', 'common'])(Header);
