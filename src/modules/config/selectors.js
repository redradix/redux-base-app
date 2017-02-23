let PATH
export const init = p => {
  PATH = p
}

export const getConfigData = (state, domain) => {
  return state[PATH][domain]
}
