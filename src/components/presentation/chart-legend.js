import React, { Component, PropTypes } from 'react'
import Legend from 'components/presentation/legend'

class ChartLegend extends Component {
  render() {
    const { legends, type, colors } = this.props
    return (
      <div className='chart-legend'>
        {legends.map((legend, index) => (
          <Legend key={index} type={type} color={colors[index]} {...legend} />
        ))}
      </div>
    )
  }
}

ChartLegend.propTypes = {
  legends: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      color: PropTypes.string,
      label: PropTypes.string.isRequired,
      children: PropTypes.node.isRequired
    }).isRequired
  ).isRequired,
  type: PropTypes.string,
  colors: PropTypes.arrayOf(PropTypes.string)
}

export default ChartLegend
