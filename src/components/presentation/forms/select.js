import React, {Component, PropTypes} from 'react'
import { Field } from 'redux-form'
import { exists, t } from 'core/i18n'

const getState = ({active}) => {
  if (active) return 'is-active'
  return ''
}

const getOptions = (_options, defaultOption) => {
  const options = defaultOption ? ['all'].concat(_options) : _options
  return options.map((opt, i) =>
    <option key={opt || i} value={opt}>
      {exists(`filters.values.${opt}`) ? t(`filters.values.${opt}`) : opt}
    </option>
  )
}

const getErrorState = ({touched, error}) => {
  return touched && error ? 'has-error' : ''
}

const renderSelect = ({input, label, options, defaultOption, readOnly, meta, meta: {touched, error, warning}}) => {
  const state = getState(meta, input)
  const opts = getOptions(options, defaultOption)
  const errorState = getErrorState(meta)
  return (
    <div className={`field ${state} ${errorState}`}>
      <label htmlFor={input.name}>{label}</label>
      <select {...input} readOnly={readOnly}>
        {opts}
      </select>
      {touched && error && <p className='error-message'>{error}</p>}
      {touched && warning && <p className='warning-message'>{warning}</p>}
    </div>
  )
}

renderSelect.defaultProps = {
  defaultOption: true
}

renderSelect.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  defaultOption: PropTypes.bool.isRequired,
  readOnly: PropTypes.bool,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
    warning: PropTypes.string
  })
}

class Select extends Component {
  render() {
    return (
      <Field component={renderSelect} {...this.props}/>
    )
  }
}

Select.propTypes = {
}

export default Select
