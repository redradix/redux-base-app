import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import UsersList from 'components/presentation/my-account/users-list'
// import { isUserListReady, getUserListPage, fetchUsers, getCurrentPage, getTotalUsers } from 'services/users'
import { isUserListReady, getUserListPage, getCurrentPage, getTotalUsers, setPageNumber } from 'services/users'

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
  // fetchUsers: PropTypes.func.isRequired,
  setPageNumber: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired, // HACK!
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

UsersListContext.contextTypes = {
  store: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  const currentPage = getCurrentPage(state)
  // console.log('MAP STATE')
  // console.log(currentPage)
  return {
    currentPage,
    totalUsers: getTotalUsers(state),
    users: getUserListPage(state, currentPage),
    isReady: isUserListReady(state)
  }
}

// NOTE: Bind action creators without losing dispatch
import { bindActionCreators } from 'redux'
const mapDispatchToProps = (dispatch) => ({
  setPageNumber: bindActionCreators(setPageNumber, dispatch),
  dispatch
})

// const mapDispatchToProps = { setPageNumber }
// const mapDispatchToProps = { fetchUsers }

// UsersListContext = connect(mapStateToProps, mapDispatchToProps)(UsersListContext)
// UsersListContext = connect(mapStateToProps)(UsersListContext)

import { compose } from 'redux'
import { connectRequest } from 'redux-query'
import { usersQuery } from 'services/users'
const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  connectRequest(usersQuery)
)

UsersListContext = enhance(UsersListContext)

export default UsersListContext
