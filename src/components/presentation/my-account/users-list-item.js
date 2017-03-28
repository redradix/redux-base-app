import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import cx from 'classnames'
import { needsConfirmation } from 'modules/confirm'
import Heading from 'components/presentation/heading'
import DeleteButton from 'components/presentation/delete-button'
import Button from 'components/presentation/button'
import Popup from 'components/presentation/popup'
import { t } from 'core/i18n'

// NOTE: This component should not be connected. We connect'ed it because we
// must add a css class whenever the confirmation popup is shown
class UsersListItem extends Component {
  handleEdit = () => {
    const { user: { email } } = this.props
    browserHistory.push(`/my-account/users/edit/${encodeURIComponent(email)}`)
  }
  render() {
    const { user: { id, name, surname, role }, hasPopup } = this.props
    const className = cx('action-item', { 'has-popup': hasPopup })
    return (
      <div className='user-list-item'>
        <Heading type='epsilon'>{`${name} ${surname}`}</Heading>
        <p className='role'>{role}</p>
        <div className='actions'>
          <div className='action-item'>
            <Button className='soft-button highlight' icon='settings' onClick={this.handleEdit} />
          </div>
          <div className={className}>
            <Popup actionName={`deleteUser(${id})`} icon='trash'
              title={t('my-account.users.delete.title')}
              message={t('my-account.users.delete.message')} />
            <DeleteButton className='soft-button highlight' icon='trash' id={id} />
          </div>
        </div>
      </div>
    )
  }
}

UsersListItem.defaultProps = {
  hasPopup: false
}

UsersListItem.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired
  }).isRequired,
  hasPopup: PropTypes.bool.isRequired
}

const mapStateToProps = (state, { user: { id } }) => {
  return {
    hasPopup: needsConfirmation(state, `deleteUser(${id})`)
  }
}

UsersListItem = connect(mapStateToProps)(UsersListItem)

export default UsersListItem
