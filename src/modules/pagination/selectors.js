let PATH
export const init = (p) => {
  PATH = p
}

export const getDomainPagination = (state, domain) => state[PATH][domain] || {}
