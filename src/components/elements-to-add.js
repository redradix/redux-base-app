import React, {PropTypes, Component} from 'react'
import { capitalize } from "../utils/utils"
import { translate } from 'react-i18next/lib'

class Element extends Component {
  onClick(e) {
    e.preventDefault()
    this.props.add(this.props.id, parseInt(this.refs.amount.value), this.props.name)
  }
  render() {
    const { name, subject, t } = this.props
    return (
      <div>
        <p>{name}</p>
        <input type="integer" placeholder={t("elementsToAdd.amountPlaceholder")} ref="amount" />
        <button onClick={this.onClick.bind(this)}>{t('elementsToAdd.add', {item: subject})}</button>
      </div>
    )
  }
}

class ElementsToAdd extends Component {
  render() {
    const { subject, elements, add, t } = this.props
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

    return (
      <div>
        <h3> {t('elementsToAdd.total', {item: capitalize(t('elementsToAdd.' + subject, {count: 0}))})} </h3>
        <div>{list}</div>
      </div>
    )
  }
}

export default translate(['common'])(ElementsToAdd)
