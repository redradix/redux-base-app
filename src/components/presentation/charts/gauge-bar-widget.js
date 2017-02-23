import React, { Component, PropTypes } from 'react'
import GaugeBar from 'components/presentation/charts/gauge-bar'

class GaugeBarWidget extends Component {
  render() {
    const { title, percent, children } = this.props
    return (
      <div className='gaugebar-widget'>
        {title ? <p className='gaugebar-title'>{title}</p> : null}
        <div className='gaugebar-graph'>
          <GaugeBar value={percent} />
        </div>
        <div className='chart-legend'>
          {children}
        </div>
      </div>
    )
  }
}

GaugeBarWidget.propTypes = {
  title: PropTypes.string,
  percent: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired
}

export default GaugeBarWidget
