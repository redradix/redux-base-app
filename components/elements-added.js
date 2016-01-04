import React, {PropTypes, Component} from 'react'
import { capitalize, pluralize } from "../utils/utils"

class Element extends Component  {
  onClick(e) {
    e.preventDefault()
    this.props.remove(this.props.id.value)  
  }
  render() {
    const {subject, name, quantity, remove} = this.props  
    return (
      <div>
        <p>{name.value}</p>
        <p>{quantity.value}</p>
        <button onClick={this.onClick.bind(this)}> Remove {subject}</button>
      </div>
    )  
  }
}

class ElementsAdded extends Component {
  render() {
    const {totalElements, elements, remove, subject } = this.props  
    const hasElements = elements.length > 0
    const list = !hasElements ? 
      <em>Please add some {pluralize(subject)}</em> :
      elements.map(e =>
        <Element
          id={e.id}
          remove= {remove}
          quantity= {e.quantity}
          name={e.name}
          key={e.id.value}/ >
      )

    return (
      <div>
        <h3> {capitalize(pluralize(subject))} added to your dish</h3>
        <div>{list}</div>
      </div>
    )
  }  
}

export default ElementsAdded 
