import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import cx from 'classnames'
import Heading from 'components/presentation/heading'
import Button from 'components/presentation/button'
import Popup from 'components/presentation/popup'
import { t } from 'core/i18n'

class UsersListItem extends Component {
  constructor(props) {
    super(props)
    this.handleTogglePopup = this.handleTogglePopup.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.state = { popup: false }
  }
  handleTogglePopup() {
    const { popup } = this.state
    this.setState({ popup: !popup })
  }
  handleDelete() {
    const { user: { id }, onDelete } = this.props
    onDelete(id)
    .then(this.handleTogglePopup)
  }
  handleEdit = () => {
    const { user: { email } } = this.props
    browserHistory.push(`/my-account/users/edit/${encodeURIComponent(email)}`)
  }
  renderPopup() {
    return (
      <Popup icon='trash' title={t('my-account.users.delete.title')}
        message={t('my-account.users.delete.message')}
        onConfirm={this.handleDelete} onCancel={this.handleTogglePopup} />
    )
  }
  render() {
    const { user: { id, name, surname, role } } = this.props
    const { popup } = this.state
    const className = cx('action-item', { 'has-popup': popup })
    return (
      <div className='user-list-item'>
        <Heading type='epsilon'>{`${name} ${surname}`}</Heading>
        <p className='role'>{role}</p>
        <div className='actions'>
          <div className='action-item'>
            <Button className='soft-button highlight' icon='settings' onClick={this.handleEdit} />
          </div>
          <div className={className}>
            {popup ? this.renderPopup() : null}
            <Button className='soft-button highlight' icon='trash' onClick={this.handleTogglePopup} />
          </div>
        </div>
      </div>
    )
  }
}

UsersListItem.propTypes = {
  onDelete: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired
  }).isRequired
}

export default UsersListItem
