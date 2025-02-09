import { DateTime } from 'luxon'

import { Input } from '@chakra-ui/react'

import { Field } from '@/components/ui/field'

const DateField = ({ label, value, isEditing = false }) => {
  // console.debug(value)
  return (
    <Field label={label}>
      <Input value={value ? DateTime.fromJSDate(value).toFormat('yyyy-LL-dd') : null} readOnly={!isEditing} flex={4}size={['lg', null, 'md']} />
    </Field>
  )
}

export default DateField
