const meta = { batch: true }
const isBatch = (action) => action && action.meta && action.meta.batch

/**
 *
 */
export const batchEnhancer = (reducer) => (state, action) => isBatch(action) ?
   action.payload.reduce(reducer, state) :
   reducer(state, action)

/**
 * Create a batch of actions
 * @param {string} type - Type of the action
 * @param {...object|array} actions - Actions of which the batch consists
 * @return {object} Action representing the batch
 */
export const batch = (type, ...actions) =>
  ({ type, meta, payload: actions.length === 1 ? actions[0] : actions })
