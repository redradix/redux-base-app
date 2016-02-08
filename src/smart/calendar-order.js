// calendar-order.js
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Calendar from '../components/calendar';
import { setCalendarCurrentDate } from '../modules/orders/actions';
import moment from 'moment';
import 'moment-range';

class CalendarOrder extends Component {

  componentWillMount() {
    const { currentDate } = this.props;
    if ( !currentDate ) this.props.setCalendarCurrentDate( moment().valueOf() ); 
  }

  _onPrevMonthClick() {
    const { currentDate } = this.props;

    this.props.setCalendarCurrentDate( moment(currentDate).add(-1, 'month').valueOf() );
    console.log('Vacation Calendar : Prev Month Clicked! - ' + moment(currentDate).format('L'));
  }

  _onNextMonthClick() {
    const { currentDate } = this.props;

    this.props.setCalendarCurrentDate( moment(currentDate).add(1, 'month').valueOf() );
    console.log('Vacation Calendar : Next Month Clicked! - ' + moment(currentDate).format('L'));
  }

  _onDayClick( date ) {
    const { dispatch, initialRangeDate, selected } = this.props;

    if( !initialRangeDate ) {
      dispatch( setInitialRangeDate ( parseInt(date) ) );
    } else {
      const initial = moment(initialRangeDate);
      const end = moment(parseInt(date));
      const range = initial.isBefore(end) ? moment.range( initial, end ) : moment.range( end, initial );
      const id    = Object.keys(selected).length;
      dispatch( addSelectedRange ( id, range ) );
    }
  }

  render () {
    const { currentDate, orders, selected, initialRangeDate } = this.props;
    const stateDates = { orders, selected };
    const content = currentDate ?
      <Calendar 
        currentDate       = { currentDate }
        stateDates        = { stateDates }
        stateStyles       = { styles }
        onPrevMonthClick  = { () => this._onPrevMonthClick() } 
        onNextMonthClick  = { () => this._onNextMonthClick() } 
        onDayClick        = { date => this._onDayClick(date) }
        initialRangeDate  = { initialRangeDate }
        /> 
      :
      null;
    
    return(
        <div>
          <h1>Calendario de comandas</h1> 
          {content}
        </div>
      );
  }

}

const styles = {
  order: {
    backgroundColor: '#F00'
  },
  selected: {
    backgroundColor: '#00F',
    color: 'white'
  }
} 

function mapStateToProps(state, ownProps) {
  const { orders, calendar } = state;
  const { list } = orders;
  const { currentDate, initialRangeDate, selected } = calendar;
  return {
    currentDate,
    initialRangeDate,
    selected,
    orders: list,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setCalendarCurrentDate }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarOrder)