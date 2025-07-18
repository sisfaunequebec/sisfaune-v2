'use client'
import { useCallback, useRef, useState } from 'react'

import { DateTime } from 'luxon'

import { Input, CloseButton } from '@chakra-ui/react'
import { InputGroup } from '@/app/lib/components/ui/input-group'
import { RxCalendar } from 'react-icons/rx'

import {
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger
} from '@/app/lib/components/ui/popover'

import Calendar from '@/app/lib/components/calendar'

const DateSelector = ({ value, onChange, minDate, clearable = false, children }) => {
  const [open, setOpen] = useState(false)
  const inputRef = useRef()

  const handleSelect = useCallback(value => {
    setOpen(false)
    onChange(value)
  }, [setOpen, onChange])

  const endElement = value
    ? (
      <CloseButton
        variant='ghost'
        rounded='full'
        size='xs'
        me={-2}
        onClick={(e) => {
          e.stopPropagation()
          inputRef.current.value = ''
          onChange(null)
        }}
      />
      )
    : undefined

  return (
    <PopoverRoot modal lazyMount unmountOnExit open={open} onOpenChange={(e) => setOpen(e.open)} positioning={{ placement: 'bottom-start' }}>
      <InputGroup startElement={<RxCalendar />} endElement={clearable && endElement} flex={1}>
        <PopoverTrigger asChild>
          <Input ref={inputRef} value={value ? DateTime.fromJSDate(value).toFormat('yyyy-LL-dd') : ''} variant='outline' flex={4} size={['lg', null, 'md']} bg='bg' cursor='pointer' userSelect='none' />
        </PopoverTrigger>
      </InputGroup>
      <PopoverContent>
        <PopoverBody>
          <Calendar value={value} minDate={minDate} onSelect={handleSelect} />
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  )
}

export default DateSelector
