import { routeActions } from 'react-router-redux'
import { CALL_API } from '../../middleware/api'
import { applyHeaders } from '../helpers'
import config from '../../config'
import { fetchIngredients } from '../ingredients'

const MODULE_NAME = "base-app/orders/"

export const REQUEST_ORDERS = MODULE_NAME.concat("REQUEST:ORDERS")
export const RECEIVE_ORDERS = MODULE_NAME.concat("RECEIVE:ORDERS")
export const ADD_ORDER = MODULE_NAME.concat("ADD:ORDER")
export const ADD_ORDER_ATTEMPT = MODULE_NAME.concat("ADD:ORDER_ATTEMPT")
export const ADD_ORDER_FAIL = MODULE_NAME.concat("ADD:ORDER_FAIL")
export const EDIT_ORDER = MODULE_NAME.concat("EDIT:ORDER")
export const EDIT_ORDER_FAIL = MODULE_NAME.concat("EDIT:ORDER_FAIL")
export const EDIT_ORDER_ATTEMPT = MODULE_NAME.concat("EDIT:ORDER_ATTEMPT")
export const REMOVE_ORDER = MODULE_NAME.concat("REMOVE:ORDER")
export const REMOVE_ORDER_ATTEMPT = MODULE_NAME.concat("REMOVE:ORDER_ATTEMPT")
export const REMOVE_ORDER_FAIL = MODULE_NAME.concat("REMOVE:ORDER_FAIL")
export const REQUEST_ORDER = MODULE_NAME.concat("REQUEST:ORDER")
export const RECEIVE_ORDER = MODULE_NAME.concat("RECEIVE:ORDER")
export const CALENDAR_SET_CURRENT_DATE = MODULE_NAME.concat('CALENDAR:SET_CURRENT_DATE');
export const CALENDAR_ADD_SELECTED_DAY = MODULE_NAME.concat('CALENDAR:ADD_SELECTED_DAY');
export const CALENDAR_REMOVE_SELECTED_DAY = MODULE_NAME.concat('CALENDAR:REMOVE_SELECTED_DAY');

//Async

export function fetchOrder(id) {
  return {
    [CALL_API]: {
      endpoint: ['orders', '/',  id].join(''),
      authenticated: true,
      types: [REQUEST_ORDER, RECEIVE_ORDER]
    }
  }
}

export function fetchOrders(delay = 1000) {
  return {
    [CALL_API]: {
      endpoint: 'orders',
      authenticated: true,
      types: [REQUEST_ORDERS, RECEIVE_ORDERS]
    }
  }
}

export function addOrder(order) {
  return (dispatch, getState) => {
    order.date = new Date()
    return dispatch({
      [CALL_API]: {
        endpoint: 'orders',
        authenticated: true,
        config: {
          method: 'POST',
          body: JSON.stringify(order)
        },
        types: [ADD_ORDER_ATTEMPT, ADD_ORDER, ADD_ORDER_FAIL]
      }
    }).then( ({ payload }) => {
        // DOC: An action creator that you can use to update the current URL and update the browser history. Just pass it a string like /foo/bar?param=5 as the path argument.
      dispatch(routeActions.push('/orders/'))
    }).catch((e) => {
      //How to return errors to your form on a async validation? You can specify {Name of the field: specific error, _error: Generic error} returning it on a reject
      return Promise.reject({name: "Order already exists", _error: 'Addition fail'})
    })
  }
}

export function editOrder(order) {
  return (dispatch, getState) => {
    return dispatch({
      [CALL_API]: {
        endpoint: ['orders', '/',  order.id].join(''),
        authenticated: true,
        config: {
          method: 'PUT',
          body: JSON.stringify(order)
        },
        types: [EDIT_ORDER_ATTEMPT, EDIT_ORDER, EDIT_ORDER_FAIL]
      }
    }).then( ({ payload }) => {
        // DOC: An action creator that you can use to update the current URL and update the browser history. Just pass it a string like /foo/bar?param=5 as the path argument.
      dispatch(routeActions.push('/orders/'))
    }).catch((e) => {
      //How to return errors to your form on a async validation? You can specify {Name of the field: specific error, _error: Generic error} returning it on a reject
      return Promise.reject({name: "Order does not exists", _error: 'Edition fail'})
    })
  }
}

export function removeOrder(order) {
  return (dispatch, getState) => {
    return dispatch({
      [CALL_API]: {
        endpoint: ['orders', '/',  order.id].join(''),
        authenticated: true,
        config: {
          method: 'DELETE'
        },
        types: [REMOVE_ORDER_ATTEMPT, REMOVE_ORDER, REMOVE_ORDER_FAIL]
      }
    }).then( ({ payload, error }) => {
      dispatch(routeActions.push('/orders/'))
    })
  }
}

export function calendarSetCurrentDate( date ) {
  return ( dispatch ) => {
    return dispatch( { type: CALENDAR_SET_CURRENT_DATE, date } );
  }
}


export function calendarAddSelectedDay( date ) {
  return ( dispatch ) => dispatch({ type: CALENDAR_ADD_SELECTED_DAY, date })
}

export function calendarRemoveSelectedDay( date ) {
  return ( dispatch ) => dispatch({ type: CALENDAR_REMOVE_SELECTED_DAY, date })
}