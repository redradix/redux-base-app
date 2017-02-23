import React, { Component, PropTypes } from 'react'
import Indicator from 'components/presentation/indicator'
import RelativeBars from 'components/presentation/charts/relative-bars'
import { t } from 'core/i18n'
import { p } from 'core/numeral'

class RelativeBarsChart extends Component {
  render() {
    const { percent } = this.props
    return (
      <div className='relative-bars-chart'>
        <Indicator type='noisy' label={p(percent)} />
        <RelativeBars {...this.props} />
      </div>
    )
  }
}

RelativeBars.defaultProps = {
  goalLabel: t('common.labels.goal'),
  value: 0,
  goal: 1
}

RelativeBarsChart.propTypes = {
  label: PropTypes.string.isRequired,
  goalLabel: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  goal: PropTypes.number.isRequired,
  percent: PropTypes.number.isRequired
}

export default RelativeBarsChart
