# Entities module with `redux-query`

## Motivation

> A library for querying and managing network state in React/Redux applications

[`redux-query`](https://github.com/amplitude/redux-query/) is a great library aimed at querying and managing network state. However, in its current version (1.3.X at the time of this writing), it comes with some caveats.

The main problem is that `redux-query` comes with a built-in entities reducer which cannot be replaced in an obvious way. Good thing is, the queries reducer is isolated from the entities reducer, which makes it possible to work around this problem. However, there are some trade-offs in doing so.

Here at redradix, we love our entities module, so we are building this as an enhancement over it which can work with `redux-query`. We will be documenting our development of this module as some of the decisions taken are not plainly obvious.

## Appendix A - Using `fetch` to perform network requests

`redux-query` comes by default with a [SuperAgent](https://github.com/visionmedia/superagent) adapter, whereas this application was using [the Fetch standard](https://fetch.spec.whatwg.org/)<sup>1</sup> to handle network requests.

At the time of this writing, the latter does not support network request abortion yet. Discussion can be found in issues [#27](https://github.com/whatwg/fetch/issues/27) and [#447](https://github.com/whatwg/fetch/issues/447). However, our current mocks rely on this, so I took some time to implement a new adapter for `redux-query` just for the fun of it.

<sup>1</sup> We actually use the [matthew-andrews/isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch), which is built on top of [github/fetch](https://github.com/github/fetch/) polyfill, which implements a subset of the standard.

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

With this, we can also add `redux-query`'s middleware to our store:

```js
/* configure-store.js */
import { queryMiddleware } from 'redux-query'
import { getQueries, getEntities } from 'modules/entities-with-redux-query'
const store = createStore(
    reducer,
    applyMiddleware(queryMiddleware(getQueries, getEntities))
)
```
