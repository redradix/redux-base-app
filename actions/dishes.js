import { pushPath } from 'redux-simple-router'
import fetch from 'isomorphic-fetch'

const dishes = [{
  id: 1,
  name: "Pollo al limon",
  pvp: 10
}, {
  id: 2,
  name: "Osobuco",
  pvp: 1
}
]

export const REQUEST_DISHES = "REQUEST:DISHES";
export const RECEIVE_DISHES = "RECEIVE:DISHES";
export const ADD_DISH = "ADD:DISH";
export const ADD_DISH_ATTEMPT = "ADD:DISH_ATTEMPT";
export const ADD_DISH_FAIL = "ADD:DISH_FAIL";
export const EDIT_DISH = "EDIT:DISH";
export const EDIT_DISH_FAIL = "EDIT:DISH_FAIL";
export const EDIT_DISH_ATTEMPT = "EDIT:DISH_ATTEMPT";
export const REMOVE_DISH = "REMOVE:DISH";
export const REMOVE_DISH_ATTEMPT = "REMOVE:DISH_ATTEMPT";
export const REMOVE_DISH_FAIL = "REMOVE:DISH_FAIL";


export function fetchDishes(delay = 1000) {
  return (dispatch, getState) => {
    if (getState().dishes.list.length === 0) {
      dispatch(requestDishes())
      /*fetch('https://dah.com/dishes')
        .then(response => response.json())
        .then(json => dispatch(receiveDishes(json)))
      */
      setTimeout(() => {
        dispatch(receiveDishes(dishes))  
      }, delay)
    }
  }
}

function addDishSuccess(dish) {
  return {
    type: ADD_DISH,
    payload: dish
  }
}
function addDishAttempt(dish) {
  return {
    type: ADD_DISH_ATTEMPT,
    payload: dish
  }
}


function addDishFail(dish) {
  return {
    type: ADD_DISH_FAIL,
    payload: dish
  }
}

function editDishAttempt(dish) {
  return {
    type: EDIT_DISH_ATTEMPT,
    payload: dish
  }
}


function editDishSuccess(dish) {
  return {
    type: EDIT_DISH,
    payload: dish
  }
}

function editDishFail(dish) {
  return {
    type: EDIT_DISH_FAIL,
    payload: dish
  }
}

export function addDish(dish) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(addDishAttempt(dish))
      if (getState().dishes.list.map((i) => i.name).includes(dish.name)) {
        dispatch(addDishFail(dish))
        reject({name: "Dish already exists", error: 'Addition fail'})
      } else {
        //fetch
        dispatch(addDishSuccess(dish))
        dispatch(pushPath('/dishes/'))
        resolve()
      }
    })
  }
}

export function editDish(dish) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(editDishAttempt(dish))
      const exists = getState().dishes.list.find(e => e.id == dish.id)
      if (exists) {
        //fetch
        dispatch(editDishSuccess(dish))
        dispatch(pushPath('/dishes/'))
        resolve()
      } else {
        dispatch(editDishFail(dish))
        reject({name: "Dish does not exists", error: 'Edit fail'})
      }
    })
  }
}

export function removeDish(dish) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      //API call
      dispatch(removeDishAttempt(dish))
      //fetch
      if (true) {
        dispatch(removeDishSuccess(dish))  
        dispatch(pushPath('dishes'))
        resolve()
      } else {
        dispatch(removeDishFail(dish))  
        reject({name: "Dish cannot be removed right now", error: 'Remove fail'})  
      }
    })  
  }  
}

export function removeDishAttempt(dish) {
  return {
    type: REMOVE_DISH_ATTEMPT,
    payload: dish
  }  
}

export function removeDishFail(dish) {
  return {
    type: REMOVE_DISH_FAIL,
    payload: dish
  }  
}

export function removeDishSuccess(dish) {
  return {
    type: REMOVE_DISH,
    payload: dish
  }  
}


function receiveDishes(dishes) {
  return {
    type: RECEIVE_DISHES,
    payload: {
      list: dishes  
    }
  }  
}

function requestDishes() {
  return {
    type: REQUEST_DISHES 
  }  
}
