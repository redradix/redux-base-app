
export const requiredIfCondition = (boolPropName, propTypeFn) => (props, ...rest) =>
  (props[boolPropName] ? propTypeFn.isRequired : propTypeFn)(props, ...rest)
