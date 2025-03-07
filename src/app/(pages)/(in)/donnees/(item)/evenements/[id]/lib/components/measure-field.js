import { useState, useMemo } from 'react'

import { Input, createListCollection } from '@chakra-ui/react'

import { Field } from '@/components/ui/field'
import { InputGroup } from '@/components/ui/input-group'

import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '@/components/ui/select'

const units = [
  { value: 'mm', label: 'm' },
  { value: 'cm', label: 'cm' },
  { value: 'm', label: 'm' }
]

// const collection = createListCollection({ items: units })
// console.debug(collection)

const UnitSelect = () => {
  const [value, setValue] = useState([])

  const collection = useMemo(() => {
    return createListCollection({ items: units })
  }, [])

  console.debug(collection)

  return (
    <SelectRoot
      collection={collection}
      value={value}
      onValueChange={(e) => setValue(e.value)}
      size={['xs']}
      w={36}
      variant={'ghost'}
    >
      <SelectTrigger>
        <SelectValueText />
      </SelectTrigger>
      <SelectContent >
        {collection?.items.map((item) => (
          <SelectItem item={item} key={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  )
}

const MeasureField = ({ label, value, isEditing = false }) => {
  const endElement = <UnitSelect w={4} />


  return (
    <Field label={label}>
      <InputGroup
        flex={1}
        endElement={endElement}
      >
        <Input readOnly={!isEditing} flex={4} size={['lg', null, 'md']} />
      </InputGroup>

      {/* <Input value={value ?? ''}  /> */}
    </Field>
  )
}

export default MeasureField
