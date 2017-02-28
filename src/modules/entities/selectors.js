let PATH
export const init = (p) => {
  PATH = p
}

export const getEntity = (state, domain, id, defaultValue) => (state[PATH][domain] && state[PATH][domain][id]) || defaultValue
export const getEntities = (state, domain) => state[PATH][domain] || {}
