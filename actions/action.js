import { pushPath } from 'redux-simple-router'

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
export const EDIT_INGREDIENT = "EDIT:INGREDIENT";
export const REMOVE_INGREDIENT = "REMOVE:INGREDIENT";


export function fetchIngredients(delay = 1000) {
  return (dispatch, getState) => {
    if (getState().ingredients.length !== 0) {
      dispatch(requestIngredients())
      /*fetch('https://dah/ingredients')
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

function editIngredientSuccess(ingredient) {
  return {
    type: EDIT_INGREDIENT,
    payload: ingredient
  }
}

export function addIngredient(ingredient) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      if (getState().ingredients.list.map((i) => i.name).includes(ingredient.name)) {
        reject({name: "Ingredient already exists", error: 'Addition fail'})
      } else {
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
      const exists = getState().ingredients.list.find(e => e.id == ingredient.id)
      if (exists) {
        dispatch(editIngredientSuccess(ingredient))
        dispatch(pushPath('/ingredients/'))
        resolve()
      } else {
        reject({name: "Ingredient does not exists", error: 'Edit fail'})
      }
    })
  }
}

export function removeIngredient(ingredient) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      //API call
      if (true) {
        dispatch(removeIngredientSuccess(ingredient))  
        dispatch(pushPath('ingredients'))
        resolve()
      } else {
        reject({name: "Ingredient cannot be removed right now", error: 'Remove fail'})  
      }
    })  
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
