import { moduleName } from './constants'

export const get = (state, key) => state[moduleName][key]
