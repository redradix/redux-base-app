import React, { Component, PropTypes } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { connectRequest } from 'redux-query'
import UsersList from 'components/presentation/my-account/users-list'
import { isUserPageReady, getUserListPage, getCurrentPage, getTotalUsers, storeUsers, setPageNumber } from 'services/users'

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
  storeUsers: PropTypes.func.isRequired,
  setPageNumber: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalUsers: PropTypes.number.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
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
    isReady: isUserPageReady(state, currentPage)
  }
}

const mapDispatchToProps = { storeUsers, setPageNumber }

const mapPropsToQuery = (props) => ({
  url: `/api/user/list?page=${props.currentPage}`,
  queryKey: `user-list#${props.currentPage}`,
  transform: props.storeUsers,
  update: {} // Disregard redux-query update methods
})

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  connectRequest(mapPropsToQuery)
)

UsersListContext = enhance(UsersListContext)

export default UsersListContext
