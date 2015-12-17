const ingredients = [{
  name: "Albahaca",
  cost: 10,
  stock: 250
}, {
  name: "Pasta",
  cost: 1,
  stock: 1250
}
]

export const REQUEST_INGREDIENTS = "REQUEST:INGREDIENTS";
export const RECEIVE_INGREDIENTS = "RECEIVE:INGREDIENTS";


export function fetchIngredients(delay = 1000) {
  return (dispatch, getState) => {
    console.log("state: ->>>>>>: ", getState())
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
