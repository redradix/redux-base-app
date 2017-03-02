import { moduleName } from './constants'

export const getCommState = (state, domain, defaultValue) => {
  return state[moduleName][domain] ? state[moduleName][domain].isReady : defaultValue
}
