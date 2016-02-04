import React, {PropTypes, Component} from 'react'
import { ItemTypes } from '../constants'
import { DragSource } from 'react-dnd';

const elementSource = {
  beginDrag(props) {
    return {id: props.id}
  }  
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }  
}

class Element extends Component  {
  render() {
    const {subject, name, amount, t, isDragging, connectDragSource } = this.props
    return connectDragSource(
      <div style={{ opacity: isDragging ? 0.5 : 1 }}>
        <p>{name.value}</p>
        <p>{amount.value}</p>
      </div>
    )
  }
}

Element.PropTypes = {
  subject: PropTypes.string.isRequired,
  name: PropTypes.object.isRequired,
  amount: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  // Injected by React DnD:
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired
}

export default DragSource(ItemTypes.ELEMENT_ADDED, elementSource, collect)(Element)
