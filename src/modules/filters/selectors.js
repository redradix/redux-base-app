import {pick} from 'lodash'
let PATH
export const init = (p) => {
  PATH = p
}

export const getFilterElements = (state, domain, keys) => state[PATH][domain] && pick(state[PATH][domain], keys)
export const getFilterElement = (state, domain, key, defaultValue) => (state[PATH][domain] && state[PATH][domain][key]) || defaultValue
export const getFiltersDomain = (state, domain) => state[PATH][domain] || {}
