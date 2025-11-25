'use client'
import { useEffect, useState } from 'react'

import SelectInput from '@/app/lib/components/inputs/base/select'

const DiscoveryStateSelect = (props) => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const loadItems = async () => {
      const res = await fetch('/api/lookup/discovery-states', { cache: 'force-cache', next: { tags: ['event-types'] } })
      const result = await res.json()
      setItems(result)
    }
    loadItems()
  }, [setItems])

  return (
    <SelectInput valueKey={'id'} labelKey={'name'} items={items} {...props} clearable={false} />
  )
}

export default DiscoveryStateSelect
