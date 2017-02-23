import React, { PropTypes } from 'react'

const ConfirmationMessage = (props) => {
  return (
    <div className='confirmation-message'>
      <p>{props.text}</p>
    </div>
  )
}

ConfirmationMessage.propTypes = {
  text: PropTypes.string.isRequired
}

export default ConfirmationMessage
