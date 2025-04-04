'use client'

import { useMemo, useCallback } from 'react'
// import orderBy from 'lodash.orderby'

import { DateTime } from 'luxon'

import { useQueryStates, parseAsString, parseAsIsoDateTime } from 'nuqs'
import { VStack } from '@chakra-ui/react'

import { Radio, RadioGroup } from '@/components/ui/radio'
import { Field } from '@/components/ui/field'

import DateSelector from '@/app/lib/components/date-selector'

const Dates = ({  }) => {
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
    // if (!start && !end) { return }
    setValues({
      date: value,
      start,
      end
    })
  }, [values, setValues])

  const handleStartDateChange = useCallback(value => {
    const { date, end } = values
    // console.debug(value)
    setValues({
      date,
      start: (date && value) ? DateTime.fromJSDate(value).toFormat('yyyy-LL-dd') : null,
      end
    })
  }, [values, setValues])

  console.debug(values)
  // const [value, setValue] = useQueryState('s', parseAsArrayOf(parseAsInteger).withDefault([]))

  // const choices = useMemo(() => {
  //   const choices = statuts.map(p => { return { value: p.id, label: p.name }  })
  //   const sorted = orderBy(choices, ['label'], ['asc'])
  //   return sorted
  // }, [statuts])

  const { date, start, end } = values
  
  const startDate = start && DateTime.fromISO(start).toJSDate()

  return (
    // <VStack>
    <VStack gap={3} alignItems={'flex-start'}>
      <RadioGroup defaultValue={'date_signalement'} size={'sm'} colorPalette={'blue'} variant={'subtle'} name={'date'} value={date} onValueChange={handleDateTypeChange}>
        <VStack alignItems={'flex-start'} gap={1}>
          <Radio value={'date_signalement'}>Date du signalement</Radio>
          <Radio value={'date_decouverte'}>Date de découverte</Radio>
          <Radio value={'date_recolte'}>Date de récolte</Radio>
        </VStack>
      </RadioGroup>
      <Field label={'Début :'} variant={'vertical'}>
        <DateSelector value={startDate} clearable={true} onChange={handleStartDateChange} />
      </Field>
      <Field label={'Fin :'} variant={'vertical'}>
        <DateSelector value={end} clearable={true} />
      </Field>
    </VStack>
  )
}

export default Dates
