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

const Select = ({ items: rawItems, value, onChange }) => {
  const items = rawItems.map(i => { return { value: i.value.toString(), label: i.label } })
  const collection = useMemo(() => {
    return createListCollection({ items })
  }, [items])

  // console.debug(collection)

  return (
    <SelectRoot
      collection={collection}
      value={[value?.toString()]}
      onValueChange={(e) => console.debug(e)}
      // size={['lg', null, 'md']}
    >
      <SelectTrigger clearable>
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

const SelectField = ({ label, value, items, isEditing = false }) => {
  // console.debug(items, typeof value)
  const valueLabel = items?.find(i => i.value === value)?.label

  return (
    <Field label={label} cursor='pointer'>
      {isEditing ? <Select items={items} value={value} /> : <Input value={valueLabel} readOnly flex={4} size={['md', null, 'md']} />}
    </Field>
  )
}

export default SelectField
