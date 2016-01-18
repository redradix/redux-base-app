import React, {PropTypes, Component} from 'react'
import { pluralize } from "../utils/utils"

class Element extends Component {
  onClick(e) {
    e.preventDefault()
    this.props.add(this.props.id, parseInt(this.refs.amount.value), this.props.name)  
  }
  render() {
    const { name, subject } = this.props  
    return (
      <div>
        <p>{name}</p>
        <input type="integer" placeholder="amount" ref="amount" />
        <button onClick={this.onClick.bind(this)}> Add {subject}</button>
      </div>
    )  
  }
}

class ElementsToAdd extends Component {
  render() {
    const { subject, elements, add } = this.props  
    const hasElements = elements.length > 0
    const list = !hasElements ? 
      <em>You don't have any {pluralize(subject)} yet</em> :
      elements.map(e =>
        <Element
          id={e.id}
          add= {add}
          name={e.name}
          subject={subject}
          key={e.id}/>
    )

    return (
      <div>
        <h3> Total {pluralize(subject)}</h3>
        <div>{list}</div>
      </div>
    )
  }  
}

export default ElementsToAdd 
