import React, { Component, PropTypes } from 'react'
import BarChartItem from 'components/presentation/charts/barchart-item'

class BarChart extends Component {
  render() {
    const { items } = this.props
    return (
      <div className='barchart'>
        {items.map((item, idx) => (<BarChartItem key={idx} {...item} />))}
      </div>
    )
  }
}

BarChart.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      percent: PropTypes.number.isRequired
    }).isRequired
  ).isRequired
}

export default BarChart
