import { expect } from 'chai'
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

  describe(`${actions.MERGE} action -- Merges entities into the state`, function() {

    it(`Returns the same state (===) for empty ${actions.MERGE} actions`, function() {
      const action = merge()
      expect(() => reducer(state, action)).to.not.throw()
      const newState = reducer(state, action)
      expect(newState).to.equal(state)
    })

    it('Merges all entities included in the action payload, leaving other entities and schemas unmodified', function() {
      const action = merge('todos', 2, { completed: true })
      const newState = reducer(state, action)

      expect(newState).to.not.equal(state)

      expect(newState.todos).to.not.equal(state.todos)
      expect(newState.things).to.equal(state.things)

      expect(newState.todos[1]).to.equal(state.todos[1])
      expect(newState.todos[2]).to.not.equal(state.todos[2])
      expect(newState.todos[2].completed).to.be.true
    })

    it('Creates schemas and entities if they did not exist in the previous state', function() {
      const todo = { id: 3, title: 'Do nothing' }
      // const action = merge('todos', 3, todo)
      const action = merge({ todos: { 3: todo }, stuff: {} })
      const newState = reducer(state, action)

      expect(state.stuff).to.be.undefined
      expect(newState).to.have.a.property('stuff')
      expect(state.todos[3]).to.be.undefined
      expect(newState.todos).to.have.a.property(3)
      expect(newState.todos[3]).to.equal(todo)
    })

    xit('Does not perform mutations on schemas or entities unless necessary (help wanted!)', function() {
      let action = merge('todos', {})
      let newState = reducer(state, action)

      expect(state.todos).to.equal(newState.todos)

      action = merge('todos', 1, {})
      newState = reducer(state, action)

      expect(state.todos[1]).to.equal(newState.todos[1])
    })

  })

  describe(`${actions.CLEAR} action -- Clear all entities' state`, function() {

    it('Returns entities\' initial state', function() {
      const action = remove()
      const newState = reducer(state, action)

      expect(newState).to.deep.equal({})
      expect(newState).to.deep.equal(reducer())
    })

  })

  describe(`${actions.REMOVE_SCHEMAS} action -- Remove schemas state`, function() {

    it('Removes schemas from the state', function() {
      const action = remove('todos')
      const newState = reducer(state, action)

      expect(state).to.have.a.property('todos')
      expect(state).to.have.a.property('things')
      expect(newState).to.not.have.a.property('todos')
      expect(newState).to.have.a.property('things')
    })

    it('Ignores missing schemas', function() {
      const action = remove('schema')
      expect(() => reducer(state, action)).to.not.throw()
    })

    xit('Does not perform mutations on the state unless strictly necessary (help wanted!)', function() {
      const action = remove('schema')

      const newState = reducer(state, action)
      expect(newState).to.equal(state)
    })

  })

  describe(`${actions.REMOVE_ENTITIES} action -- Remove schemas state`, function() {

    it('Removes entities from the state', function() {
      const action = remove('todos', 1)
      const newState = reducer(state, action)

      expect(state.todos).to.have.a.property(1)
      expect(state.todos).to.have.a.property(2)
      expect(newState.todos).to.not.have.a.property(1)
      expect(newState.todos).to.have.a.property(2)
    })

    it('Ignores missing entities', function() {
      const action = remove('todos', 3)
      expect(() => reducer(state, action)).to.not.throw()

      const newState = reducer(state, action)
      expect(newState).to.deep.equal(state)
    })

    xit('Does not perform mutations on the state unless strictly necessary (help wanted!)', function() {
      const action = remove('todos', 3)
      const newState = reducer(state, action)
      expect(newState).to.equal(state)
      action = remove('schema', 1)
      newState = reducer(state, action)
      expect(newState).to.equal(state)
    })

    it('Missing schemas are added empty', function() {
      const action = remove('schema', 1)
      const newState = reducer(state, action)
      expect(newState).to.have.a.property('schema')
      expect(newState.schema).to.not.have.a.property(1)
    })

  })

})
