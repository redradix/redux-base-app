import React, { PropTypes, Component } from 'react'
import {order} from 'services/filters'


function convertFiltersToBreadcrumbs(filters) {
  // Just bu, franchise and product create breadcrumbs
  return order.slice(0, 3).reduce((acum, filter) => {
    if (filters[filter] !== 'all') acum.push(filters[filter])
    return acum
  }, [])
}

class Breadcrumbs extends Component {
  handleClick = (e) => {
    const {onClick} = this.props
    e.preventDefault()
    e.stopPropagation()
    onClick(parseInt(e.target.getAttribute('data-index'), 10))
  }
  renderLastBreadcrumb(filter, index) {
    return (
      <li key={index} className='is-current'>{filter}</li>
    )
  }
  renderBreadcrumb(filter, index) {
    return (
      <li key={index}>
        <a href='#' onClick={this.handleClick} data-index={index}>{filter}</a>
      </li>
    )
  }
  render() {
    const { filters } = this.props
    const breadcrumbItems = convertFiltersToBreadcrumbs(filters)
    const breadcrumbs = breadcrumbItems.map((filter, index) => {
      if (index === breadcrumbItems.length - 1) {
        return this.renderLastBreadcrumb(filter, index)
      }
      return this.renderBreadcrumb(filter, index)
    })
    return (
      <ul className='breadcrumbs'>
        {breadcrumbs}
      </ul>
    )
  }
}

Breadcrumbs.propTypes = {
  filters: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Breadcrumbs
