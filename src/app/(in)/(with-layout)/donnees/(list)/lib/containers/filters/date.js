'use client'

import { useMemo, useCallback } from 'react'
// import orderBy from 'lodash.orderby'

import { DateTime } from 'luxon'

import { useQueryStates, parseAsString, parseAsIsoDateTime } from 'nuqs'
import { VStack } from '@chakra-ui/react'

import { Radio, RadioGroup } from '@/app/lib/components/ui/radio'
import { Field } from '@/app/lib/components/ui/field'

import DateInput from '@/app/lib/components/inputs/base/date'

const Date = () => {
  const [values, setValues] = useQueryStates({
    date: parseAsString.withDefault('date_signalement'),
    start: parseAsString.withDefault(null),
    end: parseAsString.withDefault(null)
  }, {
    urlKeys: {
      date: 'dd',
      start: 'sd',
      end: 'ed'
    }
  })

  const handleDateTypeChange = useCallback(e => {
    const { value } = e
    const { start, end } = values

    setValues({
      date: value,
      start,
      end
    })
  }, [values, setValues])

  const handleStartDateChange = useCallback(value => {
    const { date, end } = values
    
    const startDate = (date && value) ? DateTime.fromJSDate(value) : null
    const endDate = end ? DateTime.fromFormat(end, 'yyyy-LL-dd') : null
    const isOver = startDate >= endDate 

    setValues({
      date,
      start: startDate ? startDate.toFormat('yyyy-LL-dd') : null,
      end: isOver ? null : (endDate ? endDate.toFormat('yyyy-LL-dd') : null)
    })
  }, [values, setValues])

   const handleEndDateChange = useCallback(value => {
    const { date, start } = values
    setValues({
      date,
      start,
      end: (date && value) ? DateTime.fromJSDate(value).toFormat('yyyy-LL-dd') : null,
    })
  }, [values, setValues])

  const { date, start, end } = values

  const startDate = start && DateTime.fromISO(start).toJSDate()
  const endDate = end && DateTime.fromISO(end).toJSDate()

  return (
    // <VStack>
    <VStack gap={2} alignItems='flex-start'>
      <RadioGroup defaultValue='date_signalement' size='sm' colorPalette='blue' variant='subtle' name='date' value={date} onValueChange={handleDateTypeChange}>
        <VStack alignItems='flex-start' gap={1}>
          <Radio value='date_signalement'>Date du signalement</Radio>
          <Radio value='date_decouverte'>Date de découverte</Radio>
          <Radio value='date_recolte'>Date de récolte</Radio>
        </VStack>
      </RadioGroup>
      <Field label='Début :' variant='vertical'>
        <DateInput value={startDate} clearable onChange={handleStartDateChange} />
      </Field>
      <Field label='Fin :' variant='vertical'>
        <DateInput value={endDate} minDate={startDate} clearable onChange={handleEndDateChange} />
      </Field>
    </VStack>
  )
}

export default Date
