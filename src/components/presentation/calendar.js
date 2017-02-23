import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import Icon from 'components/presentation/icon'

class Calendar extends Component {
  render() {
    const { date } = this.props
    return (
      <p className='date'>
        <Icon type='calendar' />
        <span>As of {moment(date).format('DD MMM YYYY')}</span>
      </p>
    )
  }
}

Calendar.propTypes = {
  date: PropTypes.string.isRequired
}

export default Calendar
