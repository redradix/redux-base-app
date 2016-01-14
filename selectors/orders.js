import { createSelector } from "reselect"
import { findById } from '../utils/utils'

function findDishes(dishes, orderDishes) {
  return dishes.reduce( (acc, d) => {
    const orderDish = orderDishes.find(od => {
      return d.id == od.id  
    })
    orderDish ? acc.push(Object.assign({}, d, {quantity: orderDish.quantity})) : acc
    return acc
  }, [])  
}

function find(dishes, orders, orderId) {
  const order = findById(orderId, orders) 
  order.dishes = order.dishes ? findDishes(dishes, order.dishes) : []
  return order 
}

const routeSelector = (state, props) => props.params.id
const listSelector = state => state.orders.list
const dishesSelector = (state) => state.dishes.list
const formSelector = (state) => state.form['create-order'] ? state.form['create-order'].dishes :undefined 

export const orderSelector = createSelector(
  routeSelector,
  dishesSelector,
  listSelector,
  (orderId, dishes, orders) => {
    return find(dishes, orders, orderId)
  }
)


// Be careful, orderDishes could be from the form or from the dishes of the order
function pvp(dishes, orderDishes) {
  debugger
  return orderDishes.reduce((acc, od) => {
    const d = dishes.find(d => {
      return d.id == od.id.value ? od.id.value : od.id
    })  
    return acc + (d.price * (od.quantity.value ? od.quantity.value : od.quantity)) 
  }, 0)  
}

export const pvpSelector = createSelector(
  dishesSelector,
  formSelector,
  orderSelector,
  (dishes, formDishes, order) => {
    return pvp(dishes, formDishes ? formDishes : order.dishes)  
  }
)

export const totalSelector = createSelector(
  [orderSelector, pvpSelector, dishesSelector],
  (order, pvp, dishes) => {
    return {
      order,
      dishes,
      pvp
    }  
  }
)

