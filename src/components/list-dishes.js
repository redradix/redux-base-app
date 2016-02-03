import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import { translate } from 'react-i18next/lib'

class ListDishes extends Component {
  render() {
    const { isFetching, list, removeDish, t } = this.props
    return (
      <div>
        <span>
          <h1>{t('listDishes.title')}</h1>
        </span>
        <ul>
          {isFetching && <p>{t('listDishes.loading')}</p>}
          {!isFetching && list.length == 0 && <p>{t('listDishes.empty')}</p>}
          {!isFetching && list.length > 0 && list.map((d, index) =>
            <li key={index}>
              <Link to={`/dishes/${d.id}/show`}>{d.name}</Link>
              {' '}
              <Link to={`/dishes/${d.id}/edit`}>{t('listDishes.editButton')}</Link>
              {' '}
              <button onClick={removeDish.bind(this, d)}>{t('listDishes.removeButton')}</button>
            </li>)
          }
        </ul>
      </div>
    )  
  }  
}

ListDishes.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  list: PropTypes.array.isRequired
}

export default translate(['common'])(ListDishes) 
