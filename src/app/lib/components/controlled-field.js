import { Children, cloneElement, useRef } from 'react'
import { useController, useWatch } from 'react-hook-form'

import Field from '@/app/lib/components/field'

const ControlledField = ({ name, label, watches, children, ...rest }) => {
  console.debug('ControlledField, name, control =>', name)
  
  const {
    field,
    fieldState,
    formState
  } = useController({
    name
  })

  // const { errors, isSubmitting } = formState

  // const onlyFirstError = Object.entries(errors).slice(0, 1).reduce((acc, e) => {
  //   const [key, value] = e
  //   acc[key] = value
  //   return acc
  // }, {})

  // console.debug(onlyFirstError)
  // const error = onlyFirstError[name]
  // console.debug(fieldState.error, formState.errors)
  // const error = errors[name]

  const contentRef = useRef(null)

  const child = Children.only(children)
  const inputElement = cloneElement(child, { ...field, ...{ contentRef } })

  return (
    <Field formState={formState} name={name} label={label} {...rest} ref={contentRef}>
      {inputElement}
    </Field>
  )
}

export default ControlledField
