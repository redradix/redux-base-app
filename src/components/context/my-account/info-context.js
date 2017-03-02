import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { getUser, getDefaultFilters, isPasswordChanged, setPassword } from 'services/session'
import Info from 'components/presentation/my-account/info'

export class InfoContext extends Component {
  render() {
    return (
      <Info {...this.props} />
    )
  }
}

InfoContext.defaultProps = {
  isPasswordChanged: false
}

InfoContext.propTypes = {
  setPassword: PropTypes.func.isRequired,
  isPasswordChanged: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired
}

function mapStateToProps(state) {
  const { name, surname, email, role } = getUser(state)
  const { team, region, area, territory } = getDefaultFilters(state)
  return {
    name, surname, email, role, team, region, area, territory,
    isPasswordChanged: isPasswordChanged(state)
  }
}

const mapDispatchToProps = { setPassword }

InfoContext = connect(mapStateToProps, mapDispatchToProps)(InfoContext)

export default InfoContext
