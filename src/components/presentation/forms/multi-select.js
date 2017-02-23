import React, { PropTypes, Component } from 'react'
import Select from 'react-select'
import { Field } from 'redux-form'
import { exists, t } from 'core/i18n'

class renderMultiSelect extends Component {
  render() {
    const { input, options, multi, placeholder, label, onFormChange } = this.props
    const i18nOptions = options.map(c => ({
      label: exists(`filters.values.${c}`) ? t(`filters.values.${c}`) : c, value: c
    }))
    return (
      <div className='field'>
        {label && <label htmlFor={input.name}>{label}</label>}
        <Select backspaceToRemoveMessage='' scrollMenuIntoView={false} multi={multi} placeholder={placeholder} options={i18nOptions}
          onChange={(vals) => {
            input.onChange(vals)
            input.onFocus()
            onFormChange(input.name, vals.map(v => v.value))
          }}
          arrowRenderer={() => (
            <span className='Select-arrow'>
              <span className='icon icon-plus' />
            </span>
          )}
          onBlur={() => input.onBlur()} value={input.value} joinValues delimiter=' '/>
      </div>
    )
  }
}

renderMultiSelect.defaultProps = {
  multi: true
}

renderMultiSelect.propTypes = {
  input: PropTypes.object.isRequired,
  value: PropTypes.array,
  multi: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onFormChange: PropTypes.func.isRequired
}

const MultiSelect = (props) => {
  return <Field component={renderMultiSelect} {...props}/>
}

export default MultiSelect
