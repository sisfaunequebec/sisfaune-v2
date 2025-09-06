'use client'
import { useCallback, useRef } from 'react'

import isFunction from 'lodash.isfunction'

import { VStack, Flex } from '@chakra-ui/react'

import {
  Combobox,
  useListCollection,
  Highlight,
  useCombobox
} from "@chakra-ui/react"
import { useState } from "react"
import { useAsync } from "react-use"

const HILIGHTSTYLE = { bg: 'blue.200', color: 'blue.900' }

const Autocomplete = ({ value, minChars = 2,  valueKey = 'id', labelKey = 'name', onLookup, onChange, onRenderItem }) => {
  
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

  const combobox = useCombobox({
    collection,
    defaultValue: value ? [value[valueKey]] : [],
    openOnChange: (e) => e.inputValue.length > (minChars - 1),
    onValueChange: handleOnValueChange,
    onInputValueChange: (e) => setInputValue(e.inputValue),
  })

  const hydrated = useRef(false)
  if (combobox.value.length && collection.size && !hydrated.current) {
    combobox.syncSelectedItems()
    hydrated.current = true
  }

  useAsync(async () => {
    if (inputValue) {
      const data = await onLookup(inputValue)
      set(data)
    }
  }, [inputValue, set])

  return (
    <Combobox.RootProvider value={combobox} size={'sm'}>
      <Combobox.Control>
        <Combobox.Input />
        <Combobox.IndicatorGroup>
          <Combobox.ClearTrigger />
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
                <Combobox.Item key={item.id} item={item}>
                  <VStack gap={0} alignItems={'flex-start'} lineHeight={1.2}>              
                    <Flex as={'span'}>
                      {/* <Highlight query={inputValue} styles={HILIGHTSTYLE} ignoreCase matchAll> */}
                        {title}
                      {/* </Highlight> */}
                    </Flex>
                    { description && <Flex as={'span'} fontSize={'xs'} color={'gray.500'} truncate>
                      {/* <Highlight query={inputValue} styles={HILIGHTSTYLE} ignoreCase> */}
                        {description}
                      {/* </Highlight> */}
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