'use client'
import isNil from 'lodash.isnil'
import { useState, useEffect, useCallback, useMemo } from 'react'

import { VStack, HStack, Flex, Field as ChakraField } from '@chakra-ui/react'
import { InfoTip } from "@/app/lib/components/ui/toggle-tip"

import { numericFormatter } from 'react-number-format'

import NumberInput from '@/app/lib/components/inputs/base/number'
import UnitSelect from './unit-select'

const MeasureInput = ({ id, value, unit, size, contentRef, onChange }) => {
  const { id: unitId, typeId } = unit

  const handleUnitChange = useCallback(unit => {
    onChange(id, value, unit)
  }, [value, id, onChange])

  const handleValueChange = useCallback(value => {
    onChange(id, value, unit)
  }, [unit, id, onChange])

  const isDisabled = unitId === 100

  return (
    <HStack flex={2} w={'full'} direction={'column'} gap={1}>
      <NumberInput id={'number'} flex={5} value={value} size={size} decimalSeparator={','} precision={6} onChange={handleValueChange} />
      <UnitSelect id={'unit'} flex={3} contentRef={contentRef} clearable={false} value={unit} typeId={typeId} onChange={handleUnitChange} disabled={isDisabled} />
    </HStack>
  )
}

const MeasuresInput = ({ value = [], size, contentRef, onChange }) => {
  const valuesById = value.reduce((acc, item) => {
    const { id } = item
    acc[id] = item
    return acc
  }, {})

  const handleChange = useCallback((id, value, unit) => {
    const valueToChange = valuesById[id]

    const { unit: unitToChange } = valueToChange
    const { id: unitId } = unitToChange

    const unitToReturn = {...unitToChange, ...unit}

    const valueToReturn = {
      ...valueToChange,
      value: isNil(value) ? null : value.toString(),
      unitId,
      unit: unitToReturn
    }

    const valuesToReturn = {
      ...valuesById,
      ...{
        [id]: valueToReturn
      }
    }

    onChange(Object.values(valuesToReturn))
  }, [valuesById, onChange])

  return (
    <VStack spacing={1} flex={1} >
    { Object.values(valuesById).map(measure => {
      
      const { id, value, type, unit } = measure
      const { name: measureName, description } = type 

      return (
        <ChakraField.Root key={id} justifyContent={'stretch'}>
          <Flex direction={'row'} alignItems={'flex-start'} w={'full'}>
            <ChakraField.Label fontSize={['md', null, 'sm']} color={'gray.600'} fontWeight={400} flex={[1, null, 1]} justifyContent={'flex-start'} pt={2} pe={2} mb={2} lineHeight={'shorter'}>
              <HStack flex={1}justifyContent={'space-between'}>{measureName} <InfoTip content={description} /></HStack>{'\u00A0'}:
            </ChakraField.Label>
            <MeasureInput key={id} id={id} value={value} unit={unit} size={size} contentRef={contentRef} onChange={handleChange} />
          </Flex>
        </ChakraField.Root>
      )
    })}
    </VStack>
  )
}

export default MeasuresInput