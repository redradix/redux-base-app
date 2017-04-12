import { setIn, deleteIn } from 'modules/ui'
import { moduleName } from './constants'

export const triggerConfirmation = (name, action) =>
  setIn([moduleName, name], action)

export const confirm = name => deleteIn([moduleName, name])

export const cancel = name => deleteIn([moduleName, name])
