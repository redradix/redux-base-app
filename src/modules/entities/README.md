# Entities module

**Work in progress**

* Selectors
  * [x] `get`
* Action creators:
  * [x] `merge`
  * [ ] `replace`
  * [ ] `update`
  * [x] `remove`
    * [ ] `remove(domain, predicate)`


## Terminology

* **domain** (`domain`): A _String_ referring to all entities of a same kind
* **entity** (`entity`): An _Object_ containing arbitrary properties
* **entity id** (`id`) A _Number_ or _String_ that unequivocally identifies an entity within a domain
* **entity dictionary** (`entityDictionary`): An _Object_ whose keys are entity ids and whose values are entities
* **domain dictionary** (`domainDictionary`): An _Object_ whose keys are domains and whose values are entity dictionaries

```js
const domain = 'todos'
const entity = { id: 1, title: 'Do something', completed: true }
const entityDictionary = { [entity.id]: entity }
const domainDictionary = { [domain]: entityDictionary }
```


## API

### Actions

| Action                     | Payload               | Result |
|----------------------------|-----------------------|--------|
| `entities/MERGE`           | `domainDictionary`    | Merges `domainDictionary` into the state, entity by entity
| `entities/REMOVE_DOMAINS`  | `...domains`          | Removes entity dictionaries corresponding to `...domains` from the state
| `entities/REMOVE_ENTITIES` | `domain` and `...ids` | Removes entities corresponding to `...ids` from `domain`'s entity dictionary'
| `entities/CLEAR`           |                       | Clears all state

### Action creators

#### `merge`

Merge domain dictionaries, entity dictionaries or individual entities into the state.

* Merges all entities included in the action payload, leaving other entities unmodified
* Adds domains and entities not already present in the state

##### `merge([domainDictionary])`

Merge a domain dictionary.

* If called with no arguments, returns an empty entities/MERGE action
* Returns a `entities/MERGE` action containing the domain dictionary

##### `merge(domain, entityDictionary)`

Merge an entity dictionary.

* Returns a `entities/MERGE` action containing the entity dictionary

##### `merge(domain, id, entity)`

Merge a single entity.

* Returns a entities/MERGE action containing the entity

Usage:

```js
import { merge } from 'modules/entities'

merge({ todos: { 1: { title: 'Foo' }, 2: { title: 'Bar' } } })

merge('todos', { 3: { title: 'Baz' }, 4: { title: 'Qux' } })

merge('todos', 1, { completed: true })
```

#### `remove`

Remove entire domains or entities from the state.

##### `remove([...domains])`

Remove entire domains.

* If called with no arguments, returns a `entities/CLEAR` action
* Returns a `entities/REMOVE_DOMAINS` action for the given domains
* Domains not present in the state are ignored

##### `remove(domain, ids)`

Remove entities.

* Returns a `entities/REMOVE_ENTITIES` action for the given entities
* Entities not present in the state are ignored
* Empty entity dictionaries are added for domains not already present in the state

Usage:

```js
import { remove } from 'modules/entities'

remove()                                  // all entities' state

remove('todos')                           // all todos
remove(['todos', 'users'])                // all todos and users

remove('todos', 1)                        // a single todo
remove('todos', [1, 2])                   // some todos
remove('todos', (todo) => todo.completed) // all completed todos
```

### Selectors

#### `get`

Retrieve domain dictionaries, entity dictionaries or individual entities from the state.

##### `get(state, [...domains])`

Retrieve domain dictionaries.

* If only passed the application state, returns the entire domain dictionary
* If passed an array of domains, returns a dictionary mapping them to their entity dictionaries
* Empty entity dictionaries are returned for domains not present in the state (this does not break strict equality)


##### `get(state, domain, [...ids|predicate])`

Retrieve entity dictionaries.

* If only passed a domain, returns its entity dictionary
* If passed an array of ids, returns a dictionary mapping them to the corresponding entities in the domain
* Ids not present in the domain will not be included in the resulting dictionary
* If passed a predicate function, returns a dictionary of all entities satisfying it
* An empty dictionary is returned if the domain is missing from the state

##### `get(state, domain, id)`

Retrieve individual entities.

* If passed a single id, returns the corresponding entity in the domain
* Undefined is returned if either the domain or the entity are not present in the state

Usage:

```js
import { get } from 'modules/entities'

get(state)                                    // all domains
get(state, ['todos', 'users'])                // some domains

get(state, 'todos')                           // all todos
get(state, 'todos', [1, 2])                   // some todos
get(state, 'todos', (todo) => todo.completed) // all completed todos

get(state, 'todos', 1)                        // a single todo
```


## Future work

* Use memoized selectors
* Add factory selectors. Usage (draft):

```js
import { getDomain, getEntity } from 'modules/entities'

const getTodos = getDomain('todos')
const getTodo = getEntity('todos', 1)

// ...

getTodos(state)
getTodo(state)
```

* Add `update` action creator. Usage:

```js
const completeTodo = (todo) => ({ ...todo, completed: true })

update('todos', completeTodo) // complete all todos

update('todos', 1, completeTodo) // complete a single todo
update('todos', [1, 2], completeTodo) // complete some todos
update('todos', (todo) => !todo.completed, completeTodo) // complete all todos not yet completed
```

* Add `replace` action creator (like `merge` but replacing, huh). Usage:

```js
replace({ todos: { 1: { title: 'Foo', completed: true }, 2: { title: 'Bar' } } })

replace('todos', { 3: { title: 'Baz' }, 4: { title: 'Qux' } })

replace('todos', 1, { title: 'Foo' })
```
