import { Flex, Fieldset, Input, Separator as ChakraSeparator, VStack, CheckboxGroup } from '@chakra-ui/react'

import { Field } from '@/components/ui/field'
import { Radio, RadioGroup } from "@/components/ui/radio"
import { Checkbox } from "@/components/ui/checkbox"

const programmes = {
  11: 'Évaluation de la contamination par le plomb',
  1: 'Surveillance de la MDC',
  2: 'Surveillance de la rage du raton laveur',
  3: 'Surveillance de la santé des chauves-souris',
  4: 'Surveillance de la septicémie hémorragique virale',
  5: 'Surveillance de l\'influenza aviaire',
  6: 'Surveillance des salmonelles',
  7: 'Surveillance passive de la rage (analyse ACIA)',
  8: 'Surveillance régulière'
}

const Programme = () => {
  return (
    <>
      <Checkbox size={'sm'} colorPalette={'blue'} variant={'subtle'} checked={true} mb={4}>Tous les programmes</Checkbox>
      <CheckboxGroup defaultValue={[]} name={'programme'}>
        { Object.entries(programmes).map(([key, label]) => {
          return (
            <Checkbox size={'sm'} colorPalette={'blue'} variant={'subtle'} value={key} key={key}>{label}</Checkbox>
          )
        })}
      </CheckboxGroup>
    </>
  )
}

export default Programme

// Évaluation de la contamination par le plomb
//  Surveillance de la MDC
//  Surveillance de la rage du raton laveur
//  Surveillance de la santé des chauves-souris
//  Surveillance de la septicémie hémorragique virale
//  Surveillance de l'influenza aviaire
//  Surveillance des salmonelles
//  Surveillance passive de la rage (analyse ACIA)
//  Surveillance régulière