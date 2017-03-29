import { PropTypes } from 'react'

export const storeShape = PropTypes.shape({
  subscribe: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  getState: PropTypes.func.isRequired
})

export const requiredIfCondition = (boolPropName, propTypeFn) => (props, ...rest) =>
  (props[boolPropName] ? propTypeFn.isRequired : propTypeFn)(props, ...rest)
