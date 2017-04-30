import React, { Component, PropTypes } from 'react'
import { compose } from 'redux'
import { deleteUser } from 'services/users'
import clickable from 'components/interaction/clickable'
import confirmationTrigger from 'modules/confirm/components/confirmation-trigger'

class DeleteButton extends Component {
  render() {
    const { onClick } = this.props
    return (
      <a className='soft-button highlight' onClick={onClick}>
        <span className='icon icon-trash' aria-hidden />
      </a>
    )
  }
}

DeleteButton.propTypes = {
  id: PropTypes.string.isRequired,
  onDeleteSuccess: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
}

const enhance = compose(
  confirmationTrigger(id => `deleteUser(${id})`, deleteUser),
  clickable({ params: ['id', 'onDeleteSuccess'] })
)

DeleteButton = enhance(DeleteButton)

export default DeleteButton
