//TODO: remove boilerplate of FAIL and SUCCESS, both for actions and action_creators
//Take a look at redux-actions

import { pushPath } from 'redux-simple-router'
import fetch from 'isomorphic-fetch'

const ingredients = [{
  id: 1,
  name: "Albahaca",
  cost: 10,
  stock: 250
}, {
  id: 2,
  name: "Pasta",
  cost: 1,
  stock: 1250
}
]

export const REQUEST_INGREDIENTS = "REQUEST:INGREDIENTS";
export const RECEIVE_INGREDIENTS = "RECEIVE:INGREDIENTS";
export const ADD_INGREDIENT = "ADD:INGREDIENT";
export const ADD_INGREDIENT_ATTEMPT = "ADD:INGREDIENT_ATTEMPT";
export const ADD_INGREDIENT_FAIL = "ADD:INGREDIENT_FAIL";
export const EDIT_INGREDIENT = "EDIT:INGREDIENT";
export const EDIT_INGREDIENT_FAIL = "EDIT:INGREDIENT_FAIL";
export const EDIT_INGREDIENT_ATTEMPT = "EDIT:INGREDIENT_ATTEMPT";
export const REMOVE_INGREDIENT = "REMOVE:INGREDIENT";
export const REMOVE_INGREDIENT_ATTEMPT = "REMOVE:INGREDIENT_ATTEMPT";
export const REMOVE_INGREDIENT_FAIL = "REMOVE:INGREDIENT_FAIL";


export function fetchIngredients(delay = 1000) {
  return (dispatch, getState) => {
    if (getState().ingredients.length !== 0) {
      dispatch(requestIngredients())
      /*fetch('https://dah.com/ingredients')
        .then(response => response.json())
        .then(json => dispatch(receiveIngredients(json)))
      */
      setTimeout(() => {
        dispatch(receiveIngredients(ingredients))  
      }, delay)
    }
  }
}

function addIngredientSuccess(ingredient) {
  return {
    type: ADD_INGREDIENT,
    payload: ingredient
  }
}
function addIngredientAttempt(ingredient) {
  return {
    type: ADD_INGREDIENT_ATTEMPT,
    payload: ingredient
  }
}


function addIngredientFail(ingredient) {
  return {
    type: ADD_INGREDIENT_FAIL,
    payload: ingredient
  }
}

function editIngredientAttemp(ingredient) {
  return {
    type: EDIT_INGREDIENT_ATTEMPT,
    payload: ingredient
  }
}


function editIngredientSuccess(ingredient) {
  return {
    type: EDIT_INGREDIENT,
    payload: ingredient
  }
}

function editIngredientFail(ingredient) {
  return {
    type: EDIT_INGREDIENT_FAIL,
    payload: ingredient
  }
}

export function addIngredient(ingredient) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(addIngredientAttempt(ingredient))
      if (getState().ingredients.list.map((i) => i.name).includes(ingredient.name)) {
        dispatch(addIngredientFail(ingredient))
        reject({name: "Ingredient already exists", error: 'Addition fail'})
      } else {
        //fetch
        dispatch(addIngredientSuccess(ingredient))
        dispatch(pushPath('/ingredients/'))
        resolve()
      }
    })
  }
}

export function editIngredient(ingredient) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(editIngredientAttempt(ingredient))
      const exists = getState().ingredients.list.find(e => e.id == ingredient.id)
      if (exists) {
        //fetch
        dispatch(editIngredientSuccess(ingredient))
        dispatch(pushPath('/ingredients/'))
        resolve()
      } else {
        dispatch(editIngredientFail(ingredient))
        reject({name: "Ingredient does not exists", error: 'Edit fail'})
      }
    })
  }
}

export function removeIngredient(ingredient) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      //API call
      dispatch(removeIngredientAttempt(ingredient))
      //fetch
      if (true) {
        dispatch(removeIngredientSuccess(ingredient))  
        dispatch(pushPath('ingredients'))
        resolve()
      } else {
        dispatch(removeIngredientFail(ingredient))  
        reject({name: "Ingredient cannot be removed right now", error: 'Remove fail'})  
      }
    })  
  }  
}

export function removeIngredientAttempt(ingredient) {
  return {
    type: REMOVE_INGREDIENT_ATTEMPT,
    payload: ingredient
  }  
}

export function removeIngredientFail(ingredient) {
  return {
    type: REMOVE_INGREDIENT_FAIL,
    payload: ingredient
  }  
}

export function removeIngredientSuccess(ingredient) {
  return {
    type: REMOVE_INGREDIENT,
    payload: ingredient
  }  
}


function receiveIngredients(ingredients) {
  return {
    type: RECEIVE_INGREDIENTS,
    payload: {
      list: ingredients  
    }
  }  
}

function requestIngredients() {
  return {
    type: REQUEST_INGREDIENTS 
  }  
}
