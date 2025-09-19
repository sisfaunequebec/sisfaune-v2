import { useMemo, useCallback } from 'react'

import { Select as ChakraSelect, createListCollection, Portal } from '@chakra-ui/react'

const Select = ({ options = [], value, onChange, onBlur, contentRef }) => {
  const collection = useMemo(() => {
    return createListCollection({
      items: options
    })
  }, [options])

  const handleValueChange = useCallback((e) => {
    const { value } = e
    onChange(value[0])
  }, [onChange])

  return (
    <ChakraSelect.Root 
      collection={collection}
      value={[value]}
      onValueChange={handleValueChange}
      onInteractOutside={onBlur}
      size={'sm'}
      positioning={{ sameWidth: true }}
    >
      <ChakraSelect.HiddenSelect />
      <ChakraSelect.Control>
        <ChakraSelect.Trigger>
          <ChakraSelect.ValueText />
        </ChakraSelect.Trigger>
        <ChakraSelect.IndicatorGroup>
          <ChakraSelect.Indicator />
        </ChakraSelect.IndicatorGroup>
      </ChakraSelect.Control>
      <Portal container={contentRef}>
        <ChakraSelect.Positioner>
          <ChakraSelect.Content>
            {options.map((option) => (
              <ChakraSelect.Item item={option} key={option.value}>
                {option.label}
                <ChakraSelect.ItemIndicator />
              </ChakraSelect.Item>
            ))}
          </ChakraSelect.Content>
        </ChakraSelect.Positioner>
      </Portal>
    </ChakraSelect.Root>
  )
}

export default Select 