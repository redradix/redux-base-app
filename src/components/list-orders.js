import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { formatDate } from '../utils/utils'
import { translate, Interpolate } from 'react-i18next/lib'

class ListOrders extends Component {
  render() {
    const { isFetching, list, removeOrder, t } = this.props
    return (
      <div>
        <span>
          <h1>{t('listOrders.title')}</h1>
        </span>
        <ul>
          {isFetching && <p>{t('listOrders.loading')}</p>}
          {!isFetching && list.length == 0 && <p>{t('listOrders.empty')}</p>}
          {!isFetching && list.length > 0 && list.map((o, index) =>
            <li key={index}>
              <Link to={`/orders/${o.id}/show`}>{t('listOrders.order')}{o.id} </Link><Interpolate i18nKey='listOrders.date' date={formatDate(o.createdAt)} />
              {' '}
              <Link to={`/orders/${o.id}/edit`}>{t('listOrders.editButton')}</Link>
              {' '}
              <button onClick={removeOrder.bind(this, o)}>{t('listOrders.removeButton')}</button>
            </li>)
          }
        </ul>
      </div>
    )
  }  
}

ListOrders.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  list: PropTypes.array.isRequired
}

export default translate(['common'])(ListOrders) 
