import React, { Component } from 'react'
import Logo from 'components/presentation/logo'

class HeaderMin extends Component {
  render() {
    return (
      <header className='global-header-min'>
        <div className='wrapper'>
          <Logo color />
        </div>
      </header>
    )
  }
}

export default HeaderMin
