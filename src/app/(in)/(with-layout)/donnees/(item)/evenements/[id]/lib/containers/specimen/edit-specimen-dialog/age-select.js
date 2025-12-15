'use client'
import { useMemo } from 'react'

import useLookup from '@/lib/data/lookups/use-lookup'
import SelectInput from '@/app/lib/components/inputs/base/select'

const AgeSelect = (props) => {
  const { data } = props
  const { specie } = data
  const { group } = specie
  const { id, parentGroupId } = group

  const groupId = parentGroupId ?? id

  const items = useLookup('/api/lookup/animal-ages', null, ['animal-ages'])
  const filteredItems = useMemo(() => items?.filter(item => item.groupId === groupId), [items, groupId])

  return (
    <SelectInput valueKey={'id'} labelKey={'name'} items={filteredItems} {...props} />
  )
}

export default AgeSelect
