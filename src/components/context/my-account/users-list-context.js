import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import UsersList from 'components/presentation/my-account/users-list'
import { isUserListReady, getUserList, deleteUser } from 'services/users'

class UsersListContext extends Component {
  render() {
    return (
      <UsersList {...this.props} />
    )
  }
}

UsersListContext.propTypes = {
  isReady: PropTypes.bool,
  onDelete: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      email: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      surname: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired
    })
  ).isRequired
}

const mapStateToProps = (state) => {
  return {
    users: getUserList(state),
    isReady: isUserListReady(state)
  }
}

const mapDispatchToProps = { onDelete: deleteUser }

UsersListContext = connect(mapStateToProps, mapDispatchToProps)(UsersListContext)

export default UsersListContext
