import React, { Component, PropTypes } from 'react'
import { n } from 'core/numeral'

class RelativeBar extends Component {
  render() {
    const { width, label, value } = this.props
    const style = { width: `${width * 100}%` }
    return (
      <div className='relative-bar-item' style={style}>
        <p className='relative-bar-data'>
          <span className='legend'>{label}</span>
          <span className='value'>{n(value)}</span>
        </p>
        <div className='relative-bar'/>
      </div>
    )
  }
}


RelativeBar.defaultProps = {
  width: 0,
  label: '',
  value: 0
}

RelativeBar.propTypes = {
  width: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
}

export default RelativeBar
