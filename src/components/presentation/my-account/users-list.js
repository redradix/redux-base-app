import React, { Component, PropTypes } from 'react'
import Heading from 'components/presentation/heading'
import Loading from 'components/presentation/loading'
import UsersListItem from 'components/presentation/my-account/users-list-item'
import { t } from 'core/i18n'

function sortUsers(a, b) {
  const aFullName = (`${a.user.name} ${a.user.surname}`).toLowerCase()
  const bFullName = (`${b.user.name} ${b.user.surname}`).toLowerCase()
  if (aFullName > bFullName) return 1
  if (bFullName > aFullName) return  -1
  return 0
}

class UsersList extends Component {
  renderUsersList() {
    const { users, onDelete } = this.props
    return (
      <div className='users-list'>
        <div className='user-list-header'>
          <Heading type='gamma'>{t('my-account.users.title')}</Heading>
          <a href='/my-account/users/new' className='button button-secondary button-large'>
            {t('my-account.users.new.title')}
          </a>
        </div>
        {users.sort(sortUsers).map(({ user }) => (
          <UsersListItem key={user.email} {...user} onDelete={onDelete} />
        ))}
      </div>
    )
  }
  render() {
    const { isReady } = this.props
    return (
      <div className='account-contents wrapper'>
        {isReady ? this.renderUsersList() : <Loading />}
      </div>
    )
  }
}

UsersList.propTypes = {
  isReady: PropTypes.bool,
  onDelete: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.shape({
        email: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        surname: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired
      }).isRequired
    })
  ).isRequired
}

export default UsersList
