import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import UserForm from 'components/composition/my-account/user-form-layout'
import { createUser, updateUser, getUser, isUserCreated } from 'services/users'

class UserFormContext extends Component {
  render() {
    return (
      <UserForm {...this.props} />
    )
  }
}

UserFormContext.propTypes = {
  mode: PropTypes.oneOf(['edit', 'new']).isRequired,
  isUserCreated: PropTypes.bool,
  createUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      surname: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired
    }).isRequired,
    defaultFilters: PropTypes.shape({
      bu: PropTypes.string.isRequired,
      franchise: PropTypes.string.isRequired,
      product: PropTypes.string.isRequired,
      team: PropTypes.string.isRequired,
      region: PropTypes.string.isRequired,
      area: PropTypes.string.isRequired,
      territory: PropTypes.string.isRequired
    }).isRequired
  }),
  data: PropTypes.shape({
    teams: PropTypes.array.isRequired,
    regions: PropTypes.array.isRequired,
    areas: PropTypes.array.isRequired,
    territories: PropTypes.array.isRequired
  }).isRequired
}

function mapStateToProps(state, props) {
  const email = props.params.email
  return {
    mode: email ? 'edit' : 'new',
    isUserCreated: isUserCreated(state),
    initialValues: email ? getUser(state, email) : void 0
  }
}

const mapDispatchToProps = { createUser, updateUser }

UserFormContext = connect(mapStateToProps, mapDispatchToProps)(UserFormContext)

export default UserFormContext
