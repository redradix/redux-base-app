import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { translate } from 'react-i18next/lib'

class ShowDish extends Component {
  render() {
    const { dish, dish: {id, name, price }, removeDish, escandallo, t } = this.props
    return (
      <div>
        <span>
          <h1>{t('showDish.title')}</h1>
        </span>
        <ul>
          <li><p>{name}</p></li>
          <li><p>{price}</p></li>
          <li><p>{escandallo}</p></li>
        </ul>
        <Link to={`/dishes/${id}/edit/`}>{t('showDish.editButton')}</Link>
        {' '}
        <button onClick={removeDish.bind(this, dish)}>{t('showDish.removeButton')}</button>
      </div>
    )
  }  
}

ShowDish.propTypes = {
  dish: PropTypes.object,
  removeDish: PropTypes.func.isRequired
}

export default translate(['common'])(ShowDish) 
