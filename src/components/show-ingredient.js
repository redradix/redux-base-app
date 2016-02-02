import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { translate } from 'react-i18next/lib'

class ShowIngredient extends Component {
  render() {
    const { ingredient, ingredient: {id, name, cost, stock }, removeIngredient, t } = this.props
    return (
      <div>
        <span>
          <h1>{t('showIngredient.title')}</h1>
        </span>
        <ul>
          <li><p>{name}</p></li>
          <li><p>{cost}</p></li>
          <li><p>{stock}</p></li>
        </ul>
        <Link to={`/ingredients/${id}/edit/`}>{t('showIngredient.editButton')}</Link>
        {' '}
        <button onClick={removeIngredient.bind(ingredient)}>{t('showIngredient.removeButton')}</button>
      </div>
    )
  }  
}

ShowIngredient.propTypes = {
  ingredient: PropTypes.object,
  removeIngredient: PropTypes.func.isRequired
}

export default translate(['common'])(ShowIngredient) 
