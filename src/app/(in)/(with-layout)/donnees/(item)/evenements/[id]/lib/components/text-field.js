import { Input } from '@chakra-ui/react'

import { Field } from '@/app/lib/components/ui/field'

const TextField = ({ label, value, disabled = false, isEditing = true, onChange, contentRef, ...rest }) => {

  const handleChange = (v) => {
    onChange(v ? v : undefined)
  }

  return (
    <Field label={label}>
      <Input value={value ?? ''} onChange={handleChange} disabled={disabled} readOnly={!isEditing} flex={4} size={['lg', null, 'md']} {...rest} />
    </Field>
  )
}

export default TextField
