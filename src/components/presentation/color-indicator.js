import React, { PropTypes } from 'react'

const ColorIndicator = ({ color }) => (
  <span className='color-indicator' style={{ backgroundColor: color }} />
)

ColorIndicator.propTypes = {
  color: PropTypes.string
}

export default ColorIndicator
