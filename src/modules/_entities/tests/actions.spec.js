import * as actions from '../action-types'
import { merge, remove } from '../actions'

const state = {
  todos: {
    1: { id: 1, title: 'Do something', completed: true },
    2: { id: 2, title: 'Do something else' },
    3: { id: 3, title: 'Do nothing' }
  },
  things: {
    1: { id: 1, name: 'Foo' },
    2: { id: 2, name: 'Bar' }
  }
}

describe('Action creators', function() {
  describe('merge - Merge domain dictionaries, entity dictionaries or individual entities into the state', function() {
    describe('merge([domainDictionary]) - Merge a domain dictionary', function() {
      it(`If called with no arguments, returns an empty ${actions.MERGE} action`, function() {
        const action = merge()
        expect(action.type).toBe(actions.MERGE)
        expect(action.payload).toBeEmptyObject()
      })

      it('If only passed one argument, it is expected to be a domain dictionary', function() {
        expect(() => merge({ domain: {} })).not.toThrow()
        expect(() => merge({})).not.toThrow() // NOTE: empty domain dictionary
        expect(() => merge('string')).toThrow()
        expect(() => merge(0)).toThrow()
        expect(() => merge([])).toThrow()
        expect(() => merge(void 0)).toThrow()
        expect(() => merge(null)).toThrow()
        expect(() => merge({ domain: 'string' })).toThrow()
        expect(() => merge({ domain: 0 })).toThrow()
        expect(() => merge({ domain: [] })).toThrow()
        expect(() => merge({ domain: void 0 })).toThrow()
        expect(() => merge({ domain: null })).toThrow()
      })

      it(`Returns a ${actions.MERGE} action containing the domain dictionary`, function() {
        const action = merge(state)
        expect(action.type).toBe(actions.MERGE)
        expect(action.payload).toBe(state)
      })
    })

    describe('merge(domain, entityDictionary) - Merge an entity dictionary', function() {
      it('If passed more than one argument, first is expected to be a domain', function() {
        expect(() => merge('string', 1, {})).not.toThrow()
        expect(() => merge(0, {})).toThrow()
        expect(() => merge([], 'string', {})).toThrow()
        expect(() => merge({}, {})).toThrow()
        expect(() => merge(void 0, 1, {})).toThrow()
        expect(() => merge(null, {})).toThrow()
      })

      it('If passed two arguments, second is expected to be an entity dictionary', function() {
        expect(() => merge('string', {})).not.toThrow()
        expect(() => merge('string', 'string')).toThrow()
        expect(() => merge('string', 0)).toThrow()
        expect(() => merge('string', [])).toThrow()
        expect(() => merge('string', void 0)).toThrow()
        expect(() => merge('string', null)).toThrow()
      })

      it(`Returns a ${actions.MERGE} action containing the entity dictionary`, function() {
        const action = merge('todos', state.todos)
        expect(action.type).toBe(actions.MERGE)
        expect(action).toHaveProperty('payload.todos')
        expect(action.payload.todos).toBe(state.todos)
      })
    })

    describe('merge(domain, entityId, entityBody) - Merge a single entity', function() {
      it('If passed more than two arguments, second is expected to be an entity id', function() {
        expect(() => merge('string', 'string', {})).not.toThrow()
        expect(() => merge('string', 1, {})).not.toThrow()
        expect(() => merge('string', {}, {})).toThrow()
        expect(() => merge('string', [], {})).toThrow()
        expect(() => merge('string', void 0, {})).toThrow()
        expect(() => merge('string', null, {})).toThrow()
      })

      it('If passed three arguments, third is expected to be an entity', function() {
        expect(() => merge('string', 1, {})).not.toThrow()
        expect(() => merge('string', 1, 'string')).toThrow()
        expect(() => merge('string', 1, 0)).toThrow()
        expect(() => merge('string', 1, [])).toThrow()
        expect(() => merge('string', 1, void 0)).toThrow()
        expect(() => merge('string', 1, null)).toThrow()
      })

      it(`Returns a ${actions.MERGE} action containing the entity`, function() {
        const action = merge('todos', 1, state.todos[1])
        expect(action.type).toBe(actions.MERGE)
        expect(action).toHaveProperty('payload.todos.1')
        expect(action.payload.todos[1]).toBe(state.todos[1])
      })
    })
  })

  describe('remove - Remove entire domains or entities from the state', function() {
    describe('remove([...domains]) - Remove entire domains', function() {
      it(`If called with no arguments, returns a ${actions.CLEAR} action`, function() {
        const action = remove()
        expect(action.type).toBe(actions.CLEAR)
        expect(action.payload).not.toBeDefined()
      })

      it('If only passed one argument, it is expected to be a domain or an array of them', function() {
        expect(() => remove('string')).not.toThrow()
        expect(() => remove([])).not.toThrow()
        expect(() => remove(0)).toThrow()
        expect(() => remove({})).toThrow()
        expect(() => remove(void 0)).toThrow()
        expect(() => remove(null)).toThrow()
      })

      it(`Returns a ${actions.REMOVE_DOMAINS} action for the given domains`, function() {
        let action = remove('todos')
        expect(action.type).toBe(actions.REMOVE_DOMAINS)
        expect(action.payload).toHaveLength(1)
        expect(action.payload).toContain('todos')

        action = remove(['todos', 'things'])
        expect(action.type).toBe(actions.REMOVE_DOMAINS)
        expect(action.payload).toHaveLength(2)
        expect(action.payload).toContain('todos')
        expect(action.payload).toContain('things')
      })
    })

    describe('remove(domain, ids) - Remove entities', function() {
      it('If passed two arguments, first is expected to be a domain', function() {
        expect(() => remove('string', 0)).not.toThrow()
        expect(() => remove([], 0)).toThrow()
        expect(() => remove(0, 0)).toThrow()
        expect(() => remove({}, 0)).toThrow()
        expect(() => remove(void 0, 0)).toThrow()
        expect(() => remove(null, 0)).toThrow()
      })

      it('If passed two arguments, second is expected to be an entity id or an array of them', function() {
        expect(() => remove('string', 1)).not.toThrow()
        expect(() => remove('string', 'string')).not.toThrow()
        expect(() => remove('string', [])).not.toThrow()
        expect(() => remove('string', {})).toThrow()
        expect(() => remove('string', void 0)).toThrow()
        expect(() => remove('string', null)).toThrow()
      })

      it(`Returns a ${actions.REMOVE_ENTITIES} action for the given entities`, function() {
        let action = remove('todos', 1)
        expect(action.type).toBe(actions.REMOVE_ENTITIES)
        expect(action.payload).toHaveProperty('domain', 'todos')
        expect(action.payload.entities).toHaveLength(1)
        expect(action.payload.entities).toContain(1)

        action = remove('todos', [1, 2])
        expect(action.type).toBe(actions.REMOVE_ENTITIES)
        expect(action.payload).toHaveProperty('domain', 'todos')
        expect(action.payload.entities).toHaveLength(2)
        expect(action.payload.entities).toContain(1)
        expect(action.payload.entities).toContain(2)
      })
    })
  })
})
