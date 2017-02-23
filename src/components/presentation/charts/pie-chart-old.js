import React, { Component, PropTypes } from 'react'
import { Chart, Pies, Transform } from 'rumble-charts'
import DropShadow from 'components/presentation/charts/dropshadow'

const startAngle = -0.5 * Math.PI
const endAngle = 1.5 * Math.PI
const style = { filter: 'url(#dropshadow)' }

class PieChart extends Component {
  render() {
    const { width, height, series, colors } = this.props
    return (
      <svg viewBox={`-5 -5 ${width + 10} ${height + 10}`}
        width={width} height={height}>
        <DropShadow />
        <Chart width={width} height={height} series={series} tag='g'>
          <Transform method={['transpose', 'stack']}>
            <Pies combined pieWidth='20%' innerRadius='80%' colors={colors}
              startAngle={startAngle} endAngle={endAngle} style={style} />
          </Transform>
        </Chart>
      </svg>
    )
  }
}

PieChart.defaultProps = {
  width: 175,
  height: 175,
  colors: ['#3F51B5', '#FF9800', '#E91E63', '#CDDC39', '#00BCD4']
}

PieChart.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  colors: React.PropTypes.array,
  series: React.PropTypes.arrayOf(React.PropTypes.shape({
    data: PropTypes.array.isRequired
  })).isRequired
}

export default PieChart
