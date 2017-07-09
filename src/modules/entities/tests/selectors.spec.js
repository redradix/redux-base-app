import { moduleName } from '../constants'
import { get } from '../selectors'

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
    }
  }
}

describe('Selectors', function() {
  describe('get - Retrieve domain dictionaries, entity dictionaries or individual entities from the state', function() {
    describe('get(state, [...domains]) - Retrieve domain dictionaries', function() {
      it('If only passed the application state, returns the entire domain dictionary', function() {
        const result = get(state)
        expect(result).toBe(state[moduleName])
      })

      it('If passed an array of domains, returns a dictionary mapping them to their entity dictionaries', function() {
        const result = get(state, ['todos', 'things'])
        expect(result).toHaveProperty('todos')
        expect(result).toHaveProperty('things')
        expect(result.todos).toBe(state[moduleName].todos)
        expect(result.things).toBe(state[moduleName].things)
      })

      it('Empty entity dictionaries are returned for domains not present in the state', function() {
        const result = get(state, ['todos', 'missing'])
        expect(result).toHaveProperty('todos')
        expect(result).toHaveProperty('missing')
        expect(result.todos).toBe(state[moduleName].todos)
        expect(result.missing).toBeEmptyObject()
      })
    })

    describe('get(state, domain, [...ids|predicate]) - Retrieve entity dictionaries', function() {
      it('If only passed a domain, returns its entity dictionary', function() {
        const entityDictionary = get(state, 'todos')
        expect(entityDictionary).toBe(state[moduleName].todos)
      })

      it('If passed more than two arguments, second is enforced to be a single domain', function() {
        expect(() => get(state, ['todos'], undefined)).toThrow()
      })

      it('If passed an array of ids, returns a dictionary mapping them to the corresponding entities in the domain', function() {
        const entityDictionary = get(state, 'todos', [1, 2])
        expect(entityDictionary).toHaveProperty('1')
        expect(entityDictionary).toHaveProperty('2')
        expect(entityDictionary[1]).toBe(state[moduleName].todos[1])
        expect(entityDictionary[2]).toBe(state[moduleName].todos[2])
      })

      it('Ids not present in the domain will not be included in the resulting dictionary', function() {
        const entityDictionary = get(state, 'todos', [1, 0])
        expect(entityDictionary).toHaveProperty('1')
        expect(entityDictionary).not.toHaveProperty('0')
      })

      it('If passed a predicate function, returns a dictionary of all entities satisfying it', function() {
        let entityDictionary = get(state, 'todos', (todo) => !todo.completed)
        expect(entityDictionary).toHaveProperty('2')
        expect(entityDictionary).toHaveProperty('3')
        expect(entityDictionary[2]).toBe(state[moduleName].todos[2])
        expect(entityDictionary[3]).toBe(state[moduleName].todos[3])

        entityDictionary = get(state, 'todos', () => false)
        expect(entityDictionary).toBeEmptyObject()
      })

      it('An empty dictionary is returned if the domain is missing from the state', function() {
        let entityDictionary = get(state, 'missing')
        expect(entityDictionary).toBeEmptyObject()

        entityDictionary = get(state, 'missing', [1, 2])
        expect(entityDictionary).toBeEmptyObject()

        entityDictionary = get(state, 'missing', () => true)
        expect(entityDictionary).toBeEmptyObject()
      })
    })

    describe('get(state, domain, id) - Retrieve individual entities', function() {
      it('If passed a single id, returns the corresponding entity in the domain', function() {
        const entity = get(state, 'todos', 1)
        expect(entity).toBe(state[moduleName].todos[1])
      })

      it('Undefined is returned if either the domain or the entity are not present in the state', function() {
        let entity = get(state, 'missing', 1)
        expect(entity).toBe(undefined)

        entity = get(state, 'todos', 0)
        expect(entity).toBe(undefined)
      })
    })
  })
})
