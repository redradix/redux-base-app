import { routeActions } from 'react-router-redux'
import applyToken from '../helpers';
import { CALL_API } from '../../middleware/api'

const MODULE_NAME = "base-app/dishes/"

export const REQUEST_DISHES = MODULE_NAME.concat("REQUEST:DISHES")
export const RECEIVE_DISHES = MODULE_NAME.concat("RECEIVE:DISHES")
export const REQUEST_DISH = MODULE_NAME.concat("REQUEST:DISH")
export const RECEIVE_DISH = MODULE_NAME.concat("RECEIVE:DISH")
export const ADD_DISH = MODULE_NAME.concat("ADD:DISH")
export const ADD_DISH_ATTEMPT = MODULE_NAME.concat("ADD:DISH_ATTEMPT")
export const ADD_DISH_FAIL = MODULE_NAME.concat("ADD:DISH_FAIL")
export const EDIT_DISH = MODULE_NAME.concat("EDIT:DISH")
export const EDIT_DISH_FAIL = MODULE_NAME.concat("EDIT:DISH_FAIL")
export const EDIT_DISH_ATTEMPT = MODULE_NAME.concat("EDIT:DISH_ATTEMPT")
export const REMOVE_DISH = MODULE_NAME.concat("REMOVE:DISH")
export const REMOVE_DISH_ATTEMPT = MODULE_NAME.concat("REMOVE:DISH_ATTEMPT")
export const REMOVE_DISH_FAIL = MODULE_NAME.concat("REMOVE:DISH_FAIL")


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
      dispatch(routeActions.push('/dishes/'))
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
      dispatch(routeActions.push('/dishes/'))
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
      dispatch(routeActions.push('/dishes/'))
    })
  }
}
