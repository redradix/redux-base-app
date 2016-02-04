# ReduxBaseApp

### Start up

* `npm install` to download and install all dependencies.
* `npm start` to start the node server.

Your app will be running on port 3000.

## Terms in redux
http://rackt.org/redux/docs/Glossary.html#action-creator

## Flux standart actions
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

##Redux resources
More info on redux
https://github.com/xgrommx/awesome-redux

### ReduxBaseApp Recipies

Recipies are some examples about how to implement specific features. Here is a list of all recipies we've done so far
1.[ Drag and drop](DnDRecipe.md)
