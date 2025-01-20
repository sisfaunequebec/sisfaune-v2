import { useQueryStates, parseAsString } from 'nuqs'

import { VStack } from '@chakra-ui/react'

import { Radio, RadioGroup } from '@/components/ui/radio'
import { Checkbox } from '@/components/ui/checkbox'
import { useCallback } from 'react'

const Ordre = () => {
  const [values, setValues] = useQueryStates({
    tri: parseAsString.withDefault('date_creation'),
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
    <RadioGroup defaultValue={'date_creation'} size={'sm'} colorPalette={'blue'} variant={'subtle'} name={'ordre'} value={tri} onValueChange={handleChange}>
      <VStack alignItems={'flex-start'}>
        <Radio value={'date_creation'} lineHeight={1.2}>Date de création du dossier</Radio>
        <Radio value={'date_signalement'} lineHeight={1.2}>Date du signalement</Radio>
        <Radio value={'id_evenement'} lineHeight={1.2}>Numéro d&apos;événement (ou de spécimen)</Radio>
        <Checkbox size={'sm'} colorPalette={'blue'} variant={'subtle'} mt={4} checked={directionIsReversed} onCheckedChange={handleCheckedChange}>Inverser l&apos;ordre</Checkbox>
      </VStack>
    </RadioGroup>
  )
}

export default Ordre
