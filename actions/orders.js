import { pushPath } from 'redux-simple-router'
import { CALL_API } from '../middleware/api'
import fetch from 'isomorphic-fetch'
import { applyHeaders } from './helpers'
import config from '../config'
import { fetchIngredients } from './ingredients'

export const REQUEST_ORDERS = "REQUEST:ORDERS";
export const RECEIVE_ORDERS = "RECEIVE:ORDERS";
export const ADD_ORDER = "ADD:ORDER";
export const ADD_ORDER_ATTEMPT = "ADD:ORDER_ATTEMPT";
export const ADD_ORDER_FAIL = "ADD:ORDER_FAIL";
export const EDIT_ORDER = "EDIT:ORDER";
export const EDIT_ORDER_FAIL = "EDIT:ORDER_FAIL";
export const EDIT_ORDER_ATTEMPT = "EDIT:ORDER_ATTEMPT";
export const REMOVE_ORDER = "REMOVE:ORDER";
export const REMOVE_ORDER_ATTEMPT = "REMOVE:ORDER_ATTEMPT";
export const REMOVE_ORDER_FAIL = "REMOVE:ORDER_FAIL";
export const REQUEST_ORDER = "REQUEST:ORDER";
export const RECEIVE_ORDER = "RECEIVE:ORDER";

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
      dispatch(pushPath('/orders/'))
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
      dispatch(pushPath('/orders/'))
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
      dispatch(pushPath('/orders/'))
    }) 
  }  
}

