import { mergeEntity } from 'modules/entities'
import { get as getEndpoint } from 'core/api'
import {THEONE} from 'core/utils'
export const DOMAIN = 'initialData'
export const ENDPOINT = 'api/data/initial'

// NOTE: If it does not have id, it is not an entity
export function get(dispatch) {
  return getEndpoint(ENDPOINT)
  .then(entity => dispatch(mergeEntity(DOMAIN, {[THEONE]: entity})))
}

export default {
  get
}
