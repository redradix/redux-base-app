// calendar-order.js
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { translate, Interpolate } from 'react-i18next/lib';
import Calendar from '../components/calendar';
import { calendarSetCurrentDate, calendarSetDayOrders, calendarAddSelectedDay, calendarRemoveSelectedDay } from '../modules/orders/actions';
import moment from 'moment';
import 'moment-range';
import i18n from 'i18next/lib';

moment.locale(i18n.language);

class CalendarOrder extends Component {

  componentWillMount() {
    const { currentDate } = this.props;
    if ( !currentDate ) this.props.calendarSetCurrentDate( moment().valueOf() ); 
  }

  _onPrevMonthClick() {
    const { currentDate } = this.props;

    this.props.calendarSetCurrentDate( moment(currentDate).add(-1, 'month').valueOf() );
    console.log('Vacation Calendar : Prev Month Clicked! - ' + moment(currentDate).format('L'));
  }

  _onNextMonthClick() {
    const { currentDate } = this.props;

    this.props.calendarSetCurrentDate( moment(currentDate).add(1, 'month').valueOf() );
    console.log('Vacation Calendar : Next Month Clicked! - ' + moment(currentDate).format('L'));
  }

  _onDayClick( date ) {
    const {  selected, calendarAddSelectedDay, calendarRemoveSelectedDay } = this.props;
    
    selected.indexOf(parseInt(date)) !== -1 ? 
      calendarRemoveSelectedDay( parseInt( date ) ) : 
      calendarAddSelectedDay( parseInt(date) );
  }

  _showDayOrders() {
    const { orders, selected, t } = this.props;

    const dayOrders = orders.length > 0 &&  orders.filter( order => { 
      return selected
        .map( date => moment( parseInt(date ) ) )
        .reduce( (found, date) => {
          return found || moment(order.createdAt).isSame(date,'day');
        }, false);
    });

    return dayOrders.length > 0 &&
      <ul>
        { dayOrders.map( ( order, index ) => {
            return <li key={index}>
              <Link to={`/orders/${order.id}/show`}>{t('listOrders.order')} {order.id} </Link><Interpolate i18nKey='listOrders.date' date={moment(order.createdAt).format('L')} />
            </li>
          })
        }
      </ul>;
  }

  render () {
    const { currentDate, orders, selected, initialRangeDate, t } = this.props;
    const orderDates = orders.map( order => moment(order.createdAt).valueOf() );
    const stateDates = { orders: orderDates, selected };
    const content = currentDate ?
      <Calendar 
        currentDate       = { currentDate }
        stateDates        = { stateDates }
        stateStyles       = { styles }
        onPrevMonthClick  = { () => this._onPrevMonthClick() } 
        onNextMonthClick  = { () => this._onNextMonthClick() } 
        onDayClick        = { date => this._onDayClick(date) }
        initialRangeDate  = { initialRangeDate } /> 
      : null;
    
    return(
        <div>
          <h1>{t('calendarOrders.title')}</h1> 
          {content}
          {this._showDayOrders()}
        </div>
      );
  }

}

const styles = {
  orders: {
    backgroundColor: 'rgba(222, 129, 62, 0.63)'
  },
  selected: {
    backgroundColor: 'rgba(34, 40, 224, 0.63)',
    color: 'white',
    fontWeight: 'bold'
  }
} 

function mapStateToProps(state, ownProps) {
  const { orders, calendar } = state;
  const { list } = orders;
  const { currentDate, initialRangeDate, selected, dayOrders } = calendar;
  return {
    currentDate,
    initialRangeDate,
    selected,
    dayOrders,
    orders: list,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ 
    calendarSetCurrentDate, 
    calendarSetDayOrders, 
    calendarAddSelectedDay,
    calendarRemoveSelectedDay 
  }, dispatch)
}

export default translate(['common'])(connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarOrder))