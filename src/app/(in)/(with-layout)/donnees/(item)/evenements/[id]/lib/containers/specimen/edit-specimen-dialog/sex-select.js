'use client'
import { useEffect, useState } from 'react'

import SelectInput from '@/app/lib/components/inputs/base/select'

const SexSelect = (props) => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const loadItems = async () => {
      const res = await fetch('/api/lookup/animal-sexes', { cache: 'no-cache', next: { tags: ['animal-sexes'] } })
      const result = await res.json()
      setItems(result)
    }
    loadItems()
  }, [setItems])

  return (
    <SelectInput valueKey={'id'} labelKey={'name'} items={items} {...props} />
  )
}

export default SexSelect
