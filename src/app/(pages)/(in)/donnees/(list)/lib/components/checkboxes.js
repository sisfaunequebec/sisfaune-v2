'use client'
import { useState, useCallback, useMemo } from 'react'

import { CheckboxGroup } from '@chakra-ui/react'
import { Checkbox } from '@/components/ui/checkbox'

const Checkboxes = ({ allChoicesLabel = 'Tous', choices = [], name, value, onChange = () => {} }) => {
  const [internalValue, setInternalValue] = useState(value ?? [])

  const choicesMap = useMemo(() => {
    return choices.reduce((acc, s) => {
      const { value } = s
      acc[value.toString()] = s
      return acc
    }, {})
  }, [choices])

  const handleAllCheck = useCallback(e => {
    const { checked } = e
    if (checked) {
      setInternalValue([])
      onChange && onChange([])
    }
  }, [setInternalValue, onChange])

  const handleChange = useCallback(value => {
    const values = value.map(v => {
      const choiceEntry = choicesMap[v]
      const { value } = choiceEntry
      return value
    })

    setInternalValue(values)
    onChange && onChange(values)
  }, [setInternalValue, onChange, choicesMap])

  const allChecked = internalValue && internalValue.length === 0

  return (
    <>
      <Checkbox size={'sm'} colorPalette={'blue'} variant={'subtle'} checked={allChecked} mb={4} onCheckedChange={handleAllCheck}>{allChoicesLabel}</Checkbox>
      <CheckboxGroup value={internalValue} name={name} onValueChange={handleChange}>
        {choices.map(c => {
          const { value, label } = c
          return (
            <Checkbox size={'sm'} colorPalette={'blue'} variant={'subtle'} value={value.toString()} key={value.toString()}>{label}</Checkbox>
          )
        })}
      </CheckboxGroup>
    </>
  )
}

export default Checkboxes
