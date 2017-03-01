import { set } from 'modules/data'
import { get as getEndpoint } from 'core/api'
export const DOMAIN = 'initialData'
export const ENDPOINT = 'api/data/initial'

// NOTE: If it does not have id, it is not an entity
export function get(dispatch) {
  return getEndpoint(ENDPOINT)
  .then(entity => dispatch(set(DOMAIN, entity)))
}

export default {
  get
}
