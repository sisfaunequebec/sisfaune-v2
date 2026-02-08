'use client'
import { useQueryStates, parseAsString } from 'nuqs'

import { VStack } from '@chakra-ui/react'

import { Radio, RadioGroup } from '@/app/lib/components/ui/radio'
import { Checkbox } from '@/app/lib/components/ui/checkbox'
import { useCallback } from 'react'

const Order = () => {
  const [values, setValues] = useQueryStates({
    tri: parseAsString.withDefault('nom_analyse'),
    direction: parseAsString.withDefault('asc')
  }, {
    urlKeys: {
      tri: 'o',
      direction: 'd'
    }
  })

  const handleChange = useCallback(e => {
    const { value } = e
    const { direction } = values
    setValues({
      tri: value,
      direction
    })
  }, [values, setValues])

  const handleCheckedChange = useCallback(e => {
    const { checked } = e
    const direction = checked ? 'desc' : 'asc'
    const { tri } = values
    setValues({
      tri,
      direction
    })
  }, [values, setValues])

  const { tri, direction } = values
  const directionIsReversed = direction.toLowerCase() === 'desc'

  return (
    <RadioGroup defaultValue='date_creation' size='sm' colorPalette='blue' variant='subtle' name='ordre' value={tri} onValueChange={handleChange}>
      <VStack alignItems='flex-start' gap={1}>
        <Radio value='nom_analyse'>Nom de l&apos;analyse</Radio>
        <Radio value='nom_groupe'>Nom du groupe d&apos;analyses</Radio>
        <Checkbox size='sm' colorPalette='blue' variant='subtle' mt={4} checked={directionIsReversed} onCheckedChange={handleCheckedChange}>Inverser l&apos;ordre</Checkbox>
      </VStack>
    </RadioGroup>
  )
}

export default Order
