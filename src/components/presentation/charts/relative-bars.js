import React, { Component, PropTypes } from 'react'
import RelativeBar from 'components/presentation/charts/relative-bar'

class RelativeBars extends Component {
  render() {
    const { label, goalLabel, value, goal } = this.props
    const max = Math.max(value, goal)
    return (
      <div className='relative-bars'>
        <RelativeBar width={goal / max} label={goalLabel} value={goal} />
        <RelativeBar width={value / max} label={label} value={value} />
      </div>
    )
  }
}

RelativeBars.defaultProps = {
  goalLabel: 'Goal',
  value: 0,
  goal: 1
}

RelativeBars.propTypes = {
  label: PropTypes.string.isRequired,
  goalLabel: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  goal: PropTypes.number.isRequired
}

export default RelativeBars
