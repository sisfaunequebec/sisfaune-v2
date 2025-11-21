import { useMemo, useCallback } from 'react'

import { Flex, VStack, Select, createListCollection, Portal } from '@chakra-ui/react'
// import { imei } from 'valibot'

const SelectInput = ({ items = [], valueKey = 'value', labelKey = 'label', name, value, onChange, onBlur, disabled = false, clearable = true, contentRef }) => {
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
    //  console.debug('SelectInput', { name, value })
    const selectedItem = items.find(item => item[valueKey] === value[0])
    onChange(selectedItem ? { [valueKey]: value[0], [labelKey]: selectedItem ? selectedItem[labelKey] : null } : { [valueKey]: null })
  }, [onChange, items, valueKey, labelKey])

  const hasValue = value !== undefined && value !== null
  const isDisabled = disabled || collection.items.length === 0
  const showClearButton = clearable && hasValue && !disabled

 

  return (
    <Select.Root 
      collection={collection}
      value={[value ? value[valueKey] : null]}
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
          { showClearButton && <Select.ClearTrigger /> }
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