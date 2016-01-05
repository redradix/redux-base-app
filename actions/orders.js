import { pushPath } from 'redux-simple-router'
import fetch from 'isomorphic-fetch'
import { applyToken } from './helpers'
import { fetchIngredients } from './ingredients'

const orders = [{
  id: 1,
  date: new Date(),
  dishes: [{
    id: 1,
    quantity: 3
  },
  {
   id: 2,
   quantity: 2
  }]
}, {
  id: 2,
  date: new Date(),
  dishes: [{
    id: 1,
    quantity: 6
  },
  {
   id: 2,
   quantity: 1
  }]
}
]

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
  return {
    type: RECEIVE_ORDERS,
    payload: {
      list: orders  
    }
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
    /*fetch('https://dah.com/orders', applyToken({}, token))
      .then(response => response.json())
      .then(json => dispatch(receiveOrders(json)))
    */
    setTimeout(() => {
      dispatch(receiveOrders(orders))  
    }, delay)
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
    return new Promise((resolve, reject) => {
      dispatch(addOrderAttempt(order))
      //fetch
      order.date = new Date()
      dispatch(addOrderSuccess(order))
      // DOC: An action creator that you can use to update the current URL and update the browser history. Just pass it a string like /foo/bar?param=5 as the path argument.
      dispatch(pushPath('/orders/'))
      dispatch(fetchIngredients())
      resolve()
      //Fail
      //dispatch(addOrderFail(order))
      //reject({name: "Order already exists", error: 'Addition fail'})
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

