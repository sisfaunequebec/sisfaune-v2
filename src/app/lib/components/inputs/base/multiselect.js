import { useMemo, useCallback } from 'react'

import { Flex, VStack, Select, createListCollection, Portal } from '@chakra-ui/react'

const MultiselectInput = ({ items = [], valueKey = 'value', labelKey = 'label', value, onChange, onBlur, disabled = false, clearable = true, flex = 1, contentRef }) => {
  const collection = useMemo(() => {
    return createListCollection({
      items: items.map(item => ({
        value: item[valueKey],
        label: item[labelKey]
      }))
    })
  }, [items, valueKey, labelKey])

  const handleValueChange = useCallback((e) => {
    const { value } = e
    // console.debug('MultiselectInput handleValueChange', { value })
    const selectedItems = value.map((v, i) => {
      return {
        [valueKey]: v,
        [labelKey]: items.find(item => item[valueKey] === v)?.[labelKey]  
      }
    })
    // console.debug('MultiselectInput handleValueChange selectedItems', { selectedItems })
    onChange(selectedItems.length ? selectedItems : null)
  }, [onChange, items, valueKey, labelKey])

  const hasValue = value !== undefined && value !== null 
  const isDisabled = disabled || collection.items.length === 0
  const showClearButton = clearable && hasValue && !disabled

  return (
    <Select.Root
      multiple
      collection={collection}
      value={value?.map(v => v[valueKey]) || []}
      disabled={isDisabled}
      onValueChange={handleValueChange}
      onInteractOutside={onBlur}
      size={'sm'}
      positioning={{ sameWidth: true }}
      flex={flex}
    >
      <Select.HiddenSelect />
      <Select.Control >
        <Select.Trigger>
          <Select.ValueText />
        </Select.Trigger>
        <Select.IndicatorGroup>
          { showClearButton && <Select.ClearTrigger cursor={'pointer'} /> }
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal container={contentRef}>
        <Select.Positioner>
          <Select.Content>
            {collection.items.map(item => {
              const { label, value, description, isDisabled = false } = item
              const itemLabel = label?.length ? label : '\u00A0'
              return (
                <Select.Item item={item} key={value} isDisabled={isDisabled}>
                  <VStack gap={1} alignItems={'flex-start'} lineHeight={1.2}>
                    <Select.ItemText>{itemLabel}</Select.ItemText>
                    { description && <Flex as={'span'} fontSize={'sm'} color={'gray.600'} truncate>
                      {description}
                    </Flex> }
                  </VStack>
                  <Select.ItemIndicator />
                </Select.Item>
              )
            })}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}

export default MultiselectInput 