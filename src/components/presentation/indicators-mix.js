import React, { Component, PropTypes } from 'react'
import Indicator from 'components/presentation/indicator'

class IndicatorsMix extends Component {
  render() {
    const { indicators, types } = this.props
    return (
      <div className='indicators-mix'>
        {indicators.map((indicator, index) => (
          <Indicator key={index} type={types[index]} {...indicator} />
        ))}
      </div>
    )
  }
}

IndicatorsMix.propTypes = {
  indicators: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      label: PropTypes.string.isRequired,
      children: PropTypes.node
    }).isRequired
  ).isRequired,
  types: PropTypes.arrayOf(PropTypes.string)
}

export default IndicatorsMix
