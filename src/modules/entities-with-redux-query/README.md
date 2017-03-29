# Entities module with `redux-query`

## Motivation

> A library for querying and managing network state in React/Redux applications

[`redux-query`](https://github.com/amplitude/redux-query/) is a great library aimed at querying and managing network state. However, in its current version (1.3.X at the time of this writing), it comes with some caveats.

The main problem is that `redux-query` comes with a built-in entities reducer which cannot be replaced in an obvious way. Good thing is, the queries reducer is isolated from the entities reducer, which makes it possible to work around this problem. However, there are some trade-offs in doing so.

Here at redradix, we love our entities module, so we are building this as an enhancement over it which can work with `redux-query`. We will be documenting our development of this module as some of the decisions taken are not plainly obvious.

## Step 1 - Composing our entities reducer with `redux-query`'s query reducer

```js
/* modules/entities-with-redux-query/reducer.js */
import entitiesReducer from 'modules/entities'
export default function entitiesReducerWithReduxQuery(state, action) {
  return {
    ...entitiesReducer(state, action),
    queries: queriesReducer(state.queries, action)
  }
}

/* modules/entities-with-redux-query/selectors.js */
import { getEntities } from 'modules/entities'
export { getEntities } from 'modules/entities'
export const getQueries = (state) => getEntities(state, 'queries')
```

Updating our root reducer to use the new entities reducer is as simple as changing the import route:

```diff
diff --git a/src/modules/reducer.js b/src/modules/reducer.js
--- a/src/modules/reducer.js
+++ b/src/modules/reducer.js
@@ -2 +2 @@ import { combineReducers } from 'redux'
-import entitiesReducer from 'modules/entities'
+import entitiesReducer from 'modules/entities-with-redux-query'
```
