import { Input } from '@chakra-ui/react'

import { Field } from '@/app/lib/components/ui/field'

import TextDisplay from '@/app/lib/components/display/base/text'

const TextField = ({ label, value, disabled = false, isEditing = false, onChange, contentRef, ...rest }) => {
  const handleChange = (v) => {
    onChange(v ? v : undefined)
  }

  return (
    <Field label={label}>
      <TextDisplay value={value} flex={4} {...rest} />
    </Field>
  )
}

export default TextField
