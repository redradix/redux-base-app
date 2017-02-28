import { pick } from 'lodash'
let PATH
export const init = (p) => {
  PATH = p
}

export const getUIElements = (state, domain, keys) => state[PATH][domain] && pick(state[PATH][domain], keys)
export const getUIElement = (state, domain, key, defaultValue) => (state[PATH][domain] && state[PATH][domain][key]) || defaultValue
export const getUIDomain = (state, domain) => state[PATH][domain] || {}
