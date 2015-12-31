import React, {PropTypes, Component} from 'react'

class Ingredient extends Component  {
  onClick(e) {
    e.preventDefault()
    this.props.removeIngredientFromDish(this.props.id.value)  
  }
  render() {
    const {name, quantity, removeIngredientFromDish} = this.props  
    return (
      <div>
        <p>{name.value}</p>
        <p>{quantity.value}</p>
        <button onClick={this.onClick.bind(this)}> Remove ingredient </button>
      </div>
    )  
  }
}

class DishIngredients extends Component {
  render() {
    const {totalIngredients, ingredients, removeIngredientFromDish} = this.props  
    const hasElements = ingredients.length > 0
    const elements = !hasElements ? 
      <em>Please add some elements</em> :
      ingredients.map(ingredient =>
        <Ingredient
          id={ingredient.id}
          removeIngredientFromDish = {removeIngredientFromDish}
          quantity= {ingredient.quantity}
          name={ingredient.name}
          key={ingredient.id.value}/ >
      )

    return (
      <div>
        <h3> Ingredients added to your dish</h3>
        <div>{elements}</div>
      </div>
    )
  }  
}

export default DishIngredients
