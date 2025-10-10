'use client'
import { useState, useEffect, useMemo } from 'react'

import { Input, createListCollection } from '@chakra-ui/react'

import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText
} from '@/app/lib/components/ui/select'

import { Field } from '@/app/lib/components/ui/field'


const Select = ({ value, collection, onChange }) => {
  return (
    <SelectRoot
      collection={collection}
      value={[value?.toString()]}
      onValueChange={(e) => console.debug(e)}
      // _active={{ bg: 'blue.50' }}
    >
      <SelectTrigger>
        <SelectValueText />
      </SelectTrigger>
      <SelectContent>
        {collection?.items.map((item) => (
          <SelectItem item={item} key={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  )
}

const SelectField = ({ label, value, valueLabelKey = 'label', getter, isEditing = false }) => {
  const [collection, setCollection] = useState(null)

  useEffect(() => {
    const getItems = async () => {
      if (isEditing) {
        const rawItems = await getter()
        const items = rawItems.map(i => { return { value: i.value.toString(), label: i.label } })
        const collection = createListCollection({ items })
        setCollection(collection)
      }
    }

    getItems()
  }, [getter, isEditing])

  // console.debug(collection, value, valueLabelKey)

  const valueLabel = value?.[valueLabelKey]

  return (
    <Field label={label}>
      {(isEditing && !!collection) ? <Select collection={collection} value={value?.id} cursor='default' /> : <Input value={valueLabel} readOnly flex={4} size={['md', null, 'md']} cursor='default' />}
    </Field>
  )
}

export default SelectField


