import { useState, useMemo, useCallback } from 'react'

import { HStack, Input, createListCollection, Select, Portal } from '@chakra-ui/react'

import { Field } from '@/components/ui/field'
// import { InputGroup } from '@/components/ui/input-group'
// import { Tooltip } from "@/components/ui/tooltip"

import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText
} from '@/components/ui/select'

const items = [
  { value: 5, typeId: 1, label: 'mm', isDefault: false },
  { value: 6, typeId: 1, label: 'cm', isDefault: true },
  { value: 7, typeId: 1, label: 'm', isDefault: false }
]

const UnitSelect = ({ onChange, disabled }) => {
  // console.debug('UnitSelect', value, onChange)
  // const [value, setValue] = useState(6)

  // const defaultUnit = useMemo(() => {
  //   return units.find(u => u.isDefault)
  // }, [units])

  // const collection = useMemo(() => {
  //   return createListCollection({ items: units })
  // }, [units])

  const handleValueChange = useCallback((e) => {
    const { value } = e
    // setValue(value[0])
  }, [])

  const collection = createListCollection({ items })

  return (
    <Select.Root
      collection={collection}
      value={[]}
      onValueChange={handleValueChange}
      // disabled={disabled}
      size={['md', null, 'md']}
      w={36}
      positioning={{ sameWidth: true }}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal disabled={false}>
        <Select.Positioner>
          <Select.Content>
            {collection.items.map((item) => (
              <Select.Item item={item} key={item.value}>
                {item.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}

const MeasureInput = ({ value: rawValue, isEditing = false, units, onChange }) => {
  console.debug('MeasureInput', rawValue, units)
  const { value = null, unit = null } = rawValue ?? {}

  const [measureValue, setMeasureValue] = useState(value)
  const [unitValue, setUnitValue] = useState(unit)

  const handleUnitChange = useCallback(v => {
    setUnitValue(v)

    if (!v) {
      onChange(null)
      return
    }
    if (!measureValue) {
      onChange(null)
      return
    }

    onChange({ value: measureValue, unit: v })
  }, [measureValue, onChange])

  const handleMeasureChange = useCallback(e => {
    const { target } = e
    const { value } = target

    setMeasureValue(value)

    if (!value) {
      onChange(null)
      return
    }
    if (!unitValue) {
      onChange(null)
      return
    }

    onChange({ unit: unitValue, value })
  }, [unitValue, onChange])

  const currentUnit = unitValue ? units.find(u => u.value === unitValue) || {} : {}

  const { label: unitLabel } = currentUnit
  const inputValue = isEditing ? (measureValue || '') : (measureValue ? [measureValue, unitLabel].join(' ') : '')

  return (
    <HStack flex={1} alignSelf='stretch'>
      <Input readOnly={!isEditing} size={['lg', null, 'md']} value={inputValue} onChange={handleMeasureChange} />
      {isEditing && <UnitSelect value={unitValue} units={units} onChange={handleUnitChange} />}
    </HStack>
  )
}

const MeasureField = ({ measure, isEditing = true, onChange }) => {
  console.debug('MeasureField', measure)
  const { value, type, unitId } = measure
  const { name, description } = type

  const units = [
    { value: 5, typeId: 1, label: 'mm', isDefault: false },
    { value: 6, typeId: 1, label: 'cm', isDefault: true },
    { value: 7, typeId: 1, label: 'm', isDefault: false }
  ]

  const handleChange = v => console.debug(v)

  return (
    <Field label={name} descriptionText={description}>
      <MeasureInput value={{ value, unit: unitId }} isEditing={isEditing} units={units} onChange={handleChange} />
    </Field>
  )
}

export default MeasureField

export {
  MeasureInput
}
