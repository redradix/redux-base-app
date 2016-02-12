# ReduxBaseApp

## Project commands

* `npm i` to download and install all dependencies.
* `npm start` to start server in development mode.
* `npm run start-prod` to start server in production mode.
* `npm run build` to build the project.
* `npm run test` to run tests.
* `npm run test:modules` to run tests.
* `npm run lint` to run ESLint.

Your app will be running on port `3000`.

## Terms in redux
http://rackt.org/redux/docs/Glossary.html#action-creator

## Flux standard actions
How does your actions should look like:
https://github.com/acdlite/flux-standard-action

## Redux thunk
How to create async actions:
https://github.com/gaearon/redux-thunk

## React router
https://github.com/rackt/react-router

## Redux simple router
https://github.com/rackt/redux-simple-router

## What are containers
A container does data fetching and then renders its corresponding sub-component. That’s it.
https://medium.com/@learnreact/container-components-c0e67432e005#.5wwoj3ph3
So, when should I use containers in this architecture? When the props injected to the smart component are so complex that it should have its on file. Due to reselect and the easyness of connect, probably you won't see the need soon

## Smart and dumb components
https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.iugz80pst
In this architecture, the smart components are under layouts and correspond to route handlers, and dumb components are under components

## Redux resources
More info on redux
https://github.com/xgrommx/awesome-redux

## ReduxBaseApp Recipes

Recipies are some examples about how to implement specific features. Here is a list of all recipies we've done so far
- [ Drag and drop](docs/DnDRecipe.md)
- [Modal](docsModalRecipe.md)
- [Autocomplete](docs/AutocompleteRecipe.md)
- [Router transitions](docs/RouterTransitions.md)

## JavaScript styleguide
We are using ESLint to for check errors and keep consistent code style.

[Redradix JavaScript styleguide](https://github.com/redradix/javascript-style-guide/)

## Webpack config

* `config/webpack.config.dev.js` — development build config.
* `config/webpack.config.prod.js` — production build config.
* `config/webpack.config.base.js` — common build config.

## Building the project

* Run `npm run lint` and make sure there are no errors.
* Run `npm test` and make sure there are no errors.
* Run `npm run build` and wait till building process is done.

Client-side bundle goes into `public/js` directory. `index.html` goes into `public` directory.

## Running the project on production server

* Install dependencies: `npm i`.
* Run server in production mode: `npm run start-prod`.
