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

function receiveOrders(orders) {
  debugger
  return {
    type: RECEIVE_ORDERS,
    payload: orders
  }  
}

function requestOrders() {
  return {
    type: REQUEST_ORDERS 
  }  
}

export function fetchOrders(delay = 1000) {
  return (dispatch, getState) => {
    const token = getState().auth.token
    dispatch(requestOrders())
    return fetch([config.api, 'orders'].join(''), applyHeaders({}, token))
      .then(response => response.json())
      .then(json => dispatch(receiveOrders(json.data)))
    
    /*setTimeout(() => {
      dispatch(receiveOrders(orders))  
    }, delay)
    */
  }
}

function addOrderSuccess(order) {
  return {
    type: ADD_ORDER,
    payload: order
  }
}
function addOrderAttempt(order) {
  return {
    type: ADD_ORDER_ATTEMPT,
    payload: order
  }
}


function addOrderFail(order) {
  return {
    type: ADD_ORDER_FAIL,
    payload: order
  }
}

export function addOrder(order) {
  return (dispatch, getState) => {
    /*order.date = new Date()
    return {
      [CALL_API]: {
        endpoint: 'orders',
        authenticated: true,
        body: order, 
        method: 'POST',
        types: [ADD_ORDER, ADD_ORDER_FAIL, ADD_ORDER_ATTEMPT]
      }
    }*/
    return new Promise((resolve, reject) => {
      dispatch(addOrderAttempt(order))
      const token = localStorage.getItem('token')
      order.date = new Date()
      return fetch([config.api, 'orders'].join(''), 
        applyToken({
          body: order
        }, {
          token,
          method: 'POST',
        })  
      )
      .then( response => {
        response.json().then(json => ({ json, response }))
      }).then(({ json, response }) =>  {
        if (response.ok) {
        dispatch(addOrderSuccess(json.data))
        // DOC: An action creator that you can use to update the current URL and update the browser history. Just pass it a string like /foo/bar?param=5 as the path argument.
        dispatch(pushPath('/orders/'))
        dispatch(fetchIngredients())
        resolve()
        } else {
          dispatch(addOrderFail(json.errors[0].message))
          reject({name: json.errors[0].message, _error: 'Addition fail'})
        }
      })
    })
  }
}

function editOrderAttempt(order) {
  return {
    type: EDIT_ORDER_ATTEMPT,
    payload: order
  }
}


function editOrderSuccess(order) {
  return {
    type: EDIT_ORDER,
    payload: order
  }
}

function editOrderFail(order) {
  return {
    type: EDIT_ORDER_FAIL,
    payload: order
  }
}


export function editOrder(order) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(editOrderAttempt(order))
      const exists = getState().orders.list.find(e => e.id == order.id)
      if (exists) {
        //fetch
        dispatch(editOrderSuccess(order))
        dispatch(pushPath('/orders/'))
        dispatch(fetchIngredients())
        resolve()
      } else {
        dispatch(editOrderFail(order))
        reject({name: "Order does not exists", error: 'Edit fail'})
      }
    })
  }
}

export function removeOrderAttempt(order) {
  return {
    type: REMOVE_ORDER_ATTEMPT,
    payload: order
  }  
}

export function removeOrderFail(order) {
  return {
    type: REMOVE_ORDER_FAIL,
    payload: order
  }  
}

export function removeOrderSuccess(order) {
  return {
    type: REMOVE_ORDER,
    payload: order
  }  
}

export function removeOrder(order) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      //API call
      dispatch(removeOrderAttempt(order))
      //fetch
      if (true) {
        dispatch(removeOrderSuccess(order))  
        dispatch(pushPath('/orders/'))
        //To recover the updated quantities
        dispatch(fetchIngredients())
        return resolve()
      } else {
        dispatch(removeOrderFail(order))  
        reject({name: "Order cannot be removed right now", error: 'Remove fail'})  
      }
    })  
  }  
}

