import { expect } from 'chai'
import reducer from '../index'
import * as actions from '../action-types'
import { merge } from '../actions'

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

})
