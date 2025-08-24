import { useCallback, useState } from 'react'

import { DateTime } from 'luxon'

import { Input, CloseButton } from '@chakra-ui/react'
import { InputGroup } from '@/app/lib/components/ui/input-group'
import { RxCalendar } from 'react-icons/rx'

import { Field } from '@/app/lib/components/ui/field'

import {
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger
} from '@/app/lib/components/ui/popover'

import Calendar from '@/app/lib/components/calendar'

const EditableDateField = ({ label, value, onChange }) => {
  const [open, setOpen] = useState(false)

  const endElement = value ? (
    <CloseButton
      size={'xs'}
      onClick={() => {
        setValue('')
        inputRef.current?.focus()
      }}
      me={-2}
    />
  ) : undefined

  const handleSelect = useCallback(value => {
    setOpen(false)
    onChange(value)
  }, [setOpen, onChange])

  return (
    <PopoverRoot modal lazyMount unmountOnExit open={open} onOpenChange={(e) => setOpen(e.open)} positioning={{ placement: 'bottom-start' }}>
      <PopoverTrigger asChild>
        <Field label={label}>
          <InputGroup 
            startElement={<RxCalendar />}
            endElement={endElement}
            flex={1}
          >
            <Input ref={inputRef} value={value ? DateTime.fromJSDate(value).toFormat('yyyy-LL-dd') : ''} readOnly flex={4} size={['lg', null, 'md']} bg='bg' borderColor='border' cursor='pointer' userSelect='none' />
          </InputGroup>
        </Field>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody>
          {/* <Calendar value={value} onSelect={handleSelect} /> */}
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
        <Input value={value ? DateTime.fromJSDate(value).toFormat('yyyy-LL-dd') : ''} readOnly flex={4} size={['lg', null, 'md']} cursor='default' />
      </Field>
    )
  }
}

export default DateField
