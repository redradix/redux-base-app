import React, { Component, PropTypes } from 'react'
import { n, p } from 'core/numeral'

class BarChartItem extends Component {
  render() {
    const { label, value, ratio, percent } = this.props
    const style = { width: `${ratio * 100}%` }
    return (
      <div className='barchart-item'>
        <p className='barchart-label'>{label}</p>
        <p className='barchart-value'>{n(value)}</p>
        <p className='barchart-percent'>{p(percent)}</p>
        <div className='barchart-graph'>
          <div className='barchart-bar' style={style} />
        </div>
      </div>
    )
  }
}

BarChartItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
  percent: PropTypes.number.isRequired
}

export default BarChartItem
