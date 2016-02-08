// index.js
import React, { Component, PropTypes } from 'react';
import Header from './header';
import Days from './days';
import moment from 'moment';

class Calendar extends Component {
  
  render() {
    const date = moment(this.props.currentDate);
    const month = date.month() + 1;
    const year = date.year();

    return (
      <table style={styles.table}>
        <Header {...this.props} />
        <Days month={month} year={year} {...this.props} />
      </table>
    )
  }
}

Calendar.propTypes = {
  currentDate:      PropTypes.number,
  onPrevMonthClick: PropTypes.func.isRequired,
  onNextMonthClick: PropTypes.func.isRequired,
  stateDates:       PropTypes.object,
  initialRangeDate: PropTypes.number,
}

Calendar.defaultProps = {
  currentDate: new Date(),
}

const styles = {
  table: {
    width:          '70%',
    maxWidth:       '70%',
    marginBottom:   20,
    borderSpacing:  0,
    borderCollapse: 'collapse'
  }
}

export default Calendar;