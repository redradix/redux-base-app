// days.js
// days.js
import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import 'moment-range';
import Day from './day';

class Days extends Component {
  
  _generateDay ( date, states = [] ) {
    const { stateStyles, onDayClick } = this.props;
    const customStyles            = Object.assign(styles, stateStyles);
    const dateValue               = typeof(date) === 'string' ? date : date.unix();
    const disabled                = states.includes('disabled') || states.includes('selected') || states.includes('requested');
    const statesStyles            = states.reduce(function(prev, state) { 
        return Object.assign({}, prev, customStyles[state]||{}) }
      , styles.td);

    return (<Day key={dateValue} disabled={disabled} date={dateValue} style={statesStyles} className={states.join(' ')} onDayClick={onDayClick}  />);
  }

  _generateWeek ( days, key ) { 
    return(<tr key={key}>{days}</tr>) 
  }

  _getStates ( date ) {
    const { stateDates, initialRangeDate }  = this.props;
    const keys            = Object.keys(stateDates);
    // const dateToCheck     = date.format('L');
    let states            = [];

    if ( keys ) { 
      states = keys.filter( key => {
        if ( !stateDates[key] || Object.keys(stateDates[key]).length == 0 ) return false;

        return Object.keys(stateDates[key]).reduce(function( found, id ){
          return found || ( 
            stateDates[key][id].reduce ? 
              stateDates[key][id].reduce( function( found, dates ) {
                return found || ( 
                  dates.indexOf ? 
                    dates.indexOf( date ) !== -1 : 
                    dates.contains( date )
                );  
              }, false) : 
              moment(stateDates[key][id].date).isSame(date)
          );
        }, false);

      });
    }

    if( initialRangeDate && date.isSame(moment(initialRangeDate)) ) states.push('initial');

    return states;
  }

  _getPrevMonthDays () {
    const { month, year, onDayClick } = this.props;
    const date        = moment(`${year}${month}`, 'YYYYM');
    const dayOfWeek   = date.weekday();
    const initialDate = date.add(-dayOfWeek,'day');
    let   cells       = [];

    for ( let i = 1; i <= dayOfWeek; i++) {
      cells.push( this._generateDay( date, ['prevMonth'].concat( this._getStates( date ) ) ) ); 
      date.add(1,'day');
    }

    return cells;
  }
  
  _getCurrentMonthDays () {
    const { month, year, onDayClick } = this.props;
    const date  = moment(`${year}${month}`, 'YYYYM');
    let   cells = [];

    while (date.month() == month - 1) {
      cells.push( this._generateDay( date, this._getStates( date ) ) );
      date.add(1, 'day');
    }

    return cells;
  }

  _getNextMonthDays () {
    const { month, year, onDayClick } = this.props;
    const date          = moment(`${year}${month}`, 'YYYYM').add(1,'month');
    const lastDayOfWeek = date.add(-1, 'day').weekday();
    let   cells         = [];

    if (lastDayOfWeek != 6) for ( let j = lastDayOfWeek; j < 7; j++) {
      date.add(1,'day');
      cells.push( this._generateDay(date, ['nextMonth'].concat( this._getStates( date ) ) ) ); 
    }

    return cells;
  }

  _getDays() {
    const { month, year, stateDates, onDayClick, stateStyles } = this.props;
    const date                                    = moment(`${year}${month}`, 'YYYYM');
    const dayOfWeek                               = date.weekday();
    const customStyles = Object.assign(styles, stateStyles);
    let cells = [], weeks = [], i = 1, j = 0, week = 0;

    cells = [].concat( this._getPrevMonthDays(), this._getCurrentMonthDays(), this._getNextMonthDays() );
    
    
    // Group cells in weeks 
    while(cells.length > 6){
      weeks.push( this._generateWeek( cells.splice(0, 7), week++ ) );
    }

    return weeks;
  }

  render() {
    const cells = this._getDays();
    return(<tbody>{ cells }</tbody>);
  }
}

Days.propTypes = {
  month: PropTypes.number,
  year: PropTypes.number,
  stateDates: PropTypes.object,
  stateStyles: PropTypes.object,
  onDayClick: PropTypes.func.isRequired,
  initialRangeDate: PropTypes.number,
}

Days.defaultProps = {
  month: moment().month() + 1,
  year: moment().year(),
  stateDates: {},
  stateStyles: {},
}

const styles = {
  td: {
    padding: 8,
    lineHeight: '1.42857143',
    verticalAlign: 'top',
    borderTop: '1px solid #ddd',
    textAlign: 'center',
    cursor: 'pointer'
  },
  initial: {
    backgroundColor: '#0F0'
  },
  disabled: {
    color: '#BBB'
  },
  prevMonth: {
    backgroundColor: '#EEE',
    color: '#BBB'
  },
  nextMonth: {
    backgroundColor: '#EEE',
    color: '#BBB'
  }
}

export default Days;