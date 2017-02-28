import { moduleName } from './action-types'

export const get = (state, key) => state[moduleName][key]
