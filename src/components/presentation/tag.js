import React, { PropTypes } from 'react'
import Icon from 'components/presentation/icon'

const Tag = ({ filter, label, onClose }) => {
  function handleClose() {
    onClose(filter, label)
  }
  return (
    <div className='tag'>
      <a className='text'>{label}</a>
      {onClose ? (
        <div className='close' onClick={handleClose}>
          <Icon type='close' />
        </div>
      ) : null}
    </div>
  )
}

Tag.propTypes = {
  label: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  filter: PropTypes.string.isRequired
}

export default Tag
