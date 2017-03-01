import React, { Component } from 'react'
import { t } from 'core/i18n'
import logo from 'assets/images/redradix.png'

class Footer extends Component {
  render() {
    return (
      <footer className='global-footer'>
        <div className='wrapper'>
          <img alt='Redradix base app' src={logo}/>
          <p className='note'>{t('footer.date')}</p>
        </div>
      </footer>
    )
  }
}

Footer.propTypes = {}

export default Footer
