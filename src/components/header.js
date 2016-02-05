import React, { PropTypes, Component } from 'react';
import { translate, Interpolate } from 'react-i18next/lib';
import { Link } from 'react-router';

class Header extends Component {
  onClick(e) {
    e.preventDefault();
    this.props.logout();
  }
  render() {
    const { title, username, t } = this.props;
    return (
      <div>
        <header>
          <h1>{t('appName')}:{title}</h1>
          {' '}
          <Interpolate parent='p' i18nKey='content.welcome' value={username} />
          <Link to='/'>{t('home')}</Link>
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
  logout: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
};

// All given namespaces will be loaded.
export default translate(['common', 'header'])(Header);
