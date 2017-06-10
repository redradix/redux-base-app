import { expect } from 'chai'
import { pick } from 'lodash'
import { moduleName } from '../constants'
import { get } from '../_selectors'

const state = {
  [moduleName]: {
    todos: {
      1: { id: 1, title: 'Do something', completed: true },
      2: { id: 2, title: 'Do something else' },
      3: { id: 3, title: 'Do nothing' }
    },
    things: {
      1: { id: 1, name: 'Foo' },
      2: { id: 2, name: 'Bar' }
    },
    stuff: {
      1: { id: 1, name: 'Baz' },
      2: { id: 2, name: 'Qux' }
    }
  }
}

describe('Selectors', function() {

  describe('get', function() {

    describe('get(state, [...schemas]) - Retrieve an object of entity dictionaries', function() {

      it('If only passed the application state, returns all entity dictionaries', function() {
        const result = get(state)
        expect(result).to.equal(state[moduleName])
      })

      it('If passed an array of schemas, returns an object of their entity dictionaries', function() {
        const result = get(state, ['todos', 'things'])
        expect(result).to.deep.equal(pick(state[moduleName], ['todos', 'things']))
      })

      it('Missing schemas are treated as they were empty', function() {
        let result = get(state, ['missing'])
        const missingState = { missing: {} }
        expect(result).to.deep.equal(missingState)
        result = get(state, ['todos', 'things', 'missing'])
        const newState = Object.assign(pick(state[moduleName], ['todos', 'things']), missingState)
        expect(result).to.deep.equal(newState)
      })

      it('If passed more than two arguments, the 2nd is enforced to be a string', function() {
        expect(() => get(state, ['todos'], 'extra argument')).to.throw()
      })

    })

    describe('get(state, schema, [...ids|predicate]) - Retrieve a dictionary of entities', function() {

      it('If only passed an schema, returns its entity dictionary', function() {
        const result = get(state, 'todos')
        expect(result).to.equal(state[moduleName].todos)
      })

      it('If the schema does not exist, returns an empty object (regardless of the remaining arguments)', function() {
        let result = get(state, 'missing')
        expect(result).to.deep.equal({})
        result = get(state, 'missing', [1, 2])
        expect(result).to.deep.equal({})
        result = get(state, 'missing', () => true)
        expect(result).to.deep.equal({})
      })

      it('If passed an array of ids, returns a dictionary of their corresponding entities\' bodies', function() {
        const result = get(state, 'todos', [1, 2])
        expect(result).to.deep.equal(pick(state[moduleName].todos, [1, 2]))
      })

      it('Ids not found in the schema will not be included in the resulting dictionary', function() {
        let result = get(state, 'todos', [0])
        expect(result).to.deep.equal({})
        result = get(state, 'todos', [0, 1, 2])
        expect(result).to.deep.equal(pick(state[moduleName].todos, [1, 2]))
      })

      it('If passed a predicate function, returns a dictionary with all entities that satisfy it', function() {
        const result = get(state, 'todos', (todo) => todo.completed)
        expect(result).to.deep.equal(pick(state[moduleName].todos, [1]))
      })

      it('If no entity satisfies the condition, returns an empty object', function() {
        const result = get(state, 'todos', () => false)
        expect(result).to.deep.equal({})
      })

    })

    describe('get(state, schema, id) - Retrieve an entity body', function() {

      it('If passed a single id, returns the corresponding entity\'s body', function() {
        const result = get(state, 'todos', 1)
        expect(result).to.equal(state[moduleName].todos[1])
      })

      it('If the schema does not exist, returns undefined', function() {
        const result = get(state, 'missing', 1)
        expect(result).to.equal(void 0)
      })

      it('If the id does not correspond to an entity, returns undefined', function() {
        const result = get(state, 'todos', 0)
        expect(result).to.equal(void 0)
      })

    })

  })

})
