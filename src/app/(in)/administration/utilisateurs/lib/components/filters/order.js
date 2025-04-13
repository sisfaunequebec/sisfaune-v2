'use client'
import { useQueryStates, parseAsString } from 'nuqs'

import { VStack } from '@chakra-ui/react'

import { Radio, RadioGroup } from '@/components/ui/radio'
import { Checkbox } from '@/components/ui/checkbox'
import { useCallback } from 'react'

const Order = () => {
  const [values, setValues] = useQueryStates({
    tri: parseAsString.withDefault('nom_utilisateur'),
    direction: parseAsString.withDefault('desc')
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
    const direction = checked ? 'asc' : 'desc'
    const { tri } = values
    setValues({
      tri,
      direction
    })
  }, [values, setValues])

  const { tri, direction } = values
  const directionIsReversed = direction.toLowerCase() === 'asc'

  return (
    <RadioGroup defaultValue='date_creation' size='sm' colorPalette='blue' variant='subtle' name='ordre' value={tri} onValueChange={handleChange}>
      <VStack alignItems='flex-start' gap={1}>
        <Radio value='nom_utilisateur'>Nom d&apos;utilisateur</Radio>
        <Radio value='email'>Adresse courriel</Radio>
        <Radio value='organisation'>Organisation</Radio>
        <Checkbox size='sm' colorPalette='blue' variant='subtle' mt={4} checked={directionIsReversed} onCheckedChange={handleCheckedChange}>Inverser l&apos;ordre</Checkbox>
      </VStack>
    </RadioGroup>
  )
}

export default Order
