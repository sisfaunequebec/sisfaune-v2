import { useMemo, useCallback } from 'react'

import { Flex, VStack, Select, createListCollection, Portal } from '@chakra-ui/react'

const SelectInput = ({ items = [], name, value, onChange, onBlur, disabled = false, contentRef }) => {
  const collection = useMemo(() => {
    return createListCollection({
      items
    })
  }, [items])

  const handleValueChange = useCallback((e) => {
    const { value } = e
    onChange(value[0])
  }, [onChange])

  const handleClear = useCallback((e) => {
    onChange(null)
  }, [onChange])

  const isDisabled = disabled || collection.items.length === 0

  // console.debug(name, value)

  return (
    <Select.Root 
      collection={collection}
      value={[value]}
      disabled={isDisabled}
      onValueChange={handleValueChange}
      onInteractOutside={onBlur}
      size={'sm'}
      positioning={{ sameWidth: true }}
      // deselectable
    >
      <Select.HiddenSelect />
      <Select.Control >
        <Select.Trigger>
          <Select.ValueText />
        </Select.Trigger>
        <Select.IndicatorGroup>
          {/* <Select.ClearTrigger onClick={handleClear} /> */}
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal container={contentRef}>
        <Select.Positioner>
          <Select.Content>
             {collection.items.map(item => {
               const { label, value, description, isDisabled = false } = item
               return (
                 <Select.Item item={item} key={value} isDisabled={isDisabled}>
                   <VStack gap={1} alignItems={'flex-start'} lineHeight={1.2}>
                     <Select.ItemText>{label}</Select.ItemText>
                     { description && <Flex as={'span'} fontSize={'sm'} color={'gray.600'} truncate>
                       {description}
                     </Flex> }
                   </VStack>
                 </Select.Item>
               )
             })}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}

export default SelectInput 