import React, { PropTypes } from 'react'
import ColorIndicator from 'components/presentation/color-indicator'
import Data from 'components/presentation/mild-legend-data'

const MildLegend = ({ value, label, secondaryValue, secondaryLabel, color }) => (
  <div className='mild-legend-item'>
    <div className='legend-col'>
      <ColorIndicator color={color} />
      <Data value={value} label={label} />
    </div>
    <div className='legend-col'>
      <Data value={secondaryValue} label={secondaryLabel} />
    </div>
  </div>
)

MildLegend.propTypes = {
  color: PropTypes.string,
  value: PropTypes.node.isRequired,
  label: PropTypes.node.isRequired,
  secondaryValue: PropTypes.node.isRequired,
  secondaryLabel: PropTypes.node.isRequired
}

export default MildLegend
