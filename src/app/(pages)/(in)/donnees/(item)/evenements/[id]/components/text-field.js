import { Input } from '@chakra-ui/react'

import { Field } from '@/components/ui/field'

const TextField = ({ label, value, isEditing = false }) => {
  return (
    <Field label={label}>
      <Input value={value} readOnly={!isEditing} flex={4}size={['lg', null, 'md']} />
    </Field>
  )
}

export default TextField
