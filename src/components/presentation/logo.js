import React from 'react'
import { IndexLink } from 'react-router'
import logo from 'assets/images/redradix.png'

const style = { height: '35px' }

const Logo = () => (
  <IndexLink to='/' className='global-logo'>
    <img alt='Redradix' src={logo} style={style} />
  </IndexLink>
)

Logo.defaultProps = {}

Logo.propTypes = {}

export default Logo
