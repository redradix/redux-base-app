import React, { Component, PropTypes } from 'react'
import { compose } from 'redux'
import { deleteUser } from 'services/users'
import Button from 'components/presentation/button'
import clickable from 'components/interaction/clickable'
import confirmationTrigger from 'modules/confirm/components/confirmation-trigger'

class DeleteButton extends Component {
  render() {
    const { onClick } = this.props
    return (
      <Button className='soft-button highlight' icon='trash' onClick={onClick} />
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
