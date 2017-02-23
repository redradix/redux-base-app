import React, { PropTypes } from 'react'

const Data = ({ label, value }) => (
  <p className='data'>
    <span className='value'>{value}</span>
    <span className='text'>{label}</span>
  </p>
)

Data.propTypes = {
  label: PropTypes.node.isRequired,
  value: PropTypes.node.isRequired
}

export default Data
