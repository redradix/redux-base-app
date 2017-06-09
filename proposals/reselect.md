# [RFC] Pass exceeding arguments to the result function

Some times I find myself writing selectors like this:

```js
export const getEntities = (state, domain) => state[domain]

export const getEntity = createSelector(
  getEntities,
  (state, domain, id) => id, // keep 3rd argument, id
  (entities, id) => entities[id]
)
```

In this example, `getEntity` expects three arguments. An inline input selector is used to avoid its third argument to be disregarded.

The thing is, `getEntities(state, domain)` has a length of two, so it could be inferred by the selector that the third argument is not used.

What I'm proposing is that such arguments are passed directly to the result function, removing the need for input selectors such as the one with the comment. Something like this ([inside `createSelectorCreator`](https://github.com/reactjs/reselect/blob/master/src/index.js#L68-L79)):

```js
const selector = defaultMemoize(function (...args) {
  const params = []
  const length = dependencies.length
  let lastUsed = 0

  for (let i = 0; i < length; i++) {
    if (dependencies[i] > lastUsed) lastUsed = dependencies[i]
    params.push(dependencies[i].apply(null, args.slice(0, dependencies[i].length)))
  }

  params.concat(args.slice(lastUsed))
  return memoizedResultFunc.apply(null, params)
})
```

Some issues (like #225 and possibly others) could benefit from such implementation.

I know my code sample would not work when either using memoized selectors as input selectors (as these will always have a length of 2), or using input selectors with default values or rest arguments (as their lengths may not match the expected number of parameters)

https://engineering.semantics3.com/2016/08/04/function-length-javascript/
