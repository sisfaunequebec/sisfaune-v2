import { useState, useCallback } from 'react'
import { useDatePicker } from '@rehookify/datepicker'

import { VStack, HStack, IconButton, Text, SimpleGrid, Button } from '@chakra-ui/react'

import { RxDoubleArrowLeft, RxChevronLeft, RxChevronRight, RxDoubleArrowRight } from 'react-icons/rx'

const Calendar = ({ value, onSelect }) => {
  const initialState = value ? [value] : []
  const [selectedDates, onDatesChange] = useState(initialState)

  const handleChange = useCallback((value) => {
    onDatesChange(value)
    onSelect(value[0])
  }, [onSelect, onDatesChange])

  const { data, propGetters } = useDatePicker({
    selectedDates,
    onDatesChange: handleChange,
    locale: {
      locale: 'fr',
      day: 'numeric'
    },
    calendar: {
      startDay: 0
    },
    dates: { toggle: false }
  })

  const { weekDays, calendars } = data
  const { year, month, days } = calendars[0]

  const {
    dayButton, addOffset, subtractOffset
  } = propGetters

  return (
    <VStack gap={1} p={0} m={0} alignItems={'stretch'}>
      <HStack flex={1} mb={2} justifyContent={'space-between'}>
        <HStack>
          <IconButton size={'2xs'} variant={'subtle'} rounded={'full'} {...subtractOffset({ years: 1 })}>
            <RxDoubleArrowLeft />
          </IconButton>
          <IconButton size={'2xs'} variant={'subtle'} rounded={'full'} {...subtractOffset({ months: 1 })}>
            <RxChevronLeft />
          </IconButton>
        </HStack>
        <Text fontSize={'xs'} fontWeight={'bold'} textTransform={'uppercase'} userSelect={'none'}>{month} {year}</Text>
        <HStack>
          <IconButton size={'2xs'} variant={'subtle'} rounded={'full'} {...addOffset({ months: 1 })}>
            <RxChevronRight />
          </IconButton>
          <IconButton size={'2xs'} variant={'subtle'} rounded={'full'} {...addOffset({ years: 1 })}>
            <RxDoubleArrowRight />
          </IconButton>
        </HStack>
      </HStack>
      <SimpleGrid columns={7} gap={1} mb={1}>
        {weekDays.map(day => (
          <Button key={`${month}-${day}`} size={'2xs'} variant={'ghost'} disabled cursor={'default'}>{day.split('')[0].toUpperCase()}</Button>
        ))}
      </SimpleGrid>
      <SimpleGrid columns={7} gap={1}>
        {days.map((day, i) => {
          const buttonProps = dayButton(day)
          const { disabled, now, selected } = day
          return (
            <Button key={day.$date.toDateString()} size={'2xs'} minH={8} fontWeight={now ? 'bold' : 'normal'} disabled={disabled} variant={selected ? 'solid' : (now ? 'subtle' : 'subtle')} colorPalette={now ? 'green' : (selected ? 'green' : null)} {...buttonProps}>
              {day.day}
            </Button>
          )
        }
        )}
      </SimpleGrid>
    </VStack>
  )
}

export default Calendar