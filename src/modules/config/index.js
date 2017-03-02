import { generateReducer} from 'core/utils'
import { SET_CONFIG }  from './action-types'
export * from './constants'
export * from './actions'
export * from './selectors'

/**
 * Config generic module
 *
 * Keeps all needed external config by app domain
 * This module includes JSON fetching, request lifecycle handling
 * and config data storage
 *
 * See its test, actions and selectors for usage
*/

const actions = {
  [SET_CONFIG]: (state, { payload }) => {
    const {domain, data } = payload
    return {
      ...state,
      [domain]: data
    }
  }
}

export default generateReducer(actions, {})
