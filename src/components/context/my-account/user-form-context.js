import React, {Component, PropTypes} from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { connectRequest } from 'redux-query'
import UserForm from 'components/composition/my-account/user-form-layout'
import { storeUser, createUser, updateUser, getUser, isUserCreated } from 'services/users'

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
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired
  })
}

function mapStateToProps(state, props) {
  const id = props.params.userId
  return {
    id,
    mode: id ? 'edit' : 'new',
    isUserCreated: isUserCreated(state),
    initialValues: id ? getUser(state, id) : void 0
  }
}

const mapDispatchToProps = { storeUser, createUser, updateUser }

const mapPropsToQuery = function(props) {
  if (props.initialValues) return
  return {
    url: `/api/users/${props.id}`,
    transform: props.storeUser,
    update: {} // Disregard redux-query update methods
  }
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  connectRequest(mapPropsToQuery)
)

UserFormContext = enhance(UserFormContext)

export default UserFormContext
