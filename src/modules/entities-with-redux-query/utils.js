// REVIEW: Remove `fillWithParams` after redux-query@1.5.0 is released, and
// pass parameters as request body

const fillWithParams = (endpoint = '', props = { params: {} }) =>
  endpoint.replace(/:(\w+)/g, (_, param) => props[param])

export const queryBuilder = (endpoint, params, fn) => ({
  url: `${fillWithParams(endpoint, params)}`,
  // body: params,
  transform: fn,
  update: {} // Disregard redux-query update methods
})
