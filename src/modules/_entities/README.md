# [RFC] Entities module

This is a _work in progress_ for the API definition of the entities module.

## API

### Selectors

#### `get(state, [schema, [id]])`

Retrieve entities from the application state. This selector accepts up to two arguments besides the entire state:

* `[schema]` (_String_ or _Array_):
  The schema (or schemas) to be retrieved. If not provided, an schema dictionary will be returned.

* `[id]` (_String_ or _Array_ or _Function_):
  The id (or a list of ids) of entities to be retrieved, or a function used to test whether or not each entity should be included. If not provided, the entire schema (entity dictionary) will be returned.

Usage:

```js
get(state)                                    // all entities

get(state, 'todos')                           // all todos
get(state, ['todos', 'users'])                // all todos and users

get(state, 'todos', 1)                        // a single todo
get(state, 'todos', [1, 2])                   // some todos
get(state, 'todos', (todo) => todo.completed) // all completed todos
```

### Action creators

#### `merge(schema, [id, [body]])`

Merges one or more entities, updating existing ones or creating new ones when necessary. This method accepts up to three arguments:

* `schema` (_Object_ or _String_):
  If an object is passed, each property in it is expected to be an entity dictionary. If a string is passed, it will be used as the schema upon which the entities are to be merged.

* `[id]` (_Object_ or _String_):
  If an object is passed, each property in it is expected to be an entity body. If a string is passed, it will be used as the id of the entity to be merged. If this argument is passed, a string must be provided as `schema`.

* `[body]` (_Object_):
  The entity body to be merged. If this argument is passed, a string must be provided as `id`.

Usage:

```js
merge({ todos: { 1: { title: 'Foo' }, 2: { title: 'Bar' } } })

merge('todos', { 3: { title: 'Baz' }, 4: { title: 'Qux' } })

merge('todos', 1, { completed: true })
```

#### `replace(schema, [id, [body]])`

Merges one or more entities, creating new ones when necessary. This method accepts up to three arguments:

* `schema` (_Object_ or _String_):
  If an object is passed, each property in it is expected to be an entity dictionary. These will replace the current ones entirely.
  If a string is passed, it will be used as the schema upon which the entities are to be replaced.

* `[id]` (_Object_ or _String_):
  If an object is passed, each property in it is expected to be an entity body. These will replace the current ones entirely. If a string is passed, it will be used as the id of the entity to be merged. If this argument is passed, a string must be provided as `schema`.

* `[body]` (_Object_):
  The entity body to be replaced. If this argument is passed, a string must be provided as `id`.

Usage:

```js
replace({ todos: { 1: { title: 'Foo', completed: true }, 2: { title: 'Bar' } } })

replace('todos', { 3: { title: 'Baz' }, 4: { title: 'Qux' } })

replace('todos', 1, { title: 'Foo' })
```

#### `update(schema, [id], updater)`

Update one or more entities or schemas. This method accepts up to two arguments:

* `schema` (_String_):
  The schema whose entries are to be updated.

* `[id]` (_String_ or _Array_ or _Function_):
  The id or ids to be deleted.

* `updater` (_Function_):
  The updater function. It will be passed each selected entity and it must return its updated version.

Usage:

```js
const completeTodo = (todo) => ({ ...todo, completed: true })

update('todos', completeTodo) // complete all todos

update('todos', 1, completeTodo) // complete a single todo
update('todos', [1, 2], completeTodo) // complete some todos
update('todos', (todo) => !todo.completed, completeTodo) // complete all todos not yet completed
```

#### `remove([schema, [id]])`

Remove one or more entities or schemas. This method accepts up to two arguments:

* `[schema]` (_String_ or _Array_):
  The schema (or schemas) to be deleted.

* `[id]` (_String_ or _Array_ or _Function_):
  The id or ids to be deleted. If this argument is passed, a string must be provided as `schema`.

Usage:

```js
remove()                                  // all entities

remove('todos')                           // all todos
remove(['todos', 'users'])                // all todos and users

remove('todos', 1)                        // a single todo
remove('todos', [1, 2])                   // some todos
remove('todos', (todo) => todo.completed) // all completed todos
```
