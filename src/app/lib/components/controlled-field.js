import { Children, cloneElement, useRef } from 'react'
import { useController } from 'react-hook-form'

import Field from '@/components/field'

const ControlledField = ({ name, label, control, children, ...rest }) => {
  const {
    field,
    fieldState,
    formState
  } = useController({
    name,
    control
  })

  const contentRef = useRef(null)

  const child = Children.only(children)
  const inputElement = cloneElement(child, {...field, ...{ contentRef }})

  return (
    <Field formState={formState} name={name} label={label} {...rest} ref={contentRef}>
      {inputElement}
    </Field>
  )
}

export default ControlledField
