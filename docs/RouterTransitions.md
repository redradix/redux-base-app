# ReduxBaseApp router transitions recipe

We have implemented router transitions functionality using [react-router-transition](https://github.com/maisano/react-router-transition) by maisano. This project is based on [react-motion](https://github.com/chenglou/react-motion.git) by chenglou which provides an alternative, more powerful API for React's TransitionGroup. If any other use-cases of animating components is needed we recommend using this library. 

The documentation of react-router-transition includes an example but we have done our own (very similar) implementation.

## Where
Transitions between same resource (ingredients, dishes, orders) are all animated. Also transitions between login and register. The source code resides in several files
- [transitions](../example-app/src/components/transitions/index.js) Here we export all 4 different transitions, which all wrapp the transition component, passing a default preset to it.
- [presets](../example-app/src/components/transitions/presets.js) Copy/paste from the presets on the react-router-transition repo, so we can add our own if needed
- [router](../example-app/src/routes.js) We wrap here a group of routes with the appropiate transition component
- [show-order](../example-app/src/components/show-order.js) On every component that belongs to a transition we should apply the styles injected by the transition component on the style property

## How

### Installation
```
npm install --save react-router-transition
```

### Concepts
In case you need to add a new transition effect you should bare in mind two concepts which will define your animation
### Stiffness, damping and precision
For every animation, not only routing transitions you should provide all three (default options available) parameters, to create your animation. You can check combinations on this [utility](http://chenglou.me/react-motion/demos/demo5-spring-parameters-chooser/)

### Spring
Specifies the how to animate to the destination value, e.g. spring(10, {stiffness: 120, damping: 17}) means "animate to value 10, with a spring of stiffness 120 and damping 17".

You can assign this animation to specific style properties, like opacity, offset, scale....

### Route states
You can add those styles to different route states:
- atEnter: an object of style values for a route that is mounting
- atLeave: an object of style values for a route that is unmounting
- atActive: style values for a route that has mounted
 
You can also use mapStyles as an optional function to transform styles that aren't 1:1 (e.g. animating translateX or other values of transform)

### Presets
With those route states you can build your own presets 
```Javascript
const slideLeft = {
  atEnter: {
    opacity: 0,
    offset: 100
  },
  atLeave: {
    opacity: spring(0, fadeConfig),
    offset: spring(-100, slideConfig)
  },
  atActive: {
    opacity: spring(1, slideConfig),
    offset: spring(0, slideConfig)
  },
  mapStyles(styles) {
    return {
      opacity: styles.opacity,
      transform: `translateX(${styles.offset}%)`
    };
  }
};
```
### Transition component
The only thing remaining, is to assign a preset to the route transition component provided by react-router-transition
```Javascript
export const SlideLeftTransition = props => (
  <Transition preset={presets.slideleft} {...props} />
);

```
### Group routes with transition component
```Javascript
<Route component={Landing} onEnter={(dispatch, cb) => dispatch(checkLogged(cb))}>
  <Route component={SlideLeftTransition}>
    <Route path="/login" component={Login}/>
    <Route path="/register" component={Register}/>
  </Route>
</Route>
```

### FAQ
