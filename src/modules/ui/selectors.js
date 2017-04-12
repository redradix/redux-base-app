import { moduleName } from './constants'

export const get = (state, path) => state[moduleName].get(path)

export const getIn = (state, path) => state[moduleName].getIn(path)
