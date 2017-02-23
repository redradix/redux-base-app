import { t } from 'core/i18n'

const isEmpty = value => value === undefined || value === null || value === ''
const join = (rules) => (value, data, key, form) => rules.map(rule => rule(value, data, key, form)).filter(error => !!error)[0 /* first error */ ]

export function samePassword(repeatedPasswordFieldName, value, values) {
  if (value !== values[repeatedPasswordFieldName]) {
    return t('validation:samePassword')
  }
  return undefined
}

export function email(value) {
  // Let's not start a debate on email regex. This is just for the base app!
  if (!isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return t('validation:email')
  }
  return undefined
}

export function required(value) {
  if (isEmpty(value)) {
    return t('validation:required')
  }
  return undefined
}

export function minLength(min) {
  return value => {
    if (!isEmpty(value) && value.length < min) {
      return `Must be at least ${min} characters`
    }
    return undefined
  }
}

export function maxLength(max) {
  return value => {
    if (!isEmpty(value) && value.length > max) {
      return `May not be more than ${max} characters`
    }
    return undefined
  }
}

export function integer(value) {
  if (!Number.isInteger(Number(value))) {
    return 'Must be an integer'
  }
  return undefined
}

export function oneOf(enumeration) {
  return value => {
    if (!~enumeration.indexOf(value)) {
      return `Must be one of the following: ${enumeration.join(', ')}`
    }
    return undefined
  }
}

export function match(field) {
  return (value, data) => {
    if (data) {
      if (value !== data[field]) {
        return 'Does not match'
      }
    }
    return undefined
  }
}

export function checkConfirmation(fieldName) {
  return (value, data) => {
    if (!value) return undefined
    const confirmationFieldName = `${fieldName}Confirmation`
    if (Object.keys(data).indexOf(confirmationFieldName) === -1) {
      return `${confirmationFieldName} not present`
    }
    if (data) {
      if (value !== data[confirmationFieldName]) {
        return 'Confirmation field does not match'
      }
    }
    return undefined
  }
}

export function strongPassword(regexp) {
  return value => {
    if (!(value && value.length > 0)) return undefined
    if (!value.match(regexp)) {
      return t('validation:strongPassword')
    }
    return undefined
  }
}

export function conditionalRequired(conditionalField, valuesWhenRequired, value, data, key, form) {
  // TODO: Remove this coupling
  if (!form.options.groups) return undefined
  const group = form.options.groups.find(g => g.value === data[conditionalField])
  if (group && !valuesWhenRequired.includes(group.label)) {
    return required(value)
  }
  return undefined
}

function validate(rules, values = {}, form) {
  return Object.keys(rules).reduce((acc, key) => {
    if (rules[key] && typeof rules[key] === 'object' && !Array.isArray(rules[key])) {
      Object.assign(acc, { [key]: validate(rules[key], values[key], form) })
    } else {
      const rule = join([].concat(rules[key]))
      const error = rule(values[key], values, key, form)
      if (error) Object.assign(acc, { [key]: error })
    }
    return acc
  }, {})
}

export const createValidator = rules => (values, form) => validate(rules, values, form)
