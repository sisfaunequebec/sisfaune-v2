'use client'
import { useCallback, useRef } from 'react'

import isFunction from 'lodash.isfunction'

import { VStack, Flex } from '@chakra-ui/react'

import {
  Combobox,
  useListCollection,
  useCombobox
} from "@chakra-ui/react"

import { useState } from "react"
import { useAsync, useDebounce } from "react-use"

const HILIGHTSTYLE = { bg: 'orange.200', px: 0.25 }

const Autocomplete = ({ value, minChars = 2, valueKey = 'id', labelKey = 'name', allowCustomValue = false, clearable = true, placeholder, onLookup, onChange, onRenderItem, ...rest }) => {
  const [inputValue, setInputValue] = useState()

  const { collection, set } = useListCollection({
    initialItems: value ? [value] : [],
    itemToValue: (item) => item[valueKey],
    itemToString: (item) => isFunction(labelKey) ? labelKey(item) : item[labelKey]
  })

  const { items: collectionItems } = collection

  const handleOnValueChange = useCallback(({ value }) => {
    if (!value.length) { 
      onChange(null)
    } else {
      const selectedItem = collectionItems.find(item => item[valueKey] === value[0])
      onChange(selectedItem)
    }
  }, [collectionItems, valueKey, onChange])

  const [, cancel] = useDebounce(async () => {
      const data = await onLookup(inputValue)
      set(data)
    }, 200,
    [inputValue, set]
  )

  const handleOnInputValueChange = useCallback((e) => {
    const { inputValue } = e
    setInputValue(inputValue)
    const selectedItem = collectionItems.find(item => item[valueKey] === inputValue)
    if (!selectedItem && allowCustomValue) {
      onChange({ id: inputValue, value: inputValue })
    }
  }, [collectionItems, setInputValue, valueKey, onChange, allowCustomValue])

  const combobox = useCombobox({
    collection,
    defaultValue: value ? [value[valueKey]] : [],
    allowCustomValue,
    openOnChange: (e) => e.inputValue.length > (minChars - 1),
    onValueChange: handleOnValueChange,
    onInputValueChange: handleOnInputValueChange
  })

  const hydrated = useRef(false)
  if (combobox.value.length && collection.size && !hydrated.current) {
    combobox.syncSelectedItems()
    hydrated.current = true
  }

  return (
    <Combobox.RootProvider value={combobox} size={'sm'} {...rest}>
      <Combobox.Control>
        <Combobox.Input placeholder={placeholder} />
        <Combobox.IndicatorGroup>
          { clearable && <Combobox.ClearTrigger /> }
          <Combobox.Trigger />
        </Combobox.IndicatorGroup>
      </Combobox.Control>
      <Combobox.Positioner>
        <Combobox.Content overflowX={'hidden'}>
          {
            collection.items?.map((item) => {
              const rendered = onRenderItem ? onRenderItem(item) : [ isFunction(labelKey) ? labelKey(item) : item[labelKey] ]
              const [title, description] = rendered
              return (
                <Combobox.Item key={item[valueKey]} item={item}>
                  <VStack gap={1} alignItems={'flex-start'} lineHeight={1.2}>              
                    <Flex as={'span'}>
                      {title}
                    </Flex>
                    { description && <Flex as={'span'} fontSize={'sm'} color={'gray.600'} truncate>
                      {description}
                    </Flex>  
                    } 
                  </VStack>
                  <Combobox.ItemIndicator />
                </Combobox.Item>
              )
            })
          }
        </Combobox.Content>
      </Combobox.Positioner>
    </Combobox.RootProvider>
  )
}

export default Autocomplete