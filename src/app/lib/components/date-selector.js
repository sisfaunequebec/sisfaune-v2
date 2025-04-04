
import { useCallback, useRef, useState } from 'react'

import { DateTime } from 'luxon'

import { useDatePicker } from '@rehookify/datepicker'

import { HStack, Input, VStack, Flex, SimpleGrid, Button, Text, IconButton, CloseButton } from '@chakra-ui/react'
import { InputGroup } from '@/components/ui/input-group'
import { RxDoubleArrowLeft, RxChevronLeft, RxChevronRight, RxDoubleArrowRight, RxCalendar } from 'react-icons/rx'

// import { Field } from '@/components/ui/field'

import {
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from '@/components/ui/popover'

const Calendar = ({ value, onSelect }) => {
  // console.debug(typeof value)
  const initialState = value ? [value] : []
  const [selectedDates, onDatesChange] = useState(initialState)

  const handleChange = useCallback((value) => {
    onDatesChange(value)
    // console.debug(DateTime.fromJSDate(value[0]).toISODate())
    onSelect(value[0])
  }, [onSelect, onDatesChange])

  const { data, propGetters } = useDatePicker({
    selectedDates,
    onDatesChange: handleChange,
    locale: {
      locale: 'fr'
    },
    calendar: {
      startDay: 0
    },
    dates: { toggle: false }
  })

  const { weekDays, calendars } = data
  const { year, month, days } = calendars[0]

  const {
    dayButton,
    addOffset,
    subtractOffset,
  } = propGetters

  return (
    <VStack gap={1} p={0} m={0} alignItems={'stretch'}>
      <HStack flex={1} mb={2} justifyContent={'space-between'}>
        <HStack>
          <IconButton size={'xs'} variant={'subtle'} rounded={'full'} {...subtractOffset({ years: 1 })}>
            <RxDoubleArrowLeft />
          </IconButton>
          <IconButton size={'xs'} variant={'subtle'} rounded={'full'} {...subtractOffset({ months: 1 })}>
            <RxChevronLeft />
          </IconButton>
        </HStack>
        <Text fontSize={'xs'} fontWeight={'bold'} textTransform={'uppercase'} userSelect={'none'}>{month} {year}</Text>
        <HStack>
          <IconButton size={'xs'} variant={'subtle'} rounded={'full'} {...addOffset({ months: 1 })}>
            <RxChevronRight />
          </IconButton>
          <IconButton size={'xs'} variant={'subtle'} rounded={'full'} {...addOffset({ years: 1 })}>
            <RxDoubleArrowRight />
          </IconButton>
        </HStack>
      </HStack>
      <SimpleGrid columns={7} gap={2} mb={2}>
        {weekDays.map(day => (
          <Button key={`${month}-${day}`} size={'sm'} rounded={'full'} variant={'ghost'} disabled cursor={'default'}>{day.split('')[0].toUpperCase()}</Button>
        ))}
      </SimpleGrid>
      <SimpleGrid columns={7} gap={2}>
        {days.map((day, i) => {
          const buttonProps = dayButton(day)
          const { disabled, now, selected } = day
          return (
            <Button key={day.$date.toDateString()} size={'xs'} rounded={'full'} disabled={disabled} variant={selected ? 'solid' : (now ? 'subtle' : 'subtle')} colorPalette={now || selected ? 'green' : null} {...buttonProps}>
              {day.day}
            </Button>
          )
        }
        )}
      </SimpleGrid>
    </VStack>
  )
}

const DateSelector =  ({ value, onChange, clearable = false, children }) => {
  const [open, setOpen] = useState(false)
  const inputRef = useRef()

  const handleSelect = useCallback(value => {
    setOpen(false)
    onChange(value)
  }, [setOpen, onChange])

  const endElement = value ? (
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
  ) : undefined

  return (
    <PopoverRoot lazyMount unmountOnExit open={open} onOpenChange={(e) => setOpen(e.open)} positioning={{ placement: 'bottom-start' }}>
      <PopoverTrigger asChild >
        {/* <Field label={label}> */}
          <InputGroup startElement={<RxCalendar />} endElement={clearable && endElement} flex={1} >
            <Input ref={inputRef} value={value ? DateTime.fromJSDate(value).toFormat('yyyy-LL-dd') : null} readOnly={true} flex={4} size={['lg', null, 'md']} bg={'bg'} borderColor={'border'} cursor={'pointer'} userSelect={'none'} />
          </InputGroup>
        {/* </Field> */}
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody>
          <Calendar value={value} onSelect={handleSelect} />
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  )
}

export default DateSelector
