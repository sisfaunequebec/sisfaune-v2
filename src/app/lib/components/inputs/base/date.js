'use client'
import { useCallback, useRef, useState } from 'react'

import { DateTime } from 'luxon'
import { isoUTCStringToFormat, isoStringToJsDate } from '@/utils/dates'

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


const DateInput = ({ value, onChange, minDate, clearable = false, disabled = false, size, children }) => {
  const [open, setOpen] = useState(false)
  const inputRef = useRef()

  const handleSelect = useCallback(value => {
    const isoDate = value ? DateTime.fromJSDate(value).toFormat('yyyy-LL-dd') : null
    setOpen(false)
    onChange(isoDate)
  }, [setOpen, onChange])

  const ClearButton = value
    ? (
      <CloseButton
        variant={'ghost'}
        rounded={'full'}
        size={'xs'}
        me={-2}
        onClick={(e) => {
          e.stopPropagation()
          inputRef.current.value = ''
          onChange(null)
        }}
      />
      )
    : undefined

  const jsDate = value ? DateTime.fromISO(value, { setZone: true }).toJSDate() : null

  return (
    <PopoverRoot modal lazyMount unmountOnExit open={open} onOpenChange={(e) => setOpen(e.open)} positioning={{ placement: 'bottom-start' }}>
      <InputGroup startElement={<RxCalendar />} endElement={clearable && ClearButton} flex={1} size={size} >
        <PopoverTrigger asChild>
          <Input ref={inputRef} value={value ? isoUTCStringToFormat(value) : ''} disabled={disabled} variant={'outline'} flex={4} size={['lg', null, 'md']} bg='bg' cursor={disabled ? 'disabled' : 'pointer'} userSelect={'none'}_focus= {{ bg: 'blue.50' }} />
        </PopoverTrigger>
      </InputGroup>
      <PopoverContent>
        <PopoverBody>
          <Calendar value={jsDate} minDate={minDate} onSelect={handleSelect} />
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  )
}

export default DateInput
