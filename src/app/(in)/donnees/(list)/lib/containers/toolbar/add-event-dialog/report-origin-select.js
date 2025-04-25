'use client'
import { useCallback, useEffect, useState } from 'react'

import getReportOrigins from '@/lib/data/lookups/get-report-origins'

import {
  Portal,
  Select,
  createListCollection
} from '@chakra-ui/react'

const ReportOriginSelect = ({ value, onChange, onBlur, contentRef }) => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const loadItems = async () => {
      const result = await getReportOrigins({ activeOnly: true })
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

export default ReportOriginSelect
