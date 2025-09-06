'use client'
import { useCallback, useEffect, useState } from 'react'

import getDiscoveryStates from '@/lib/data/lookups/get-discovery-states'

import {
  Portal,
  Select,
  createListCollection
} from '@chakra-ui/react'

const DiscoveryStateSelect = ({ value, onChange, onBlur, contentRef }) => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const loadItems = async () => {
      const result = await getDiscoveryStates()
      setItems(result)
    }
    loadItems()
  }, [setItems])

  const handleValueChange = useCallback((e) => {
    const { value } = e
    onChange(value[0])
  }, [onChange])

  const collection = createListCollection({ items })

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
          { value && <Select.ClearTrigger /> }
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

export default DiscoveryStateSelect
