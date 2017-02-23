import React, { Component, PropTypes } from 'react'

class InfoField extends Component {
  render() {
    const { label, value } = this.props
    return (
      <div className='gi one-half'>
        <div className='data-item'>
          <p className='label'>{label}</p>
          <p className='data-text'>{value}</p>
        </div>
      </div>
    )
  }
}

InfoField.defaultProps = {
  value: '-'
}

InfoField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string
}

export default InfoField
