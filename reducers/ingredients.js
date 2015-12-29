import { ADD_INGREDIENT, RECEIVE_INGREDIENTS, REQUEST_INGREDIENTS, EDIT_INGREDIENT, REMOVE_INGREDIENT } from '../actions/ingredients'

function ingredientList(state=[], action) {
  switch (action.type) {
    case RECEIVE_INGREDIENTS:
      return action.payload.list 
    case EDIT_INGREDIENT:
      return state.map(ingredient =>
        ingredient.id == action.payload.id ?
          Object.assign({}, ingredient, action.payload) : 
          ingredient
      )
    case ADD_INGREDIENT:
      return [
        {
          ...action.payload,
          id: state.reduce((maxId, ingredient) => Math.max(ingredient.id, maxId), 0) + 1
        },
        ...state
      ]
    case REMOVE_INGREDIENT:
      return state.filter(ingredient =>
        ingredient.id !== action.payload.id
      )    
    default:
      return state
  }
}

// Reducers calculate a new state given the previous state and an action. They must be pure functions that return the exact same output for given inputs. They should also be free of side-effects. 
export default function (state = {
    isFetching: false,
    list: []
  }, action) {
  switch (action.type) {
    case EDIT_INGREDIENT:
    case REMOVE_INGREDIENT:
    case ADD_INGREDIENT:
      return Object.assign({}, state, {
        list: ingredientList(state.list, action)
      })
    case REQUEST_INGREDIENTS:
      return Object.assign({}, state, {
        isFetching: true 
      })
    case RECEIVE_INGREDIENTS:
      return Object.assign({}, state, {
        isFetching: false,
        list: ingredientList(state.list, action)
      })
    default:
      return state
  }
}
