import { moduleName } from './constants'

export const getConfigData = (state, domain) => {
  return state[moduleName][domain]
}
