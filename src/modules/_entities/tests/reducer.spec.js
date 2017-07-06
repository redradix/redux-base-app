import reducer from '../index'
import * as actions from '../action-types'
import { merge, remove } from '../actions'

const state = {
  todos: {
    1: { id: 1, title: 'Do something', completed: true },
    2: { id: 2, title: 'Do something else' }
  },
  things: {
    1: { id: 1, name: 'Foo' },
    2: { id: 2, name: 'Bar' }
  }
}

describe('Reducer', function() {
  describe(`${actions.MERGE} action - Merge domains and entities into the state`, function() {
    it(`Returns the same state for empty ${actions.MERGE} actions`, function() {
      const action = merge()
      expect(() => reducer(state, action)).not.toThrow()
      const nextState = reducer(state, action)
      expect(nextState).toBe(state)
    })

    it('Merges all entities included in the action payload, leaving other entities unmodified', function() {
      const action = merge('todos', 2, { completed: true })
      const nextState = reducer(state, action)

      expect(nextState).not.toBe(state)

      expect(nextState.todos).not.toBe(state.todos)
      expect(nextState.things).toBe(state.things)

      expect(nextState.todos[1]).toBe(state.todos[1])
      expect(nextState.todos[2]).not.toBe(state.todos[2])
      expect(nextState.todos[2].completed).toBe(true)
    })

    it('Adds domains and entities not already present in the state', function() {
      const todo = { id: 3, title: 'Do nothing' }
      const action = merge({ todos: { 3: todo }, stuff: {} })
      const nextState = reducer(state, action)

      expect(state).not.toHaveProperty('stuff')
      expect(nextState).toHaveProperty('stuff')
      expect(nextState.stuff).toBeEmptyObject()
      expect(state).not.toHaveProperty('todos.3')
      expect(nextState).toHaveProperty('todos.3')
      expect(nextState.todos[3]).toBe(todo)
    })

    xit('Does not perform mutations on domains or entities unless necessary (help wanted!)', function() {
      let action = merge('todos', {})
      let nextState = reducer(state, action)

      expect(state.todos).toBe(nextState.todos)

      action = merge('todos', 1, {})
      nextState = reducer(state, action)

      expect(state.todos[1]).toBe(nextState.todos[1])
    })
  })

  describe(`${actions.CLEAR} action - Clear all entities' state`, function() {
    it('Returns the initial state', function() {
      const action = remove()
      const nextState = reducer(state, action)

      expect(nextState).toEqual({})
      expect(nextState).toEqual(reducer())
    })
  })

  describe(`${actions.REMOVE_DOMAINS} action - Remove entity dictionaries`, function() {
    it('Removes entity dictionaries of the domains included in the action payload', function() {
      const action = remove('todos')
      const nextState = reducer(state, action)

      expect(state).toHaveProperty('todos')
      expect(state).toHaveProperty('things')
      expect(nextState).not.toHaveProperty('todos')
      expect(nextState).toHaveProperty('things')
    })

    it('Domains not present in the state are ignored', function() {
      const action = remove('domain')
      expect(() => reducer(state, action)).not.toThrow()
      const nextState = reducer(state, action)
      expect(state).not.toHaveProperty('domain')
      expect(nextState).not.toHaveProperty('domain')
    })

    xit('Does not perform mutations on the state unless strictly necessary (help wanted!)', function() {
      const action = remove('domain')

      const nextState = reducer(state, action)
      expect(nextState).toBe(state)
    })
  })

  describe(`${actions.REMOVE_ENTITIES} action - Remove domains state`, function() {
    it('Removes all entities included in the action payload from the domain\'s entity dictionary', function() {
      const action = remove('todos', 1)
      const nextState = reducer(state, action)

      expect(state.todos).toHaveProperty('1')
      expect(state.todos).toHaveProperty('2')
      expect(nextState.todos).not.toHaveProperty('1')
      expect(nextState.todos).toHaveProperty('2')
    })

    it('Entities not present in the state are ignored', function() {
      const action = remove('todos', 3)
      expect(() => reducer(state, action)).not.toThrow()

      const nextState = reducer(state, action)
      expect(nextState).toEqual(state)
    })

    it('Empty entity dictionaries are added for domains not already present in the state', function() {
      const action = remove('domain', 1)
      const nextState = reducer(state, action)
      expect(nextState).toHaveProperty('domain')
      expect(nextState.domain).not.toHaveProperty('1')
    })

    xit('Does not perform mutations on the state unless strictly necessary (help wanted!)', function() {
      let action = remove('todos', 3)
      let nextState = reducer(state, action)
      expect(nextState).toBe(state)

      action = remove('domain', 1)
      nextState = reducer(state, action)
      expect(nextState).toBe(state)
    })
  })
})
