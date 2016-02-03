import React, {PropTypes, Component} from 'react'
import { capitalize } from "../utils/utils"
import { translate } from 'react-i18next/lib'

class Element extends Component  {
  onClick(e) {
    e.preventDefault()
    this.props.remove(this.props.id.value)
  }
  render() {
    const {subject, name, amount, remove, t} = this.props
    return (
      <div>
        <p>{name.value}</p>
        <p>{amount.value}</p>
        <button onClick={this.onClick.bind(this)}>{t('elementsAdded.removeButton')} {subject}</button>
      </div>
    )
  }
}

class ElementsAdded extends Component {
  render() {
    const {totalElements, elements, remove, subject, t } = this.props
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
          key={e.id.value}/ >
      )

    return (
      <div>
        <h3> {t('elementsAdded.added', {item: capitalize(t('elementsAdded.' + subject, {count: 3}))})} </h3>
        <div>{list}</div>
      </div>
    )
  }
}

export default translate(['common'])(ElementsAdded)
