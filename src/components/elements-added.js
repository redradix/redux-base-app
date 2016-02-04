import React, {PropTypes, Component} from 'react'
import { capitalize } from "../utils/utils"
import { translate } from 'react-i18next/lib'
import { ItemTypes } from '../constants';
import { DropTarget } from 'react-dnd';

import Element from './element-added'

const elementTarget = {
  drop(props, monitor, element) {
    const {id, name, amount } = monitor.getItem()
    element.props.add(id, name, amount)
  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}


class ElementsAdded extends Component {
  render() {
    const {totalElements, elements, remove, subject, t, connectDropTarget, isOver } = this.props
    console.log(elements)
    const hasElements = elements.length > 0
    const list = !hasElements ?
      <em>{t('elementsAdded.add', {item: t('elementsAdded.' + subject)})} </em> :
      elements.map(e =>
        <Element
          id={e.id}
          remove= {remove}
          amount= {e.amount}
          name={e.name}
          t={t}
          subject={subject}
          key={e.id.value}/ >
      )
    return connectDropTarget(
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}>
        <h3> {t('elementsAdded.added', {item: capitalize(t('elementsAdded.' + subject, {count: 3}))})} </h3>
        <div>{list}</div>
        {isOver &&
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: 'yellow',
          }} />
        }
      </div>
    )
  }
}

ElementsAdded.PropTypes = {
  isOver: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
}

export default translate(['common'])(DropTarget(ItemTypes.ELEMENT_TO_ADD, elementTarget, collect)(ElementsAdded))
