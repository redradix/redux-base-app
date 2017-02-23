import React, { PropTypes } from 'react'

const Icon = ({ type }) => (
  <span className={`icon icon-${type}`} aria-hidden='true' />
)

Icon.propTypes = {
  type: PropTypes.string.isRequired
}

export default Icon
