'use client'
import { useState, useMemo, useCallback } from 'react'

import { AbsoluteCenter, VStack, Switch } from '@chakra-ui/react'

import MeasureField, { MeasureInput } from '../lib/components/measure-field'

const units = [
  { value: 5, typeId: 1, label: 'mm', isDefault: false },
  { value: 6, typeId: 1, label: 'cm', isDefault: true },
  { value: 7, typeId: 1, label: 'm', isDefault: false }
]

const test = { value: 12.4, unit: 5 }

const measure = {
  id: 601015,
  specimenId: 38744,
  measureTypeId: 10,
  value: 6,
  unitId: 6,
  type: {
    id: 10,
    name: 'Mesure de la patte arrière',
    unit: 'cm',
    group: 'Mammifère',
    description: "Du bout des ongles ou des griffes jusqu'au bout de l'os du talon",
    defaultUnitId: 6,
    unitTypeId: 2
  },
  unit: {
    id: 6,
    type: 2,
    name: 'cm',
    multiplier: '1'
  }
}

const Test = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState({ value: 6, unit: 6 })

  const onChange = v => setValue(v)

  // console.debug('measure is currently ', value)

  return (
    <AbsoluteCenter as={VStack} bg='bg' p={8} w='full'>
      <Switch.Root
        checked={isEditing}
        onCheckedChange={(e) => setIsEditing(e.checked)}
      >
        <Switch.HiddenInput />
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Switch.Label />
      </Switch.Root>
      <MeasureField name='toto' measure={measure} isEditing={isEditing} onChange={() => {}} />
      {/* <MeasureInput units={units} value={value} isEditing={isEditing} onChange={onChange} /> */}
    </AbsoluteCenter>
  )
}

export default Test
