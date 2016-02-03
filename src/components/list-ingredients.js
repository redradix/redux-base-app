import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { translate } from 'react-i18next/lib'

class ListIngredients extends Component {
  render() {
    const { isFetching, list, removeIngredient, t } = this.props
    return (
      <div>
        <span>
          <h1>{t('listIngredients.title')}</h1>
        </span>
        <ul>
          {isFetching && <p>{t('listIngredients.loading')}</p>}
          {!isFetching && list.length == 0 && <p>{t('listIngredients.empty')}</p>}
          {!isFetching && list.length > 0 && list.map((i, index) =>
            <li key={index}>
              <Link to={`/ingredients/${i.id}/show`}>{i.name}</Link>
              {' '}
              <Link to={`/ingredients/${i.id}/edit`}>{t('listIngredients.editButton')}</Link>
              {' '}
              <button onClick={removeIngredient.bind(this, i)}>{t('listIngredients.removeButton')}</button>
            </li>)
          }
        </ul>
      </div>
    )
  }  
}

ListIngredients.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  list: PropTypes.array.isRequired
}

export default translate(['common'])(ListIngredients) 
