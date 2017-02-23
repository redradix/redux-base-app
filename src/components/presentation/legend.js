import React, { Component, PropTypes } from 'react'
import ColorIndicator from 'components/presentation/color-indicator'

class Legend extends Component {
  render() {
    const { type, color, label, children } = this.props
    return (
      <div className={`${type}-legend-item`}>
        <ColorIndicator color={color} />
        <p className='value'>{children}</p>
        <p className='text'>{label}</p>
      </div>
    )
  }
}

Legend.propTypes = {
  type: PropTypes.string.isRequired,
  color: PropTypes.string,
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default Legend
