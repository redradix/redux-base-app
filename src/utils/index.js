
export function toKebabCase(str) {
  return str && str.toLowerCase().replace(/[ _]/g, '-')
}

export function findAll(arr, p) {
  return arr.reduce((acc, e) => (
    p(e) ? acc.concat(e) : acc
  ), [])
}

export function findAllIndexes(arr, p) {
  return arr.reduce((acc, e, i) => (
    p(e) ? acc.concat(i) : acc
  ), [])
}
