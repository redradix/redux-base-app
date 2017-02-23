import UaParser from 'ua-parser-js'
import {omitBy, isNil, mapValues} from 'lodash'

const userAgent = new UaParser().getResult()

// Used as id for entities with no id where there is only one entity
export const THEONE = 'theOne'

// All modules use this generator to get its reducer function
export function generateReducer(ACTIONS, initialState = {}) {
  return (state = initialState, action) => {
    const type = action.type ? action.type.split('*')[0] : undefined
    if (ACTIONS[type]) {
      return ACTIONS[type](state, action)
    }
    return state
  }
}

export function sanitizeHTML(html) {
  return {__html: html}
}

export function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export function pluralize(s) {
  return s + 's'
}

export function getIndice(id, collection) {
  return collection.reduce((acc, e, index) => {
    return e.id === id ? index : acc
  }, undefined)
}

export function findById(id, collection) {
  return collection.find((e) => e.id === id) || {}
}

export function isiOSMobile() {
  return userAgent.device.type === 'tablet' && userAgent.device.type === 'mobile' && userAgent.os.name === 'iOS'
}

export function getScreenSize() {
  const width = window.innerWidth
  switch (true) {
  case (width < 760):
    return 'mobile'
  case (width < 1025):
    return 'laptop'
  case (width < 1200):
    return 'desktop'
  default:
    return 'wide-desktop'
  }
}

export function getDateFormat() {
  // TODO: Improve when more markets available
  return 'DD/MM/YYYY'
}

export function hasLocalStorage() {
  // Safari, in Private Browsing Mode, looks like it supports localStorage but all calls to setItem
  // throw QuotaExceededError. We're going to detect this and just silently drop any calls to setItem
  // to avoid the entire page breaking, without having to do a check at each usage of Storage.
  if (typeof localStorage === 'object') {
    try {
      localStorage.setItem('localStorage', 1)
      localStorage.removeItem('localStorage')
      return true
    } catch (e) {
      Storage.prototype._setItem = Storage.prototype.setItem
      Storage.prototype.setItem = () => {}
      return false
    }
  }
  return false
}

export const promisify = func => (...args) => new Promise((resolve, reject) => func(...args, (err, result) => err ? reject(err) : resolve(result)))

export const cleanFalseValues = (obj) => omitBy(obj, value => value === false)
export const snakeToCamel = s => s.replace(/_\w/g, m => m[1].toUpperCase())
export const camelToSnake = s => s.replace(/([A-Z])/g, m => `_${m.toLowerCase()}`).replace(/^_/, '')

// NOTE: Extracted from jQuery (https://github.com/jquery/jquery/blob/bf3a43eff8682b59cec785be6003753fa4b93706/src/offset.js#L99-L106)
export function offset(elem) {
  const rect = elem.getBoundingClientRect()
  const doc = elem.ownerDocument
  const docElem = doc.documentElement
  const win = doc.defaultView

  return {
    top: rect.top + win.pageYOffset - docElem.clientTop,
    left: rect.left + win.pageXOffset - docElem.clientLeft
  }
}

export const convertFromUrlParamToHumanReadable = (obj) => {
  return mapValues(omitBy(obj, isNil), f => {
    if (f === f.toUpperCase()) return f
    return f.replace(/([A-Z]|&)/g, ' $1').trim()
  })
}
