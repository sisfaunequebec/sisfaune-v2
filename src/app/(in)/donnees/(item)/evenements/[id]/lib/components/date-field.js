import { useCallback, useState } from 'react'

import { DateTime } from 'luxon'

import { Input, Flex } from '@chakra-ui/react'
import { InputGroup } from '@/components/ui/input-group'
import { RxCalendar } from 'react-icons/rx'

import { Field } from '@/components/ui/field'

import {
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger
} from '@/components/ui/popover'

import Calendar from '@/app/lib/components/calendar'

const EditableDateField = ({ label, value, onChange }) => {
  const [open, setOpen] = useState(false)

  const handleSelect = useCallback(value => {
    setOpen(false)
    onChange(value)
  }, [setOpen, onChange])

  return (
    <PopoverRoot lazyMount unmountOnExit open={open} onOpenChange={(e) => setOpen(e.open)} positioning={{ placement: 'bottom-start' }}>
      <PopoverTrigger asChild>
        <Field label={label}>
          <InputGroup startElement={<RxCalendar />} flex={1}>
            <Input value={value ? DateTime.fromJSDate(value).toFormat('yyyy-LL-dd') : null} readOnly flex={4} size={['lg', null, 'md']} bg='bg' borderColor='border' cursor='pointer' userSelect='none' />
          </InputGroup>
        </Field>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody>
          <Calendar value={value} onSelect={handleSelect} />
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  )
}

const DateField = ({ label, value, isEditing = false, onChange }) => {
  if (isEditing) {
    return (
      <EditableDateField onChange={onChange} value={value} label={label} />
    )
  } else {
    return (
      <Field label={label}>
        <Input value={value ? DateTime.fromJSDate(value).toFormat('yyyy-LL-dd') : null} readOnly flex={4} size={['lg', null, 'md']} cursor='default' />
      </Field>
    )
  }
}

export default DateField
