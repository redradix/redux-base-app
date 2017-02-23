import React, { Component, PropTypes } from 'react'
import GaugeBarWidget from 'components/presentation/charts/gauge-bar-widget'
import MildLegend from 'components/presentation/mild-legend'

class GaugeBarGroup extends Component {
  render() {
    const { gaugebars } = this.props
    return (
      <div className='gaugebar-group'>
        {gaugebars.map(({ legends, ...gaugebar }, index) => (
          <GaugeBarWidget key={index} {...gaugebar} >
            {legends.map((legend, i) => (
              <MildLegend key={i} {...legend} />
            ))}
          </GaugeBarWidget>
        ))}
      </div>
    )
  }
}

GaugeBarGroup.defaultProps = {
  gaugebars: []
}

GaugeBarGroup.propTypes = {
  gaugebars: PropTypes.array.isRequired
}

export default GaugeBarGroup
