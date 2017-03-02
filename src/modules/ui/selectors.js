import { pick } from 'lodash'
import { moduleName } from './constants'

export const getUIElements = (state, domain, keys) => state[moduleName][domain] && pick(state[moduleName][domain], keys)
export const getUIElement = (state, domain, key, defaultValue) => (state[moduleName][domain] && state[moduleName][domain][key]) || defaultValue
export const getUIDomain = (state, domain) => state[moduleName][domain] || {}
