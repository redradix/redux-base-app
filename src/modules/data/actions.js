import * as actions from './action-types'

export const set = (key, value) => ({
  type: actions.SET,
  payload: { key, value }
})

export const clear = key => ({
  type: actions.CLEAR,
  payload: { key }
})
