import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addDish, editDish} from '../actions/dishes'
import {reduxForm} from 'redux-form'
import {addArrayValue, removeArrayValue } from 'redux-form/lib/actions'
import bindActionData from 'redux-form/lib/bindActionData'
import {createValidator, required, maxLength, minLength, integer} from '../utils/validation'

const validate = createValidator({
  name: [required, minLength(5), maxLength(10)],
  pvp: [required, integer]
});

class CreateDishForm extends Component {
  addIngredientToDish(id, quantity, name) {
    const dishIngredient = {id, quantity, name}
    const index = this.props.fields.ingredients.indexOf(dishIngredient) 
    this.props.addIngredient('ingredients', dishIngredient, index == -1 ? undefined : index) 
  }
  removeIngredientFromDish(id) {
    const index = this.props.fields.ingredients.reduce((acc, i, index) => {
      return i.id == id ? (index - 1) : acc
    }, undefined) 
    this.props.removeIngredient('ingredients', index)
  }
  render() {
    const {
          fields: {name, cost, pvp, id, ingredients  },
          totalIngredients,
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
        <Ingredients ingredients={totalIngredients}  addIngredientToDish={this.addIngredientToDish.bind(this)} />
        <DishIngredients ingredients= {ingredients} totalIngredients={totalIngredients} removeIngredientFromDish={this.removeIngredientFromDish.bind(this)}/>
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
           'id',
           'ingredients[].name',
           'ingredients[].id',
           'ingredients[].quantity'
  ]
})(CreateDishForm)

class CreateDish extends Component {
  onSubmit(dish) {
    if (this.props.location.pathname.includes("edit")) {
      return this.props.editDish(dish)  
    } else {
      return this.props.addDish(dish)
    }
  }
  render() {
    const { dish, ingredients, addArrayValue, removeArrayValue } = this.props
    return (
      <div>
        <p>Crea el plato indicando su lista de ingredientes, nombre y pvp</p>
        <CreateDishForm onSubmit={this.onSubmit.bind(this)} initialValues={ dish } totalIngredients={ingredients}  removeIngredient={removeArrayValue} addIngredient={addArrayValue}/>
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
    dishIngredient ? acc.push(Object.assign({}, i, {quantity: dishIngredient.quantity})) : acc
    return acc
  }, [])  
}

function omitAlreadyIncluded(ingredients, dishIngredientIds) {
  return ingredients.reduce((acc, i) =>{
    const ids = dishIngredientIds.map(i => i.id)
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
  const data = {form: "create-dish", key: ""}
  const bindedAddArrayValue = bindActionData(addArrayValue, data)
  const bindedRemoveArrayValue = bindActionData(removeArrayValue, data)
  return bindActionCreators({ addDish, editDish, addArrayValue: bindedAddArrayValue, removeArrayValue: bindedRemoveArrayValue }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateDish)

