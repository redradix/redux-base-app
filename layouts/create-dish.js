import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addDish, editDish} from '../actions/dishes'
import {reduxForm} from 'redux-form'
import {createValidator, required, maxLength, minLength, integer} from '../utils/validation'
import DishIngredients from '../components/dishIngredients'
import Ingredients from '../components/totalIngredients'

const validate = createValidator({
  name: [required, minLength(5), maxLength(10)],
  pvp: [required, integer]
});

class CreateDishForm extends Component {
  render() {
    const {
          fields: {name, cost, pvp, id },
          ingredients,
          totalIngredients,
          addIngredientToDish,
          removeIngredientFromDish,
          handleSubmit,
          resetForm,
          submitting,
          error
          } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" placeholder="Name" {...name}/>
          {name.touched && name.error && <div>{name.error}</div>}
        </div>
        <div>
          <label>PVP</label>
          <input type="integer" placeholder="PVP" {...pvp}/>
          {pvp.touched && pvp.error && <div>{pvp.error}</div>}
        </div>
        <Ingredients ingredients={totalIngredients} addIngredientToDish={addIngredientToDish}/>
        <DishIngredients ingredients= {ingredients} totalIngredients={totalIngredients} removeIngredientFromDish={removeIngredientFromDish}/>
        <div>
          <p>Escandallo: 0</p>
        </div>
        {error && <div>{error}</div>}
        <button disabled={submitting }type='submit' onClick={handleSubmit}>
          {submitting ? <i/> : <i/>} Submit
        </button>
        <button disabled={submitting} onClick={resetForm}>
          Clear Values
        </button>
      </form> 
    )
  }
}

CreateDishForm.propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    error: PropTypes.string,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
  }

CreateDishForm = reduxForm({
  form: 'create-dish',
  validate,
  fields: ['name',
           'pvp', 
           'id'
  ]
})(CreateDishForm)

class CreateDish extends Component {
  addIngredientToDish(id, quantity, name) {
    let ingredients = this.props.dish.ingredients
    let dishIngredient = ingredients.find(i => {return i.id == id})
    if (dishIngredient) {
      dishIngredient.quantity = parseInt(quantity)
    } else {
      ingredients.push({id, name, quantity: parseInt(quantity)})  
    }
  }
  removeIngredientFromDish(id) {
    this.props.dish.ingredients = this.props.dish.ingredients.filter(i => {
      return i.id !== id  
    })  
  }
  onSubmit(dish) {
    if (this.props.location.pathname.includes("edit")) {
      return this.props.editDish(dish)  
    } else {
      return this.props.addDish(dish)
    }
  }
  render() {
    const { dish, ingredients } = this.props
    return (
      <div>
        <p>Crea el plato indicando su lista de ingredientes, nombre y pvp</p>
        <CreateDishForm onSubmit={this.onSubmit.bind(this)} initialValues={ dish } ingredients={dish.ingredients} totalIngredients={ingredients} removeIngredientFromDish={this.removeIngredientFromDish.bind(this)} addIngredientToDish={this.addIngredientToDish.bind(this)}/>
      </div>
    )
  }
}

CreateDish.propTypes = {
  dish: PropTypes.object,
  addDish: PropTypes.func,
  editDish: PropTypes.func
}

function findIngredients(ingredients, dishIngredientIds) {
  return ingredients.reduce( (acc, i) => {
    const dishIngredient = dishIngredientIds.find(di => {
      return i.id == di.id  
    })
    return dishIngredient ? acc.push(Object.assign({}, i, {quantity: di.quantity})) : acc
  }, [])  
}

function omitAlreadyIncluded(ingredients, dishIngredientsIds) {
  return ingredients.reduce((acc, i) =>{
    const ids = dishIngredientsIds.map(i => i.id)
    ids.includes(i) ? acc : acc.push(i)
    return acc
  }, [])  
} 

function mapStateToProps(state) {
  // Find a better way to parse params
  // How was it call the middleware for routing?
  const id = parseInt(state.routing.path.split("/")[2])
  let dish = state.dishes.list.find((e) => {return e.id == id}) || {}
  dish.ingredients = dish.ingredients ? findIngredients(state.ingredients.list, dish.ingredients) : []
  return {
    dish: dish,
    ingredients: omitAlreadyIncluded(state.ingredients.list, dish.ingredients)
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addDish, editDish }, dispatch)
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(CreateDish)

