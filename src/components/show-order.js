import React, { Component, PropTypes } from 'react'
import { formatDate } from "../utils/utils"
import { Link } from 'react-router'
import { translate } from 'react-i18next/lib'


class ShowOrder extends Component {
  render() {
    const { order, order: { id, createdAt}, pvp, isFetching, removeOrder, t } = this.props
    return (
      <div>
        <span>
          <h1>{t('showOrder.title')}</h1>
        </span>
        <ul>
          {isFetching && <p>Loading...</p>}
          {!isFetching &&
            <div>
              <li><p>Order {id}</p></li>
              <li><p>{formatDate(createdAt)}</p></li>
              <li><p>{pvp}</p></li>
            </div>
          }
        </ul>
        <Link to={`/orders/${id}/edit/`}>{t('showOrder.editButton')}</Link>
        {' '}
        <button onClick={removeOrder.bind(this, order)}>{t('showOrder.removeButton')}</button>
        
      </div>
    )
  }
}

ShowOrder.propTypes = {
  order: PropTypes.object,
  isFetching: PropTypes.bool.isRequired,
  removeOrder: PropTypes.func.isRequired
}

export default translate(['common'])(ShowOrder) 
