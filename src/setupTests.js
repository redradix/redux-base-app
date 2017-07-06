import { isPlainObject, isEmpty } from 'lodash'

expect.extend({
  toBeEmptyObject(received) {
    const pass = isPlainObject(received) && isEmpty(received)
    return {
      pass,
      message: pass ? () => `expected ${received} not to be an empty object` :
                      () => `expected ${received} to be an empty object`
    }
  }
})
