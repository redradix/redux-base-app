import React, { Component } from 'react'
import { t } from 'core/i18n'

class Footer extends Component {
  render() {
    return (
      <footer className='global-footer'>
        <div className='wrapper'>
          <img alt='Redradix base app' src='/images/redradix.png'/>
          <p className='note'>{t('footer.date')}</p>
        </div>
      </footer>
    )
  }
}

Footer.propTypes = {}

export default Footer
