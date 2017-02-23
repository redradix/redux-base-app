import React, { Component, PropTypes } from 'react'

class MildIndicator extends Component {
  render() {
    const { label, children } = this.props
    let className
    if (typeof children !== 'string' && typeof children !== 'number') {
      className = 'data'
    }
    return (
      <p className='mild-indicator'>
        <span className='text'>{label}</span>
        <span className={className}>{children}</span>
      </p>
    )
  }
}

MildIndicator.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node
}

export default MildIndicator
