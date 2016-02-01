import fetch from 'isomorphic-fetch'
import { applyToken } from '../helpers'
import { fetchIngredients } from '../ingredients'

const MODULE_NAME = "base-app/notifications/"

export const CREATE_NOTIFICATIONS = MODULE_NAME.concat("NOTIFICATIONS:CREATE")

const THRESOLD = 5

export function initNotifications() {
  return (dispatch, getState) => {
    setInterval(() => {
      if (getState().auth.logged) {
        dispatch(fetchIngredients())
        .then(() => {
          const ingredients = getState().ingredients.list.reduce((acc, i) => {
            i.stock < THRESOLD ? acc.push(i) : acc
            return acc
          }, [])
          dispatch(createNotifications(ingredients))
        })
      }
    }, 1000)
  }
}

function createNotifications(notifications) {
  return {
    type: CREATE_NOTIFICATIONS,
    payload: notifications
  }
}
