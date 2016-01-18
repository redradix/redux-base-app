//TODO: remove boilerplate of FAIL and SUCCESS, both for actions and action_creators
//Take a look at redux-actions
////TODO: why orders are not fetching

import { pushPath } from 'redux-simple-router'
import fetch from 'isomorphic-fetch'
import { applyToken } from './helpers';
import { findById } from "../utils/utils"
import config from '../config'
import { CALL_API } from '../middleware/api'

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

export function fetchIngredients() {
  return {
    [CALL_API]: {
      endpoint: 'ingredients',
      authenticated: true,
      types: [REQUEST_INGREDIENTS, RECEIVE_INGREDIENTS]
    }  
  }
}

export function addIngredient(ingredient) {
  return (dispatch, getState) => {
    return dispatch({
      [CALL_API]: {
        endpoint: 'ingredients',
        authenticated: true,
        config: {
          method: 'POST',
          body: JSON.stringify(ingredient)
        },
        types: [ADD_INGREDIENT_ATTEMPT, ADD_INGREDIENT, ADD_INGREDIENT_FAIL]
      }  
    }).then( ({ payload, error }) => {
      if (error) {
        Promise.reject({name: "Ingredient already exists", error: 'Addition fail'})
      } else {
        dispatch(pushPath('/ingredients/'))
      }
    }) 
  }
}

export function editIngredient(ingredient) {
  return (dispatch, getState) => {
    return dispatch({
      [CALL_API]: {
        endpoint: ['ingredients', '/',  ingredient.id].join(''),
        authenticated: true,
        config: {
          method: 'PUT',
          body: JSON.stringify(ingredient)
        },
        types: [EDIT_INGREDIENT_ATTEMPT, EDIT_INGREDIENT, EDIT_INGREDIENT_FAIL]
      }  
    }).then( ({ payload, error }) => {
      if (error) {
        Promise.reject({name: "Ingredient does not exists", error: 'Edition fail'})
      } else {
        dispatch(pushPath('/ingredients/'))
      }
    }) 
  }
}

export function removeIngredient(ingredient) {
  return (dispatch, getState) => {
    return dispatch({
      [CALL_API]: {
        endpoint: ['ingredients', '/',  ingredient.id].join(''),
        authenticated: true,
        config: {
          method: 'DELETE'
        },
        types: [REMOVE_INGREDIENT_ATTEMPT, REMOVE_INGREDIENT, REMOVE_INGREDIENT_FAIL]
      }  
    }).then( ({ payload, error }) => {
      // TODO: Carlos. Control when the ingredient can not be removed due to referencial integrity
      if (error) {
        Promise.reject({name: "Ingredient does not exists", error: 'Remove fail'})
      } else {
        dispatch(pushPath('/ingredients/'))
      }
    }) 
  }  
}

export function checkAvailability(order) {
  return (dispatch, getState) => {
    return dispatch(fetchIngredients())
    return dispatch(fetchDishes())
    .then(() => {
      const ingredients = getState().ingredients.list
      const dishes = getState().dishes.list
      return order.dishes.reduce((acc, d) => {
        const dish = findById(d.id, dishes) 
        const available = dish.ingredients.reduce((acc, ingredient) => {
          return acc && (ingredient.amount < findById(ingredient.id, ingredients).stock)
        }, true)  
        available ? acc : acc.push(dish)
        return acc
      }, [])
    })
    .then((dishesNotAvailable) => {
      if (dishesNotAvailable.length > 0) {
        return Promise.reject({_error: "There are some dishes not available right now: " + dishesNotAvailable.map( d => {return d.name}).join(", "), name: 'dishes'})
      }  
      return Promise.resolve()
    })
  }
}
