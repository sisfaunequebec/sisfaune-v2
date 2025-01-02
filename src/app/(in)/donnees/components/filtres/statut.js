import { Flex, Fieldset, Input, Separator as ChakraSeparator, VStack, CheckboxGroup } from '@chakra-ui/react'

import { Field } from '@/components/ui/field'
import { Radio, RadioGroup } from "@/components/ui/radio"
import { Checkbox } from "@/components/ui/checkbox"

const statuts = {
  2: 'En cours',
  3: 'Terminé'
}

const Statut = () => {
  return (
    <>
      <Checkbox size={'sm'} colorPalette={'blue'} variant={'subtle'} checked={true} mb={4}>Tous les statuts</Checkbox>
      <CheckboxGroup defaultValue={[]} name={'statut'}>
        { Object.entries(statuts).map(([key, label]) => {
          return (
            <Checkbox size={'sm'} colorPalette={'blue'} variant={'subtle'} value={key} key={key}>{label}</Checkbox>
          )
        })}
      </CheckboxGroup>
    </>
  )
}

export default Statut