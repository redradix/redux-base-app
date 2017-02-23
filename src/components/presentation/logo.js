import React, { PropTypes } from 'react'
import { IndexLink } from 'react-router'

const Logo = ({ color }) => (
  <IndexLink to='/' className='global-logo'>
    <img alt='Redradix' src={color ? '/images/logoRedradix.svg' : '/images/logoRedradix.svg'} />
  </IndexLink>
)

Logo.defaultProps = {
  color: false
}

Logo.propTypes = {
  color: PropTypes.bool.isRequired
}

export default Logo
