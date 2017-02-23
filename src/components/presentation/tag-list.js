import React, {PropTypes} from 'react'
import Tag from 'components/presentation/tag'
import { map, pick, flatten } from 'lodash'
import {order} from 'services/filters'

const getTags = (filters, onClose) => {
  return flatten(map(pick(filters, order.slice(3).concat(['customerType'])), (value, filter, i) => {
    if (value === 'all') return undefined
    if (value.constructor === Array) {
      return value.map((v, j) => (<Tag key={`${i}${j}`} label={v} filter={filter} onClose={onClose}/>))
    }
    return (
      <Tag label={value} filter={filter} onClose={onClose}/>
    )
  }))
}

const TagList = ({filters, onClose}) => {
  const tags = getTags(filters, onClose)
  return (
    <div className='tag-list'>
      {tags}
    </div>
  )
}

TagList.propTypes = {
  filters: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired
}

export default TagList
