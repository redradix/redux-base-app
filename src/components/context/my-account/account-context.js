import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { logout, getUser } from 'services/session'
import AccountLayout from 'components/composition/my-account/account-layout'

export class AccountContext extends Component {
  constructor(props) {
    super(props)
    this.handleLogout = this.handleLogout.bind(this)
  }
  handleLogout() {
    return this.props.logout()
  }
  render() {
    return (
      <AccountLayout {...this.props} />
    )
  }
}

AccountContext.propTypes = {
  logout: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired
}

function mapStateToProps(state) {
  const { name, surname, role } = getUser(state)
  return { name, surname, role }
}

const mapDispatchToProps = { logout }

AccountContext = connect(mapStateToProps, mapDispatchToProps)(AccountContext)

export default AccountContext
