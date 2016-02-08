import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { DragDropContext } from 'react-dnd';
import bindActionData from 'redux-form/lib/bindActionData'
import HTML5Backend from 'react-dnd-html5-backend'

/* Selectors */
import { totalSelector } from '../modules/dishes/selectors'

/* Actions */
import { addDish, editDish} from '../modules/dishes'
import {addArrayValue, removeArrayValue } from 'redux-form/lib/actions'

/* Components */
import CreateDishForm from '../components/create-dish'


class CreateDish extends Component {
  onSubmit(dish) {
    if (this.props.location.pathname.includes("edit")) {
      return this.props.editDish(dish)
    } else {
      return this.props.addDish(dish)
    }
  }
  render() {
    const { dish, ingredients, escandallo,  addArrayValue, removeArrayValue } = this.props
    return (
      <CreateDishForm onSubmit={this.onSubmit.bind(this)} initialValues={ dish } totalIngredients={ingredients}  removeIngredient={removeArrayValue} escandallo={escandallo} addIngredient={addArrayValue}/>
    )
  }
}

CreateDish.propTypes = {
  dish: PropTypes.object,
  ingredients: PropTypes.array,
  escandallo: PropTypes.number,
  addDish: PropTypes.func,
  editDish: PropTypes.func
}

function mapDispatchToProps(dispatch) {
  const data = {form: "create-dish", key: ""}
  const bindedAddArrayValue = bindActionData(addArrayValue, data)
  const bindedRemoveArrayValue = bindActionData(removeArrayValue, data)
  return bindActionCreators({ addDish, editDish, addArrayValue: bindedAddArrayValue, removeArrayValue: bindedRemoveArrayValue }, dispatch)
}

export default connect(
  totalSelector,
  mapDispatchToProps
)(DragDropContext(HTML5Backend)(CreateDish))
