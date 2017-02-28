import * as actions from './actions'
export * from './action-types'

// TODO: Add type checks on try catch blocks

export function setDomainFilters(domain, elements) {
  return {
    type: `${actions.MERGE}*${domain}`,
    payload: {
      elements
    },
    meta: {
      domain
    }
  }
}

export function setDomainFilter(domain, key, value) {
  return setDomainFilters(domain, {[key]: value})
}

export function toggleDomainFilter(domain, key, value) {
  return {
    type: `${actions.TOGGLE}*${domain}`,
    payload: {
      key,
      value
    },
    meta: {
      domain
    }
  }
}

export function deleteDomainFilters(domain, keys) {
  return {
    type: `${actions.DELETE}*${domain}`,
    payload: {
      keys
    },
    meta: {
      domain
    }
  }
}

export function deleteDomainFilter(domain, key) {
  return deleteDomainFilters(domain, {key})
}


export function clearDomain(domain) {
  return {
    type: `${actions.CLEAR_DOMAIN}*${domain}`,
    meta: {
      domain
    }
  }
}

export function resetFilters() {
  return {
    type: actions.RESET_FILTERS
  }
}

export function deleteDomainFiltersInKey(domain, key, elements) {
  return {
    type: actions.DELETE_IN_KEY,
    payload: {
      key,
      elements
    }
  }
}

export function mergeDomainFiltersInKey(domain, key, elements) {
  return {
    type: actions.MERGE_IN_KEY,
    payload: {
      key,
      elements
    }
  }
}

// TODO: Accept more than one key
export function toggleDomainFiltersInKey(domain, key, elements) {
  return {
    type: actions.TOGGLE_IN_KEY,
    payload: {
      key,
      elements
    },
    meta: {
      domain
    }
  }
}
