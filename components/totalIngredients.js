import React, {PropTypes, Component} from 'react'

class Ingredient extends Component {
  onClick(e) {
    e.preventDefault()
    this.props.addIngredientToDish(this.props.id, this.refs.quantity.value, this.props.name)  
  }
  render() {
    const {name} = this.props  
    return (
      <div>
        <p>{name}</p>
        <input type="integer" placeholder="quantity" ref="quantity" />
        <button onClick={this.onClick.bind(this)}> Add ingredient </button>
      </div>
    )  
  }
}

class TotalIngredients extends Component {
  render() {
    const { ingredients, addIngredientToDish } = this.props  
    const hasElements = ingredients.length > 0
    const elements = !hasElements ? 
      <em>You don't have any ingredients yet</em> :
      ingredients.map(ingredient =>
        <Ingredient
          id={ingredient.id}
          addIngredientToDish = {addIngredientToDish}
          name={ingredient.name}
          key={ingredient.id}/>
    )

    return (
      <div>
        <h3> Total ingredients</h3>
        <div>{elements}</div>
      </div>
    )
  }  
}

export default TotalIngredients
