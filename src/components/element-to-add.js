import React, {PropTypes, Component} from 'react'
import { ItemTypes } from '../constants'
import { DragSource } from 'react-dnd';

const elementSource = {
  beginDrag(props, monitor, element) {
    return {id: props.id, amount: parseInt(element.refs.amount.value), name: props.name}
  }  
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }  
}

class Element extends Component {
  render() {
    const { name, subject, t, isDragging, connectDragPreview, connectDragSource } = this.props
    return connectDragPreview(
      <div>
        <div ref="element" style={{ opacity: isDragging ? 0.5 : 1 }}>
          {connectDragSource(<p>{name}</p>, { dropEffect: 'copy' })}
          <input type="number" placeholder={t("elementsToAdd.amountPlaceholder")} ref="amount" defaultValue="1" />
        </div>
      </div>,
    { anchorX: 1 })
  }
}

Element.propTypes = {
  name: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  // Injected by React DnD:
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired
}

export default DragSource(ItemTypes.ELEMENT_TO_ADD, elementSource, collect)(Element)


