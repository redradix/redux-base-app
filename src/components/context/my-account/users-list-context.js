import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import UsersList from 'components/presentation/my-account/users-list'
import { isUserListReady, getUserListPage, fetchUsers, getCurrentPage, getTotalUsers } from 'services/users'

class UsersListContext extends Component {
  render() {
    return (
      <UsersList {...this.props} />
    )
  }
}

UsersListContext.defaultProps = {
  isReady: false,
  currentPage: 0,
  totalUsers: 0
}

UsersListContext.propTypes = {
  isReady: PropTypes.bool,
  fetchUsers: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalUsers: PropTypes.number.isRequired,
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
  const currentPage = getCurrentPage(state)
  return {
    currentPage,
    totalUsers: getTotalUsers(state),
    users: getUserListPage(state, currentPage),
    isReady: isUserListReady(state)
  }
}

const mapDispatchToProps = { fetchUsers }

UsersListContext = connect(mapStateToProps, mapDispatchToProps)(UsersListContext)

export default UsersListContext
