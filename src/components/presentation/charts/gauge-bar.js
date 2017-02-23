import React, { Component, PropTypes } from 'react'

class GaugeBar extends Component {
  render() {
    const { value } = this.props
    const style = { width: `${value}%` }
    return (
      <div className='gaugebar'>
        <div className='value-bar' style={style}/>
      </div>
    )
  }
}

GaugeBar.defaultProps = {
  value: 0
}

GaugeBar.propTypes = {
  value: PropTypes.number.isRequired
}

export default GaugeBar
