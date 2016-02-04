import React, {PropTypes, Component} from 'react'
import { capitalize } from "../utils/utils"
import { translate } from 'react-i18next/lib'
import { ItemTypes } from '../constants';
import { DropTarget } from 'react-dnd';
// Components
import Element from './element-to-add'

const elementTarget = {
  drop(props, monitor, element) {
    const { id } = monitor.getItem()
    element.props.remove(id)
  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}


class ElementsToAdd extends Component {
  render() {
    const { subject, elements, add, t, isOver, connectDropTarget } = this.props
    const hasElements = elements.length > 0
    const list = !hasElements ?
      <em>{t('elementsToAdd.empty', {item: t('elementsToAdd.' + subject, {count: 0})})}</em> :
      elements.map(e =>
        <Element
          id={e.id}
          add= {add}
          name={e.name}
          subject={subject}
          t={t}
          key={e.id}/>
    )

    return connectDropTarget(
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}>
        <h3> {t('elementsToAdd.total', {item: capitalize(t('elementsToAdd.' + subject, {count: 0}))})} </h3>
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

export default translate(['common'])(DropTarget(ItemTypes.ELEMENT_ADDED, elementTarget, collect)(ElementsToAdd))
