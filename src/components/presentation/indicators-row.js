import React, { Component, PropTypes } from 'react'
import cx from 'classnames'
import Indicator from 'components/presentation/indicator'

class IndicatorsRow extends Component {
  render() {
    const { indicators, type, center } = this.props
    const className = cx('indicators-row', { 'h-center': center })
    return (
      <div className={className}>
        {indicators.map((indicator, index) => (
          <Indicator key={index} type={type} {...indicator} />
        ))}
      </div>
    )
  }
}

IndicatorsRow.defaultProps = {
  indicators: [],
  center: false
}

IndicatorsRow.propTypes = {
  indicators: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      label: PropTypes.string.isRequired,
      children: PropTypes.node.isRequired
    }).isRequired
  ).isRequired,
  type: PropTypes.string, // used as default if provided
  center: PropTypes.bool.isRequired
}

export default IndicatorsRow
