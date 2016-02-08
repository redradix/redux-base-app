// day.js

import React, { Component, PropTypes } from 'react';
import moment from 'moment';

class Day extends Component {

  handleClick(event){
    if( !this.props.disabled ) this.props.onDayClick(event.currentTarget.dataset.date)
  }

  render(){
    const { date, style, className, key } = this.props;
    let value, dateValue;
    if (typeof(date) === 'string') {
      value = '-';
    } else {
      const mDate     = moment(date*1000);
      value           = mDate.isValid() ? mDate.date() : '-';
      dateValue       = mDate.isValid() ? mDate.valueOf() : null;
    }

    return(
      <td data-date={dateValue} className={className} style={style} onClick={(event) => this.handleClick(event)} key={key}>
        {value}
      </td>
    );
  }
}

Day.propTypes = {
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onDayClick: PropTypes.func.isRequired,
  style: PropTypes.object,
  className: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
}

export default Day;