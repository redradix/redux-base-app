import { pushPath } from 'redux-simple-router'
import fetch from 'isomorphic-fetch'
import applyToken from './helpers';
import { CALL_API } from '../middleware/api'

export const REQUEST_DISHES = "REQUEST:DISHES";
export const RECEIVE_DISHES = "RECEIVE:DISHES";
export const REQUEST_DISH = "REQUEST:DISH";
export const RECEIVE_DISH = "RECEIVE:DISH";
export const ADD_DISH = "ADD:DISH";
export const ADD_DISH_ATTEMPT = "ADD:DISH_ATTEMPT";
export const ADD_DISH_FAIL = "ADD:DISH_FAIL";
export const EDIT_DISH = "EDIT:DISH";
export const EDIT_DISH_FAIL = "EDIT:DISH_FAIL";
export const EDIT_DISH_ATTEMPT = "EDIT:DISH_ATTEMPT";
export const REMOVE_DISH = "REMOVE:DISH";
export const REMOVE_DISH_ATTEMPT = "REMOVE:DISH_ATTEMPT";
export const REMOVE_DISH_FAIL = "REMOVE:DISH_FAIL";


export function fetchDishes() {
  return {
    [CALL_API]: {
      endpoint: 'dishes',
      authenticated: true,
      types: [REQUEST_DISHES, RECEIVE_DISHES]
    }  
  }
}

export function fetchDish(id) {
  return (dispatch, getState) => {
    return dispatch({
      [CALL_API]: {
        endpoint: ['dishes', '/',  id].join(''),
        authenticated: true,
        types: [REQUEST_DISH, RECEIVE_DISH]
      }  
    })
  }
}

export function addDish(dish) {
  return (dispatch, getState) => {
    return dispatch({
      [CALL_API]: {
        endpoint: 'dishes',
        authenticated: true,
        config: {
          method: 'POST',
          body: JSON.stringify(dish)
        },
        types: [ADD_DISH_ATTEMPT, ADD_DISH, ADD_DISH_FAIL]
      }  
    }).then( ({ payload }) => {
      dispatch(pushPath('/dishes/'))
    }).catch(() => {
      return Promise.reject({name: "Dish already exists", _error: 'Addition fail'})
    }) 
  }
}

export function editDish(dish) {
  return (dispatch, getState) => {
    return dispatch({
      [CALL_API]: {
        endpoint: ['dishes', '/',  dish.id].join(''),
        authenticated: true,
        config: {
          method: 'PUT',
          body: JSON.stringify(dish)
        },
        types: [EDIT_DISH_ATTEMPT, EDIT_DISH, EDIT_DISH_FAIL]
      }  
    }).then( ({ payload }) => {
      dispatch(pushPath('/dishes/'))
    }).catch(() => {
      return Promise.reject({name: "Dish does not exists", _error: 'Edition fail'})
    }) 
  }
}

export function removeDish(dish) {
  return (dispatch, getState) => {
    return dispatch({
      [CALL_API]: {
        endpoint: ['dishes', '/',  dish.id].join(''),
        authenticated: true,
        config: {
          method: 'DELETE'
        },
        types: [REMOVE_DISH_ATTEMPT, REMOVE_DISH, REMOVE_DISH_FAIL]
      }  
    }).then( ({ payload }) => {
      dispatch(pushPath('/dishes/'))
    }) 
  }  
}
