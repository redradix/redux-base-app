import * as actions from './action-types'
import { omit, merge } from 'lodash'
export * from './actions'
export * from './selectors'
import { generateReducer } from 'core/utils'

const ACTIONS = {
  // Merge all elements on the requested domain
  [actions.MERGE]: (state, {meta: {domain}, payload: {elements}}) => ({...state, [domain]: merge({}, state[domain], elements)}),
  // Toggle all elements on the requested domain. If already exists, it deletes the element
  [actions.TOGGLE]: (state, {meta: {domain}, payload: {key, value = true}}) => {
    return (state[domain] || {}).hasOwnProperty(key) ?
      {...state, [domain]: omit((state[domain] || {}), key)} :
      {...state, [domain]: merge({}, state[domain], {[key]: value})}
  },
  // Deletes all elements on the requested key of the domain. If already exists, it deletes the element. Key is an object
  [actions.DELETE]: (state, {meta: {domain}, payload: {keys}}) => ({...state, [domain]: omit(state[domain], keys)}),
  // Should restore to the initial state? there is no initial state know...
  [actions.CLEAR_DOMAIN]: (state, {meta: {domain}}) => ({...state, [domain]: undefined}),
  [actions.RESET_UI]: () => ({})
  /* [actions.DELETE_ELEMENTS_IN_KEY]: (state, {meta: {domain}, payload: {key, elements}}) => {
    const nonEmptyDomain = (state.domain || {})
    const newElements = omit(nonEmptyDomain[key], elements)
    return {...state, [domain]: newElements}
  },
  [actions.MERGE_ELEMENTS_IN_KEY]: (state, {meta: {domain}, payload: {key, elements}}) => ({...state, [domain]: merge({}, (state[domain] || {})[key], elements)}),
  [actions.TOGGLE_IN_KEY]: (state, {meta: {domain}, payload: {key, elements}}) => {
    const newElements = omit(elements, (state.domain[key] || {}))
    return {...state, [domain]: newElements}
  }
  */

}

export default generateReducer(ACTIONS)
