import { getIn } from 'modules/ui'
import { moduleName } from './constants'

export const getAction = (state, name) => getIn(state, [moduleName, name])

export const needsConfirmation = (state, name) =>
  !!getAction(state, name)
