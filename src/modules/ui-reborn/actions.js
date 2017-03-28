import * as actions from './actions'
export * from './action-types'

export const set = (path, value) =>
  ({ type: actions.SET, payload: { path, value } })
  // ({ type: actions.SETIN, payload: { [path], value } })

export const setIn = (path, value) =>
  ({ type: actions.SETIN, payload: { path, value } })

export const del = (path, value) =>
  ({ type: actions.DELETE, payload: { path, value } })
  // ({ type: actions.DELETEIN, payload: { [path], value } })

export const deleteIn = (path, value) =>
  ({ type: actions.DELETEIN, payload: { path, value } })
