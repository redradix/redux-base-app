/* Example without selectors */

import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

/* Actions */
import { addIngredient, editIngredient } from '../modules/ingredients'

/* Components */
import CreateIngredientForm from '../components/create-ingredient'


class CreateIngredient extends Component {
  onSubmit(ingredient) {
    if (this.props.location.pathname.includes("edit")) {
      return this.props.editIngredient(ingredient)
    } else {
      return this.props.addIngredient(ingredient)
    }
  }
  render() {
    const { ingredient } = this.props
    return (
      <CreateIngredientForm onSubmit={this.onSubmit.bind(this)} initialValues={ ingredient }/>
    )
  }
}

CreateIngredient.propTypes = {
  ingredient: PropTypes.object,
  addIngredient: PropTypes.func
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.params.id
  if (!id) return {}
  return {
    ingredient: state.ingredients.list.find((e) => {return e.id == id})
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addIngredient, editIngredient }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateIngredient)
