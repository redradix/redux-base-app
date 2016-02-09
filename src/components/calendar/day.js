// day.js

import React, { Component, PropTypes } from 'react';
import moment from 'moment';

class Day extends Component {

  handleClick(event){
    const { states } = this.props;
    
    this.props.onDayClick(event.currentTarget.dataset.date)
  }
  
  _getTdStyle () {
    return styles.td;
  }

  _getDateValueStyle () {
    const { style, states } = this.props;

    return states.reduce(function(prev, state) { 
      return Object.assign({}, prev, style[state]||{}) }
    , styles.dateValue);
  }

  render(){
    const { date, style, states, key } = this.props;
    let value, dateValue;
    if (typeof(date) === 'string') {
      value = '-';
    } else {
      const mDate     = moment(date*1000);
      value           = mDate.isValid() ? mDate.date() : '-';
      dateValue       = mDate.isValid() ? mDate.valueOf() : null;
    }
    const tdStyle = this._getTdStyle();
    const valueStyle = this._getDateValueStyle();

    return(
      <td data-date={dateValue} style={tdStyle} className={states.join(' ')} onClick={(event) => this.handleClick(event)} key={key}>
        <span style={valueStyle}>{value}</span>
      </td>
    );
  }
}

Day.propTypes = {
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onDayClick: PropTypes.func.isRequired,
  style: PropTypes.object,
  states: PropTypes.array.isRequired
}

const styles = {
  td: {
    padding: 5,
    lineHeight: '1.42857143',
    verticalAlign: 'top',
    borderTop: '1px solid #ddd',
    cursor: 'pointer',
    textAlign: 'center'
  },
  dateValue: {
    display: 'inline-block',
    borderRadius: 10,
    width: 35,
    textAlign: 'center'
  }
}

export default Day;