import * as actions from './actions'
export * from './action-types'

// TODO: Add type checks on try catch blocks

export function setUIElements(domain, elements) {
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

export function setUIElement(domain, key, value) {
  return setUIElements(domain, {[key]: value})
}

export function toggleUIElement(domain, key, value) {
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

export function deleteUIElements(domain, keys) {
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

export function deleteUIElement(domain, key) {
  return deleteUIElements(domain, {key})
}

export function clearDomain(domain) {
  return {
    type: `${actions.CLEAR_DOMAIN}*${domain}`,
    meta: {
      domain
    }
  }
}

export function resetUI() {
  return {
    type: actions.RESET_UI
  }
}

export function deleteUIElementsInKey(domain, key, elements) {
  return {
    type: actions.DELETE_ELEMENTS_IN_KEY,
    payload: {
      key,
      elements
    }
  }
}

export function mergeUIElementsInKey(domain, key, elements) {
  return {
    type: actions.MERGE_ELEMENTS_IN_KEY,
    payload: {
      key,
      elements
    }
  }
}

// TODO Add deleteUIElementsINArray
// TODO: Accept more than one key
export function toggleUIElementInKey(domain, key, elements) {
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
