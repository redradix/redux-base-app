import React, { Component, PropTypes } from 'react'
import { Chart, Pies, Transform } from 'rumble-charts'
import DropShadow from 'components/presentation/charts/dropshadow'

const startAngle = -0.5 * Math.PI
const endAngle = 1.5 * Math.PI
const style = { filter: 'url(#dropshadow)' }

class ArcChart extends Component {
  render() {
    const { width, height, color, prevColor, bgColor, bgWidth, maxValue, value, prevValue} = this.props
    const series = [{ data: [maxValue] }, { data: [value] }, { data: [prevValue] }]
    return (
      <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
        <DropShadow />
        <Chart series={series} width={width} height={height} tag='g'>
          <Transform method={['stack']} seriesIndex={2}>
            <Pies innerRadius='33%' colors={[prevColor]} maxY={maxValue} pieWidth={12}
              startAngle={startAngle} endAngle={endAngle} />
          </Transform>
          <Transform method={['stack']} seriesIndex={0}>
            <Pies innerRadius='60%' colors={[bgColor]} maxY={maxValue} pieWidth={bgWidth}
              startAngle={startAngle} endAngle={endAngle} />
          </Transform>
          <Transform method={['stack']} seriesIndex={1}>
            <Pies innerRadius='60%' colors={[color]} maxY={maxValue} pieWidth={12}
              startAngle={startAngle} endAngle={endAngle} style={style}/>
          </Transform>
        </Chart>
      </svg>
    )
  }
}

ArcChart.defaultProps = {
  width: 175,
  height: 175,
  color: '#CDDC39',
  prevColor: '#00BCD4',
  bgColor: '#CFD8DC',
  bgWidth: 4,
  maxValue: 100,
  value: 0,
  prevValue: 0
}

ArcChart.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  prevColor: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
  bgWidth: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  prevValue: PropTypes.number.isRequired
}

export default ArcChart
