import { createSelector } from "reselect"

function find(list, routing) {
  const id = parseInt(routing.path.split("/")[2])
  return list.find((e) => {return e.id == id})
}

const routeSelector = state => state.routing
const listSelector = state => state.dishes.list

export const dishSelector = createSelector(
  routeSelector,
  listSelector,
  (routing, list) => {
    return {
      dish: find(list, routing)
    }  
  }
)

const ingredientListSelector = (state, props) => props.ingredients
const ingredientsSelector = (state) => state.ingredients.list

function findCostOfAllIngredients(ingredients, totalIngredients) {
  return 43  
}

export const escandalloSelector = createSelector(
  ingredientListSelector,
  ingredientsSelector,
  (ingredients, totalIngredients ) => {
    return {
      escandallo: findCostOfAllIngredients(ingredients, totalIngredients)  
    }  
  }
)

export const totalSelector = createSelector(
  [dishSelector, escandalloSelector],
  (dish, escandallo) => {
    return {
      dish: dish.dish,
      escandallo: escandallo.escandallo
    }  
  }
)

