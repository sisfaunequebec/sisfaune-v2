'use client'
import { useCallback, useEffect, useState } from 'react'

import getEventTypes from '@/lib/data/lookups/get-event-types'

import {
  Portal,
  Select,
  createListCollection
} from '@chakra-ui/react'

const TypeSelect = ({ value, onChange, onBlur, contentRef }) => {
  const [types, setTypes] = useState([])

  useEffect(() => {
    const loadTypes = async () => {
      const result = await getEventTypes()
      setTypes(result)
    }
    loadTypes()
  }, [setTypes])

  const handleValueChange = useCallback((e) => {
    const { value } = e
    onChange(value[0])
  }, [onChange])

  const collection = createListCollection({ items: types })

  return (
    <Select.Root
      collection={collection}
      value={[value]}
      onValueChange={handleValueChange}
      onInteractOutside={onBlur}
      size='sm'
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
      <Portal container={contentRef}>
        <Select.Positioner>
          <Select.Content>
            {collection.items.map((item) => (
              <Select.Item item={item} key={item.value}>
                {item.label}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}

export default TypeSelect
