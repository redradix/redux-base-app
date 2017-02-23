import React, {Component, PropTypes} from 'react'
import cx from 'classnames'
import { Field } from 'redux-form'

const getState = ({active, dirty, pristine}, {value}) => {
  if (active) return 'is-focused'
  if (pristine && value) return 'is-filled'
  if (dirty) return 'is-edited'
  return ''
}

const getErrorState = ({touched, error}) => {
  return touched && error ? 'has-error' : ''
}

const renderInput = ({ input, label, meta: { touched, error, warning }, meta, ...rest}) => {
  const state = getState(meta, input)
  const errorState = getErrorState(meta)
  const className = cx('field', 'form-field', 'input-field', {
    disabled: rest.readOnly,
    [state]: state,
    [errorState]: errorState
  })
  const inputClassname = cx({ error: errorState })
  return (
    <div className={className}>
      <label htmlFor={input.name}>{label}</label>
      <input className={inputClassname} id={input.name} {...input} {...rest} />
      {touched && error && <p className='error-message'>{error}</p>}
      {touched && warning && <p className='warning-message'>{warning}</p>}
    </div>
  )
}

renderInput.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['email', 'text', 'password']),
  readOnly: PropTypes.bool,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
    warning: PropTypes.string
  })
}

class Input extends Component {
  render() {
    return (
      <Field component={renderInput} {...this.props} />
    )
  }
}

Input.defaultProps = {
  type: 'text',
  component: renderInput,
  readOnly: false
}

Input.propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.oneOf(['text', 'password', 'email']),
  readOnly: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string.isRequired
}

export default Input
