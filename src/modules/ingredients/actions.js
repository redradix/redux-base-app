//TODO: remove boilerplate of FAIL and SUCCESS, both for actions and action_creators
//Take a look at redux-actions
////TODO: why orders are not fetching

import { pushPath } from 'redux-simple-router'
import fetch from 'isomorphic-fetch'
import { applyToken } from '../helpers';
import { findById } from "../../utils/utils"
import config from '../../config'
import { CALL_API } from '../../middleware/api'

const MODULE_NAME = "base-app/ingredients/"

export const REQUEST_INGREDIENTS = MODULE_NAME.concat("REQUEST:INGREDIENTS")
export const RECEIVE_INGREDIENTS = MODULE_NAME.concat("RECEIVE:INGREDIENTS")
export const ADD_INGREDIENT = MODULE_NAME.concat("ADD:INGREDIENT")
export const ADD_INGREDIENT_ATTEMPT = MODULE_NAME.concat("ADD:INGREDIENT_ATTEMPT")
export const ADD_INGREDIENT_FAIL = MODULE_NAME.concat("ADD:INGREDIENT_FAIL")
export const EDIT_INGREDIENT = MODULE_NAME.concat("EDIT:INGREDIENT")
export const EDIT_INGREDIENT_FAIL = MODULE_NAME.concat("EDIT:INGREDIENT_FAIL")
export const EDIT_INGREDIENT_ATTEMPT = MODULE_NAME.concat("EDIT:INGREDIENT_ATTEMPT")
export const REMOVE_INGREDIENT = MODULE_NAME.concat("REMOVE:INGREDIENT")
export const REMOVE_INGREDIENT_ATTEMPT = MODULE_NAME.concat("REMOVE:INGREDIENT_ATTEMPT")
export const REMOVE_INGREDIENT_FAIL = MODULE_NAME.concat("REMOVE:INGREDIENT_FAIL")

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
    }).then( ({ payload }) => {
      dispatch(pushPath('/ingredients/'))
    }).catch(() => {
      return Promise.reject({name: "Ingredient already exists", _error: 'Addition fail'})
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
    }).then( ({ payload }) => {
      dispatch(pushPath('/ingredients/'))
    }).catch((e) => {
      return Promise.reject({name: "Ingredient does not exists", _error: 'Edition fail'})
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
    }).then( ({ payload }) => {
      // TODO: Carlos. Control when the ingredient can not be removed due to referencial integrity
      // TODO: Carlos. Los errores deberian devolver un formato comun. Este podria ser {nameOfTheFieldIfExist: specificError, _error: genericError}
      dispatch(pushPath('/ingredients/'))
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