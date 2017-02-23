import React, { Component, PropTypes } from 'react'
import Indicator from 'components/presentation/indicator'

class IndicatorsList extends Component {
  render() {
    const { indicators, type } = this.props
    return (
      <div className='indicators-list'>
        {indicators.map((indicator, index) => (
          <Indicator key={index} type={type} {...indicator} />
        ))}
      </div>
    )
  }
}

IndicatorsList.propTypes = {
  indicators: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      label: PropTypes.string.isRequired,
      children: PropTypes.node
    }).isRequired
  ).isRequired,
  type: PropTypes.string
}

export default IndicatorsList
