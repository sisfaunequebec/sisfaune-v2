import { Textarea } from '@chakra-ui/react'

import { Field } from '@/components/ui/field'

const CommentField = ({ label, value, isEditing = false }) => {
  return (
    <Field label={label}>
      <Textarea autoresize={'autoresize'} rows={5} value={value ?? ''} readOnly={!isEditing} flex={4}size={['lg', null, 'md']} />
    </Field>
  )
}

export default CommentField
