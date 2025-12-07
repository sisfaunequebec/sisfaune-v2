'use client'
import { useEffect, useState } from 'react'

import SelectInput from '@/app/lib/components/inputs/base/select'

const AgeSelect = (props) => {
  const [items, setItems] = useState([])

  const { data } = props
  const { specie } = data
  const { group } = specie
  const { id, parentGroupId } = group

  const groupId = parentGroupId ?? id

  useEffect(() => {
    const loadItems = async () => {
      const res = await fetch('/api/lookup/animal-ages', { cache: 'no-cache', next: { tags: ['animal-ages'] } })
      const result = await res.json()
      const filteredByGroup = result.filter(item => item.groupId === groupId)
      setItems(filteredByGroup)
    }
    loadItems()
  }, [setItems, groupId])

  return (
    <SelectInput valueKey={'id'} labelKey={'name'} items={items} {...props} />
  )
}

export default AgeSelect
