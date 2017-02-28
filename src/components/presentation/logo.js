import React, { PropTypes } from 'react'
import { IndexLink } from 'react-router'
import logo from 'assets/images/redradix.png'

const Logo = ({ color }) => (
  <IndexLink to='/' className='global-logo'>
    <img alt='Redradix' src={color ? logo : logo} />
  </IndexLink>
)

Logo.defaultProps = {
  color: false
}

Logo.propTypes = {
  color: PropTypes.bool.isRequired
}

export default Logo
