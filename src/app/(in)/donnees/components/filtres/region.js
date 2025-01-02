

import { Flex, Fieldset, Input, Separator as ChakraSeparator, VStack, CheckboxGroup } from '@chakra-ui/react'

import { Field } from '@/components/ui/field'
import { Radio, RadioGroup } from "@/components/ui/radio"
import { Checkbox } from "@/components/ui/checkbox"

const regions = [
  'Abitibi-Témiscamingue', 'Bas-Saint-Laurent', 'Capitale-Nationale', 'Centre-du-Québec', 'Chaudière-Appalaches', 'Côte-Nord', 'Estrie', 'Gaspésie - Îles-de-la-Madeleine', 'Lanaudière', 'Laurentides', 'Laval', 'Mauricie', 'Montérégie', 'Montréal', 'Nord-du-Québec', 'Outaouais', 'Saguenay - Lac-Saint-Jean'
]

const Region = () => {
  return (
    <>
      <Checkbox size={'sm'} colorPalette={'blue'} variant={'subtle'} checked={true} mb={4}>Toutes les régions</Checkbox>
      <CheckboxGroup defaultValue={[]} name={'region'}>
        { regions.map((r, i) => {
          return (
            <Checkbox size={'sm'} colorPalette={'blue'} variant={'subtle'} value={i} key={i}>{r}</Checkbox>
          )
        })}
      </CheckboxGroup>
    </>
  )
}

export default Region

// Évaluation de la contamination par le plomb
//  Surveillance de la MDC
//  Surveillance de la rage du raton laveur
//  Surveillance de la santé des chauves-souris
//  Surveillance de la septicémie hémorragique virale
//  Surveillance de l'influenza aviaire
//  Surveillance des salmonelles
//  Surveillance passive de la rage (analyse ACIA)
//  Surveillance régulière

// Toutes les régions
//  Abitibi-Témiscamingue
//  Bas-Saint-Laurent
//  Capitale-Nationale
//  Centre-du-Québec
//  Chaudière-Appalaches
//  Côte-Nord
//  Estrie
//  Gaspésie - Îles-de-la-Madeleine
//  Lanaudière
//  Laurentides
//  Laval
//  Mauricie
//  Montérégie
//  Montréal
//  Nord-du-Québec
//  Outaouais
//  Saguenay - Lac-Saint-Jean