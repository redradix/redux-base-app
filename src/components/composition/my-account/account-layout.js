import React, { PropTypes, Component } from 'react'
import Header from 'components/presentation/my-account/header'
import Tabs from 'components/presentation/my-account/tabs'

class AccountLayout extends Component {
  render() {
    const { logout, name, surname, role, children } = this.props
    return (
      <main className='main'>
        <Header username={`${name} ${surname}`} role={role} logout={logout} />
        {role === 'admin' ? <Tabs /> : null}
        {children}
      </main>
    )
  }
}

AccountLayout.propTypes = {
  children: PropTypes.element,
  logout: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired
}

export default AccountLayout
