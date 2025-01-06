import { Flex, Fieldset, Input, Separator as ChakraSeparator, VStack, CheckboxGroup } from '@chakra-ui/react'

import { Field } from '@/components/ui/field'
import { Radio, RadioGroup } from "@/components/ui/radio"
import { Checkbox } from "@/components/ui/checkbox"

const Ordre = () => {
  return (
    <RadioGroup defaultValue={'date_creation'} size={'sm'} colorPalette={'blue'} variant={'subtle'} name={'ordre'}>
      <VStack alignItems={'flex-start'}>
        <Radio value={'date_creation'} fontWeight={400} lineHeight={1.2}>Date de création du dossier</Radio>
        <Radio value={'date_signalement'} fontWeight={400} lineHeight={1.2}>Date du signalement</Radio>
        <Radio value={'id_evenement'} fontWeight={400} lineHeight={1.2}>Numéro d&apos;événement (ou de spécimen)</Radio>
        <Checkbox size={'sm'} colorPalette={'blue'} variant={'subtle'} mt={4}>Inverser l&apos;ordre</Checkbox>
      </VStack>
    </RadioGroup>
  )
}

export default Ordre