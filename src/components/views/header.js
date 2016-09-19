import React, { PropTypes, Component } from 'react'
import { translate } from 'react-i18next'
import { Link } from 'react-router'

export class Header extends Component {
  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(e) {
    e.preventDefault()
    this.props.logout()
  }
  render() {
    const { title, username, t } = this.props
    return (
      <header>
        <h1>{t('appName')}:{title}</h1>
        {' '}
        <p>{t('content.welcome', {value: username})}</p>
        <Link to="/">{t('home')}</Link>
        {' '}
        <a href onClick={this.handleClick}>{t('logout')}</a>
      </header>
    )
  }
}

Header.propTypes = {
  title: PropTypes.string,
  username: PropTypes.string,
  logout: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
}

export default translate(['common', 'header'])(Header)
